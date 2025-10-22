'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import * as S from '../style/main2';
import { FiGlobe } from "react-icons/fi"; // 지구본 아이콘

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
  const [errors, setErrors] = useState<string[]>([]); // 입력 에러 상태
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !googleLoaded || !view) return;

    const chartDiv = document.getElementById("chart_div");
    if (!chartDiv) return;

    const google = (window as any).google;
    if (!google || !google.visualization) return;

    const parsed: number[][] = inputs.map((input) =>
      input.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v))
    );

    // 빈 값 체크
    const newErrors = inputs.map((input, i) =>
      input.trim() === "" || parsed[i].length === 0 ? t("alert_empty") : ""
    );
    setErrors(newErrors);

    if (newErrors.some(msg => msg !== "")) {
      setView(null);
      return;
    }

    // Line Chart
    if (view === "line") {
      const maxLen = Math.max(...parsed.map(arr => arr.length));
      const header = ["Index", ...parsed.map((_, i) => `データ${i + 1}`)];
      const dataArray: (string | number | null)[][] = [header];

      for (let i = 0; i < maxLen; i++) {
        const row: (number | null)[] = [(i + 1) * 20];
        parsed.forEach(arr => row.push(arr[i] ?? null));
        dataArray.push(row);
      }

      const data = google.visualization.arrayToDataTable(dataArray);
      const options = {
        title: t("line_chart"),
        curveType: "function",
        legend: { position: "bottom" },
        colors,
      };

      new google.visualization.LineChart(chartDiv).draw(data, options);
    }

    // Boxplot
    if (view === "boxplot") {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Dataset");
      parsed.forEach((_, i) => {
        data.addColumn("number", `Set ${i + 1}`);
        data.addColumn({ id: `min${i}`, type: "number", role: "interval" });
        data.addColumn({ id: `max${i}`, type: "number", role: "interval" });
      });

      const row: any[] = ["平均"];
      parsed.forEach(values => {
        values.sort((a, b) => a - b);
        row.push(mean(values), values[0], values[values.length - 1]);
      });
      data.addRow(row);

      const options = {
        legend: "none",
        title: t("boxplot"),
        bar: { groupWidth: "40%" },
        intervals: { style: "bars", lineWidth: 2, color: "black" },
        colors: colors.slice(0, inputs.length),
      };

      new google.visualization.ColumnChart(chartDiv).draw(data, options);
    }

    // Table
    if (view === "table") {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Index");
      parsed.forEach((_, i) => data.addColumn("number", `データ${i + 1}`));

      const maxLen = Math.max(...parsed.map(arr => arr.length));
      for (let i = 0; i < maxLen; i++) {
        const row: (string | number | null)[] = [(i + 1).toString()];
        parsed.forEach(arr => row.push(arr[i] ?? null));
        data.addRow(row);
      }

      const options = {
        allowHtml: true,
        width: "50%",
        cssClassNames: {
          headerCell: "custom-table-th",
          tableCell: "custom-table-td",
          headerRow: "custom-table-header",
          tableRow: "custom-table-row",
        },
      };

      new google.visualization.Table(chartDiv).draw(data, options);
    }

  }, [isClient, googleLoaded, view, inputs, t]);

  const addInput = () => setInputs([...inputs, ""]);
  const removeInput = (index: number) => setInputs(inputs.filter((_, i) => i !== index));
  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    const newErrors = [...errors];
    newErrors[index] = "";
    setErrors(newErrors);
  };
  const resetAll = () => {
    setInputs(["", "", ""]);
    setErrors([]);
    setView(null);
  };

  return (
    <S.Container>
   
      <S.LanguageDropdown>
        <S.LanguageToggle onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FiGlobe style={{ marginRight: 8, fontSize: '1.2rem' }} />
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

          {inputs.map((value, index) => (
            <S.InputGroup key={index}>
              <S.TextInput
                type="text"
                style={{ borderColor: colors[index % colors.length] }}
                placeholder={t("input_placeholder")}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <S.DelButton onClick={() => removeInput(index)}>{t("delete")}</S.DelButton>
              {errors[index] && <S.ErrorText>{errors[index]}</S.ErrorText>}
            </S.InputGroup>
          ))}

          <S.Gbutton>
            <S.GButton onClick={addInput}>{t("add_input")}</S.GButton>
            <S.GButton onClick={resetAll}>{t("reset")}</S.GButton>
          </S.Gbutton>

          <S.Sbutton>
            <S.Button onClick={() => setView("line")}>{t("line_chart")}</S.Button>
            <S.Button onClick={() => setView("table")}>{t("table")}</S.Button>
            <S.Button onClick={() => setView("boxplot")}>{t("boxplot")}</S.Button>
          </S.Sbutton>
        </>
      )}

      {view && <S.ChartWrapper id="chart_div" />}
    </S.Container>
  );
}