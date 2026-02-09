
import { useEffect, useState } from "react";
import * as S from "../style/graph";

// 10가지 색상 배열
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

export default function Graph() {
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      (window as any).google.charts.load("current", { packages: ["corechart"] });
    };
    document.body.appendChild(script);
  }, []);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // 초기화 함수: 입력값 모두 빈 문자열로 변경
  const resetInputs = () => {
    setInputs(inputs.map(() => ""));
  };

  const drawChart = () => {
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
      return;
    }

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

    const chart = new google.visualization.LineChart(
      document.getElementById("curve_chart")
    );
    chart.draw(data, options);
  };

  return (
    <S.Container>
      <h2> 꺾은선 그래프</h2>
      <p>콤마(,)로 구분된 숫자를 입력하세요</p>
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
      <div>
        <S.Button onClick={addInput}>+ Input 추가</S.Button>
        <S.Button onClick={drawChart}>그래프 그리기</S.Button>
        <S.Button onClick={resetInputs}>초기화</S.Button>
      </div>
      <S.ChartWrapper id="curve_chart"></S.ChartWrapper>
    </S.Container>
  );
}
