'use client';
import "../../i18n/i18n";

import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import * as S from '../style/main2';
import { FiGlobe } from "react-icons/fi";

const colors = [
  "#E60026", "#E08325", "#FFFF33", "#8FCB82", "#3F7B1A",
  "#5E9ECF", "#325A9A", "#212F85", "#7C2E8F", "#BB2E6D"
];

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export default function Main() {
  const { t, i18n } = useTranslation();
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const [view, setView] = useState<"line" | "table" | "boxplot" | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // ⭐ 새로 추가된 상태
  const [tableTitle, setTableTitle] = useState<string>("");

  const languages = [
    { code: 'ko', label: '한국어 (KO)' },
    { code: 'ja', label: '日本語 (JA)' }
  ];

  const currentLang = i18n.language || 'ko';

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setDropdownOpen(false);
  };

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;
    script.onload = () => {
      (window as any).google.charts.load("current", {
        packages: ["corechart", "table"],
        callback: () => setGoogleLoaded(true),
      });
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isClient]);

  // ⭐ 별도 useEffect: tableTitle 변경 시 input value DOM 직접 업데이트 (차트 재그리기 없이)
  useEffect(() => {
    if (view !== "table") return;

    const inputEl = document.getElementById("table-title-input") as HTMLInputElement | null;
    if (inputEl) {
      const displayTitle = tableTitle.trim() === "" ? "" : tableTitle;
      inputEl.value = displayTitle;  // 직접 value 설정으로 동기화 (placeholder 보이게 빈 문자열)
    }
  }, [tableTitle, view, t]);

  useEffect(() => {
    if (!isClient || !googleLoaded || !view) return;

    const chartDiv = document.getElementById("chart_div");
    if (!chartDiv) return;

    const google = (window as any).google;
    if (!google?.visualization) return;

    const parsed: number[][] = inputs.map((input) =>
      input.split(",")
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v))
    );

    const newErrors = inputs.map((input, i) =>
      input.trim() === "" || parsed[i].length === 0 ? t("alert_empty") : ""
    );
    setErrors(newErrors);

    if (newErrors.some(msg => msg !== "")) {
      setView(null);
      return;
    }

    // ⭐ 제목 기본값 설정
    const chartTitle = tableTitle.trim() === "" ? t("title") : tableTitle;

    // 📌 Line Chart
    if (view === "line") {
      const maxLen = Math.max(...parsed.map(arr => arr.length));
      const header = ["Index", ...parsed.map((_, i) => `Data${i + 1}`)];
      const dataArray: (string | number | null)[][] = [header];
      for (let i = 0; i < maxLen; i++) {
        const row: (number | null)[] = [(i + 1) * 20];
        parsed.forEach(arr => row.push(arr[i] ?? null));
        dataArray.push(row);
      }
      const data = google.visualization.arrayToDataTable(dataArray);
      const options = {
        title: chartTitle,
        curveType: "function",
        legend: { position: "bottom" },
        colors,
      };
      new google.visualization.LineChart(chartDiv).draw(data, options);
    }

    // 📌 Table (제목 input만 유지, + 버튼 제거)
    if (view === "table") {
      const data = new google.visualization.DataTable();

      // Index → string
      data.addColumn("string", "Index");

      // 데이터셋 → number
      parsed.forEach((_, i) => data.addColumn("number", `Data${i + 1}`));

      const maxLen = Math.max(...parsed.map(arr => arr.length));

      for (let i = 0; i < maxLen; i++) {
        const row: (string | number | null)[] = [];

        // Index
        row.push((i + 1).toString());

        // Data columns (number or null)
        parsed.forEach(arr => row.push(arr[i] ?? null));

        data.addRow(row);
      }

      // ⭐ 평균 행
      const meanRow: (string | number)[] = [];

      // Index 자리
      meanRow.push("Mean");

      // 숫자 데이터
      parsed.forEach(arr => meanRow.push(Number(mean(arr).toFixed(2))));

      data.addRow(meanRow);

      const options = {
        showRowNumber: false,
        width: "60%",
        allowHtml: true,
        sort: 'disable'  // ⭐ 정렬 비활성화: 헤더 클릭 시 정렬되지 않음
      };

      const table = new google.visualization.Table(chartDiv);

      google.visualization.events.addListener(table, "ready", () => {
        const thList = chartDiv.getElementsByTagName("th");

        // ⭐ 표 제목 입력창 (inline style으로 중앙 정렬 적용)
        if (thList.length > 0) {
          const indexHeader = thList[0];
          const initialTitle = tableTitle.trim() === "" ? "" : tableTitle;  // 빈 경우 value=""로 placeholder 표시
          indexHeader.innerHTML = `
            <input
              id="table-title-input"
              type="text"
              value="${initialTitle}"
              placeholder="${t("tableTitlePlaceholder")}"
              style="
                width: 120px;
                border: 1px solid #ccc;
                padding: 3px;
                font-size: 13px;
                text-align: center;
                border-radius: 6px;
              "
            />
          `;

          setTimeout(() => {
            const inputEl = document.getElementById("table-title-input") as HTMLInputElement;
            if (inputEl) {
              inputEl.oninput = (e: any) => {
                setTableTitle(e.target.value); // React state 업데이트
              };
            }
          }, 0);
        }
      });

      table.draw(data, options);
    }

    // 📌 Boxplot
    if (view === "boxplot") {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Dataset");

      parsed.forEach((_, i) => {
        data.addColumn("number", `Set ${i + 1}`);
        data.addColumn({ id: `min${i}`, type: "number", role: "interval" });
        data.addColumn({ id: `max${i}`, type: "number", role: "interval" });
      });

      const row: any[] = ["Mean"];
      parsed.forEach(values => {
        values.sort((a, b) => a - b);
        row.push(mean(values), values[0], values[values.length - 1]);
      });
      data.addRow(row);

      const options = {
        legend: "none",
        title: chartTitle,
        bar: { groupWidth: "40%" },
        intervals: { style: "bars", lineWidth: 2, color: "black" },
        colors: colors.slice(0, inputs.length),
      };

      new google.visualization.ColumnChart(chartDiv).draw(data, options);
    }
  }, [isClient, googleLoaded, view, inputs, i18n.language]);  // t 대신 i18n.language 사용으로 안정화

  const addInput = () => setInputs([...inputs, ""]);

  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const resetAll = () => {
    setInputs(["", "", ""]);
    setErrors([]);
    setTableTitle("");
    setView(null);
  };

  const validateInputs = () => {
    const empty = inputs.some(v => v.trim() === "");
    if (empty) {
      alert(t("alert_empty"));
      return false;
    }
    return true;
  };

  return (
    <S.Container>
      {/* 언어 변경 */}
      <S.LanguageDropdown>
        <S.LanguageToggle onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FiGlobe style={{ marginRight: 8 }} />
          <span>{t("language")}</span>
          <S.ChevronIcon>▼</S.ChevronIcon>
        </S.LanguageToggle>
        {dropdownOpen && (
          <S.DropdownMenu>
            {languages.map((lang) => (
              <S.DropdownItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                selected={lang.code === currentLang}
              >
                {lang.label}
                {lang.code === currentLang && <S.CheckIcon>✓</S.CheckIcon>}
              </S.DropdownItem>
            ))}
          </S.DropdownMenu>
        )}
      </S.LanguageDropdown>

      {isClient && (
        <>
          <S.Title>{t("title")}</S.Title>
          <p>{t("instruction")}</p>

          {/* 입력칸 */}
          {inputs.map((value, index) => (
            <S.InputGroup key={index}>
              <S.TextInput
                type="text"
                style={{ borderColor: colors[index] }}
                placeholder={t("input_placeholder")}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <S.DelButton onClick={() => removeInput(index)}>
                {t("delete")}
              </S.DelButton>
              {errors[index] && <S.ErrorText>{errors[index]}</S.ErrorText>}
            </S.InputGroup>
          ))}

          {/* 입력칸 추가/초기화 */}
          <S.Gbutton>
            <S.GButton onClick={addInput}>{t("add_input")}</S.GButton>
            <S.GButton onClick={resetAll}>{t("reset")}</S.GButton>
          </S.Gbutton>

          {/* 그래프 버튼 */}
          <S.Sbutton>
            <S.Button onClick={() => validateInputs() && setView("line")}>
              {t("line_chart")}
            </S.Button>
            <S.Button onClick={() => validateInputs() && setView("table")}>
              {t("table")}
            </S.Button>
            <S.Button onClick={() => validateInputs() && setView("boxplot")}>
              {t("boxplot")}
            </S.Button>
          </S.Sbutton>
        </>
      )}

      {view && <S.ChartWrapper id="chart_div" />}
    </S.Container>
  );
}