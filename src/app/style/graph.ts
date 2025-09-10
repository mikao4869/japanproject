  // style/graph.ts
  import styled from "styled-components";
  // 스타일 정의
  export const Container = styled.div`
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
  `;

  export const InputGroup = styled.div`
    margin: 5px;
  `;

  export const TextInput = styled.input`
    width: 300px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    outline: none;
  `;

  export const Button = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background: #4caf50;
    color: #fff;
    cursor: pointer;
    margin: 5px;

    &:hover {
      background: #45a049;
    }
  `;

  export const DelButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background: #f44336;
    color: #fff;
    cursor: pointer;
    margin: 5px;
  `;

  export const ChartWrapper = styled.div`
    width: 90%;
    max-width: 900px;
    height: 500px;
    margin: 20px auto;
  `;