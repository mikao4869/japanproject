import styled from "styled-components";
export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f9f9f9;
  margin: 0;
  padding: 20px;
`;

export const Title = styled.h2`
  color: #333;
`;

export const InputGroup = styled.div`
  margin: 5px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Button = styled.button<{ danger?: boolean }>`
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.danger ? "#f44336" : "#4CAF50")};
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  margin: 5px;

  &:hover {
    background: ${(props) => (props.danger ? "#d32f2f" : "#45a049")};
  }
`;

export const ChartWrapper = styled.div`
  width: 95%;
  max-width: 1000px;
  height: 500px;
  margin: 20px auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
