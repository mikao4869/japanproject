import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 1.25rem;
`;

export const TableWrapper = styled.div`
  width: 20rem;
  max-height: 50rem;
  border: 0.0625rem solid #ccc;
  margin: 2rem auto;
`;

export const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  border: 0.0625rem solid black;
  table-layout: fixed;
  overflow-y: scroll;
  scrollbar-height: hidden;
  color: #000;
  font-size: 0.65rem;
`;

export const Th = styled.th`
  background-color: #F0EDFE;
  border: 0.0625rem solid black;
  padding: 0.5rem;
  text-align: center;
  user-select: none;
  white-space: nowrap;
`;

export const Td = styled.td`
  border: 0.0625rem solid black;
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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background: #f44336;
  color: #fff;
  cursor: pointer;
  margin: 0.3125rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background: #4caf50;
  color: #fff;
  cursor: pointer;
  margin: 0.3125rem;
  outline: none;
`;

export const GButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background: #2477a7;
  color: #fff;
  cursor: pointer;
  margin: 0.3125rem;
`;

export const Gbutton = styled.div`
  position: relative;
`;

export const Sbutton = styled.div`
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.625rem 0;
`;

export const TextInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 0.125rem solid;
  border-radius: 0.25rem;
  margin-right: 0.625rem;
  width: 18.75rem;
  outline: none;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 31.25rem;
  margin-top: 1.25rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.625rem;
`;

// Google Charts Table 커스터마이징 스타일
export const customTableHeader = styled.div`
  .custom-table-th {
    background: linear-gradient(90deg, #e3f2fd, #ffffff); 
    color: #333;
    font-weight: 500;
    padding: 0.75rem;
    border-bottom: 0.0625rem solid #ddd;
    border-radius: 0.25rem 0.25rem 0 0;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
export const customTableRow = styled.div`
  .custom-table-row:hover {
    background: #f9f9f9;
  }

  .custom-table-td {
    padding: 0.625rem;
    text-align: center;
    border-bottom: 0.0625rem solid #eee;
    transition: background 0.2s;
    color: #555;
    font-size: 0.875rem;
  }
`;