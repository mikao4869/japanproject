
'use client';
import { useEffect, useState } from 'react';
import * as S from '../style/main';

const colors = [
  "#E60026", // 빨강
  "#E08325", // 주황
  "#FFFF33", // 노랑
  "#8FCB82", // 연두
  "#3F7B1A", // 초록
  "#5E9ECF", // 청록
  "#325A9A", // 파랑
  "#212F85", // 남색
  "#7C2E8F", // 보라
  "#BB2E6D"  // 자주
];

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export default function Main() {
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const [view, setView] = useState<"line" | "table" | "boxplot" | null>(null);
  const [columns, setColumns] = useState<string[]>(["조건A", "조건B", "조건C", "조건D", "조건E"]);
  const [rows, setRows] = useState<number>(1);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);

  // Load Google Charts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;
    script.onload = () => {
      (window as any).google.charts.load("current", {
        packages: ["corechart"],
        callback: () => {
          setGoogleLoaded(true);
          console.log("Google Charts loaded");
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Draw charts when view changes and Google Charts is loaded
  useEffect(() => {
    if (!googleLoaded || !view || (view !== "line" && view !== "boxplot")) return;

    const chartDiv = document.getElementById("chart_div");
    if (!chartDiv) {
      console.error("Chart container not found");
      return;
    }

    const google = (window as any).google;
    if (!google || !google.visualization) {
      alert("Google Charts가 아직 로드되지 않았습니다.");
      return;
    }

    const parsed: number[][] = inputs.map((input) =>
      input
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v))
    );

    const hasInvalid = parsed.some((arr) => arr.length === 0);
    if (hasInvalid) {
      alert("숫자를 입력해주세요! (예: 10,20,30,40)");
      setView(null);
      return;
    }

    if (view === "line") {
      const series = parsed;
      const maxLen = Math.max(...series.map((arr) => arr.length));

      const header = ["Index", ...series.map((_, i) => `데이터${i + 1}`)];
      const dataArray: (string | number | null)[][] = [header];

      for (let i = 0; i < maxLen; i++) {
        const row: (number | null)[] = [(i + 1) * 20];
        series.forEach((arr) => {
          row.push(arr[i] ?? null);
        });
        dataArray.push(row);
      }

      const data = google.visualization.arrayToDataTable(dataArray);

      const options = {
        title: "꺾은선 그래프",
        hAxis: { title: "" },
        vAxis: { title: "Value" },
        curveType: "function",
        legend: { position: "bottom" },
        colors: colors,
      };

      const chart = new google.visualization.LineChart(chartDiv);
      chart.draw(data, options);
    } else if (view === "boxplot") {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Dataset");

      parsed.forEach((_, i) => {
        data.addColumn("number", `Set ${i + 1}`);
        data.addColumn({ id: `min${i}`, type: "number", role: "interval" });
        data.addColumn({ id: `max${i}`, type: "number", role: "interval" });
      });

      const row: any[] = ["평균"];
      parsed.forEach((values) => {
        values.sort((a, b) => a - b);
        const min = values[0];
        const max = values[values.length - 1];
        const avg = mean(values);
        row.push(avg, min, max);
      });
      data.addRow(row);

      const options = {
        legend: "none",
        title: "Box Plot 그래프",
        bar: { groupWidth: "40%" },
        intervals: { style: "bars", lineWidth: 2, color: "black" },
        vAxis: { title: "값" },
        hAxis: { title: "" },
        colors: colors.slice(0, inputs.length),
      };

      const chart = new google.visualization.ColumnChart(chartDiv);
      chart.draw(data, options);
    }
  }, [googleLoaded, view, inputs]);

  // Add input field
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  // Remove input field
  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Reset inputs and visualization
  const resetAll = () => {
    setInputs(inputs.map(() => ""));
    setView(null);
    setColumns(["조건A", "조건B", "조건C", "조건D", "조건E"]);
    setRows(1);
    const chartDiv = document.getElementById("chart_div");
    if (chartDiv) chartDiv.innerHTML = "";
  };

  // Render Table
  const renderTable = () => {
    const parsed: number[][] = inputs.map((input) =>
      input
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v))
    );

    const hasInvalid = parsed.some((arr) => arr.length === 0);
    if (hasInvalid) {
      alert("숫자를 입력해주세요! (예: 10,20,30,40)");
      return;
    }

    const maxLen = Math.max(...parsed.map((arr) => arr.length));
    setRows(maxLen);
    setColumns(parsed.map((_, i) => `데이터${i + 1}`));
    setView("table");
  };

  return (
    <S.Container>
      <S.Title>데이터 시각화</S.Title>
      <p>콤마(,)로 구분된 숫자를 입력하세요 (예: 10,20,30,40)</p>

      {inputs.map((value, index) => (
        <S.InputGroup key={index}>
          <S.TextInput
            type="text"
            style={{ borderColor: colors[index % colors.length] }}
            placeholder={`데이터 입력 (예: 10,20,30,40)`}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <S.DelButton onClick={() => removeInput(index)}>삭제</S.DelButton>
        </S.InputGroup>
      ))}

      <S.Gbutton>
        <S.GButton onClick={addInput}>+ Input 추가</S.GButton>
        <S.GButton onClick={resetAll}>초기화</S.GButton>
      </S.Gbutton>
      <S.Sbutton>
        <S.Button onClick={() => setView("line")}>선 그래프</S.Button>
        <S.Button onClick={renderTable}>표</S.Button>
        <S.Button onClick={() => setView("boxplot")}>박스 플롯</S.Button>
      </S.Sbutton>

      {view === "table" && (
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <S.Th key={idx} scope="col">{col}</S.Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <S.Td key={colIndex}>
                      <S.Cell
                        value={
                          inputs[colIndex]
                            ?.split(",")
                            .map((v) => parseFloat(v.trim()))
                            .filter((v) => !isNaN(v))[rowIndex] || ""
                        }
                        readOnly
                      />
                    </S.Td>
                  ))}
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      )}

      {(view === "line" || view === "boxplot") && (
        <S.ChartWrapper id="chart_div"></S.ChartWrapper>
      )}
    </S.Container>
  );
}