'use client';
import { useEffect, useState } from 'react';
import * as S from '../style/main2';

const colors = [
  "#E60026", "#E08325", "#FFFF33", "#8FCB82", "#3F7B1A",
  "#5E9ECF", "#325A9A", "#212F85", "#7C2E8F", "#BB2E6D"
];

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export default function Main() {
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const [view, setView] = useState<"line" | "table" | "boxplot" | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);

  useEffect(() => {
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
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!googleLoaded || !view) return;

    const chartDiv = document.getElementById("chart_div");
    if (!chartDiv) return;

    const google = (window as any).google;
    if (!google || !google.visualization) return;

    const parsed: number[][] = inputs.map((input) =>
      input.split(",").map((v) => parseFloat(v.trim())).filter((v) => !isNaN(v))
    );

    if (parsed.some((arr) => arr.length === 0)) {
      alert("숫자를 입력해주세요! (예: 10,20,30,40)");
      setView(null);
      return;
    }

    if (view === "line") {
      const maxLen = Math.max(...parsed.map((arr) => arr.length));
      const header = ["Index", ...parsed.map((_, i) => `데이터${i + 1}`)];
      const dataArray: (string | number | null)[][] = [header];

      for (let i = 0; i < maxLen; i++) {
        const row: (number | null)[] = [(i + 1) * 20];
        parsed.forEach((arr) => row.push(arr[i] ?? null));
        dataArray.push(row);
      }

      const data = google.visualization.arrayToDataTable(dataArray);
      const options = {
        title: "꺾은선 그래프",
        curveType: "function",
        legend: { position: "bottom" },
        colors,
      };

      new google.visualization.LineChart(chartDiv).draw(data, options);
    }

    if (view === "boxplot") {
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
        row.push(mean(values), values[0], values[values.length - 1]);
      });
      data.addRow(row);

      const options = {
        legend: "none",
        title: "Box Plot 그래프",
        bar: { groupWidth: "40%" },
        intervals: { style: "bars", lineWidth: 2, color: "black" },
        colors: colors.slice(0, inputs.length),
      };

      new google.visualization.ColumnChart(chartDiv).draw(data, options);
    }

    if (view === "table") {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Index");
      parsed.forEach((_, i) => data.addColumn("number", `데이터${i + 1}`));

      const maxLen = Math.max(...parsed.map((arr) => arr.length));
      for (let i = 0; i < maxLen; i++) {
        const row: (string | number | null)[] = [(i + 1).toString()];
        parsed.forEach((arr) => row.push(arr[i] ?? null));
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
  }, [googleLoaded, view, inputs]);

  const addInput = () => setInputs([...inputs, ""]);
  const removeInput = (index: number) => setInputs(inputs.filter((_, i) => i !== index));
  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };
  const resetAll = () => {
    setInputs(["", "", ""]);
    setView(null);
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
            placeholder="데이터 입력 (예: 10,20,30,40)"
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
        <S.Button onClick={() => setView("table")}>표</S.Button>
        <S.Button onClick={() => setView("boxplot")}>박스 플롯</S.Button>
      </S.Sbutton>

      {view && <S.ChartWrapper id="chart_div"></S.ChartWrapper>}
    </S.Container>
  );
}