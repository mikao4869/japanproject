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
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
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

export const ErrorText = styled.p`
  color: black;
`;

export const LanguageWrapper = styled.div`
`;

export const LanguageDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.25rem;  /* 20px → 1.25rem */
`;

export const LanguageToggle = styled.button`
  display: flex;
  align-items: center;
  background: white;
  color: #333;
  margin-left: 80rem;  /* 유지: 매우 큰 값이지만, 필요 시 조정 추천 (e.g., auto 또는 % 단위) */
  position: relative;
  bottom: -1rem;
  border: 0.0625rem solid #e0e0e0;  /* 1px → 0.0625rem */
  padding: 0.625rem 1rem;  /* 10px 16px → 0.625rem 1rem */
  border-radius: 1.5625rem;  /* 25px → 1.5625rem */
  font-size: 0.875rem;  /* 14px → 0.875rem */
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);  /* 0 2px 8px → 0 0.125rem 0.5rem */
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: #f9f9f9;
    transform: translateY(-2px);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);  /* 0 4px 12px → 0 0.25rem 0.75rem */
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ChevronIcon = styled.span`
  margin-left: 0.5rem;  /* 8px → 0.5rem */
  font-size: 0.75rem;  /* 12px → 0.75rem */
  transition: transform 0.3s ease;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 160%;
  left: 89.6%;
  right: 0;
  width: 10rem;
  height: auto;
  background: white;
  border: 0.0625rem solid #e0e0e0;  /* 1px → 0.0625rem */
  border-radius: 0.5rem;  /* 8px → 0.5rem */
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);  /* 0 4px 12px → 0 0.25rem 0.75rem */
  z-index: 1000;
  min-width: 140px;  /* 유지: px지만, 필요 시 8.75rem으로 변경 가능 */
`;

export const DropdownItem = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;  /* 12px 16px → 0.75rem 1rem */
  font-size: 0.875rem;  /* 14px → 0.875rem */
  color: ${(props) => (props.selected ? '#333' : '#666')};
  background: ${(props) => (props.selected ? '#f5f5f5' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;  /* 8px → 0.5rem */
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;  /* 8px → 0.5rem */
  }
`;

export const CheckIcon = styled.span`
  font-size: 1rem;  /* 16px → 1rem */
  color: #81D4FA;
  font-weight: bold;
`;

// Chevron 호버 효과를 위해 LanguageToggle에 추가 (중첩 대신)
export const LanguageToggleWithChevron = styled(LanguageToggle)`
  & ${ChevronIcon} {
    transition: transform 0.3s ease;
  }

  &:hover ${ChevronIcon} {
    transform: rotate(180deg);
  }
`;