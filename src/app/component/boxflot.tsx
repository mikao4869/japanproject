"use client";

import React, { useEffect, useState } from "react";
import * as S from "../style/boxflot";

// 평균 계산 함수
function mean(values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// 10가지 색상 배열
const colors = [
  "#E60026", // 빨강 
  "#E08325", // 주황
  "#FFFF33", // 노랑
  "#8FCB82", // 연두
  "#3F7B1A", // 초록
  "#5AA9E6", // 파랑
  "#844D9E", // 보라
  "#FF66B2", // 핑크
  "#00CED1", // 청록
  "#A0522D", // 갈색
];

const Boxflot: React.FC = () => {
  const [datasets, setDatasets] = useState<string[]>(["", ""]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      (window as any).google.charts.load("current", {
        packages: ["corechart"],
        callback: () => console.log("Google Charts loaded"),
      });
    };
    document.body.appendChild(script);
  }, []);

  // 입력창 추가
  const addInput = () => setDatasets([...datasets, ""]);

  // 입력창 삭제
  const removeInput = (index: number) => {
    setDatasets(datasets.filter((_, i) => i !== index));
    const chartDiv = document.getElementById("chart_div");
    if (chartDiv) chartDiv.innerHTML = ""; // 삭제 시 그래프 초기화
  };

  // 입력값 업데이트
  const updateValue = (i: number, value: string) => {
    const copy = [...datasets];
    copy[i] = value;
    setDatasets(copy);
  };

  // 입력값 + 그래프 초기화
  const resetInputs = () => {
    setDatasets(datasets.map(() => ""));
    const chartDiv = document.getElementById("chart_div");
    if (chartDiv) chartDiv.innerHTML = ""; // 그래프 초기화
  };

  // 그래프 그리기
  const drawBoxPlots = () => {
    const google = (window as any).google;
    if (!google || !google.visualization) {
      alert("Google Charts 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const parsed: number[][] = datasets.map((text) =>
      text
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v))
    );

    const hasInvalid = parsed.some((arr) => arr.length === 0);
    if (hasInvalid) {
      alert("숫자를 입력해주세요! (예: 10,20,30,40)");
      return;
    }

    const data = new google.visualization.DataTable();
    data.addColumn("string", "Dataset");

    // 데이터셋 개수만큼 컬럼 추가 (평균 + 오차막대)
    parsed.forEach((_, i) => {
      data.addColumn("number", `Set ${i + 1}`);
      data.addColumn({ id: `min${i}`, type: "number", role: "interval" });
      data.addColumn({ id: `max${i}`, type: "number", role: "interval" });
    });

    // 행 추가
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
      title: "box plot 그래프",
      bar: { groupWidth: "40%" },
      intervals: { style: "bars", lineWidth: 2, color: "black" },
      vAxis: { title: "값" },
      hAxis: { title: "" },
      colors: colors.slice(0, datasets.length),
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  };

  return (
    <S.Container>
      <S.Title>Box plot 그리기</S.Title>
      <p>콤마(,)로 구분된 숫자를 입력하세요</p>

      {datasets.map((val, i) => (
        <S.InputGroup key={i}>
          <S.Input
            type="text"
            style={{ borderColor: colors[i % colors.length] }}
            value={val}
            placeholder={`데이터 ${i + 1} (예: 10,20,30,40)`}
            onChange={(e) => updateValue(i, e.target.value)}
          />
          <S.DelButton onClick={() => removeInput(i)}>삭제</S.DelButton>
        </S.InputGroup>
      ))}

      <div>
        <S.Button onClick={addInput}>+ Input 추가</S.Button>
        <S.Button onClick={drawBoxPlots}>boxplot 그리기</S.Button>
        <S.Button onClick={resetInputs}>초기화</S.Button>
      </div>

      <S.ChartWrapper id="chart_div"></S.ChartWrapper>
    </S.Container>
  );
};

export default Boxflot;
