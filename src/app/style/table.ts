import styled from 'styled-components';

export const Container = styled.div`
font-family: Arial, sans-serif;
text-align: center;
padding: 20px;
`;

export const TableWrapper = styled.div`
  width: 20rem;
  max-height: 50rem;
  border: 1px solid #ccc;
`;

export const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  table-layout: fixed;
  overflow-y: scroll;
  scrollbar-height: hidden;
  color: #000;
  font-size:0.65rem;
`;

export const Th = styled.th`
  background-color: #F0EDFE;
  border: 1px solid black;
  padding: 0.5rem;
  text-align: center;
  user-select: none;
  white-space: nowrap;
`;

export const Td = styled.td`
  border: 1px solid black;
  padding: 0.5rem;
  text-align: center;
  white-space: nowrap;
`;

export const Cell = styled.input`
  width: 100%;
  text-align: center;
  outline: none;
  border: none;
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

export const AddTableButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.2s ease;

  &:hover {
    background: #43a047;
  }

  &:active {
    background: #388e3c;
  }
`;

/* ▣ 표 제목 입력창 */
export const TitleInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 10px;
  margin-bottom: 12px;
  border: 2px solid #cccccc;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4caf50;
    background: #fafffa;
  }
`;