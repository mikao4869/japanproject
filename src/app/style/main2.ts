import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 1.25rem;

  @media (max-width: 30rem) {  /* 모바일: 480px 이하 */
    padding: 0.5rem;
  }
`;

export const TableWrapper = styled.div`
  width: 20rem;
  max-height: 50rem;
  border: 0.0625rem solid #ccc;
  margin: 2rem auto;

  @media (max-width: 30rem) {  /* 모바일: 테이블 너비 전체화 */
    width: 100%;
    max-width: 100%;
    margin: 1rem auto;
  }
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

  @media (max-width: 30rem) {  /* 모바일: 폰트 크기 및 스크롤 최적화 */
    font-size: 0.75rem;
  }
`;

export const Th = styled.th`
  background-color: #F0EDFE;
  border: 0.0625rem solid black;
  padding: 0.5rem;
  text-align: center;
  user-select: none;
  white-space: nowrap;

  @media (max-width: 30rem) {  /* 모바일: 패딩 줄임 */
    padding: 0.25rem;
  }
`;

export const Td = styled.td`
  border: 0.0625rem solid black;
  padding: 0.5rem;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 30rem) {  /* 모바일: 패딩 줄임 */
    padding: 0.25rem;
  }
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

  @media (max-width: 30rem) {  /* 모바일: 버튼 크기 줄임 */
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
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

  @media (max-width: 30rem) {  /* 모바일: 버튼 크기 줄임 */
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
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

  @media (max-width: 30rem) {  /* 모바일: 버튼 크기 줄임 */
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
`;

export const Gbutton = styled.div`
  position: relative;

  @media (max-width: 30rem) {  /* 모바일: 버튼 그룹 스택 */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Sbutton = styled.div`
  @media (max-width: 30rem) {  /* 모바일: 버튼 그룹 스택 */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.625rem 0;

  @media (max-width: 30rem) {  /* 모바일: 입력 그룹 세로 스택 */
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const TextInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 0.125rem solid;
  border-radius: 0.25rem;
  margin-right: 0.625rem;
  width: 18.75rem;
  outline: none;

  @media (max-width: 30rem) {  /* 모바일: 입력 너비 전체화 */
    width: 100%;
    max-width: 20rem;
    margin-right: 0;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 31.25rem;
  margin-top: 1.25rem;

  @media (max-width: 30rem) {  /* 모바일: 차트 높이 줄임 */
    height: 20rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.625rem;

  @media (max-width: 30rem) {  /* 모바일: 제목 크기 줄임 */
    font-size: 1.25rem;
  }
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

    @media (max-width: 30rem) {
      padding: 0.5rem;
    }
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

    @media (max-width: 30rem) {
      padding: 0.375rem;
      font-size: 0.75rem;
    }
  }
`;

export const ErrorText = styled.p`
  color: black;

  @media (max-width: 30rem) {
    font-size: 0.875rem;
  }
`;

export const LanguageWrapper = styled.div`
`;

export const LanguageDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.25rem;

  @media (max-width: 30rem) {  /* 모바일: 드롭다운 중앙 정렬 */
    display: block;
    margin: 0 auto 1rem;
    text-align: center;
  }
`;

export const LanguageToggle = styled.button`
  display: flex;
  align-items: center;
  background: white;
  color: #333;
  margin-left: 80rem;  /* 데스크톱: 유지 */
  position: relative;
  bottom: -1rem;
  border: 0.0625rem solid #e0e0e0;
  padding: 0.625rem 1rem;
  border-radius: 1.5625rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  outline: none;

  @media (max-width: 30rem) {  /* 모바일: 위치 및 마진 수정 */
    margin-left: 0;
    margin: 0 auto;
    display: block;
    bottom: 0;
    width: fit-content;
  }

  &:hover {
    background: #f9f9f9;
    transform: translateY(-2px);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ChevronIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  transition: transform 0.3s ease;

  @media (max-width: 30rem) {
    margin-left: 0.375rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 160%;
  left: 89.6%;
  right: 0;
  width: 10rem;
  height: auto;
  background: white;
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 140px;

  @media (max-width: 30rem) {  /* 모바일: 드롭다운 전체 너비 및 위치 중앙 */
    left: 0;
    right: 0;
    top: 100%;
    width: 100%;
    max-width: 15rem;
    margin: 0 auto;
  }
`;

export const DropdownItem = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${(props) => (props.selected ? '#333' : '#666')};
  background: ${(props) => (props.selected ? '#f5f5f5' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s ease;

  @media (max-width: 30rem) {  /* 모바일: 패딩 및 폰트 조정 */
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }

  &:hover {
    background: #f0f0f0;
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

export const CheckIcon = styled.span`
  font-size: 1rem;
  color: #81D4FA;
  font-weight: bold;

  @media (max-width: 30rem) {
    font-size: 0.875rem;
  }
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

export const TableTitleInput = styled.input`
  width: 120px;
  border: 1px solid #ccc;
  padding: 3px;
  font-size: 13px;
  text-align: center;
  border-radius: 6px;
  
  &::placeholder {
    text-align: center;
  }
`;

export const AddColButton = styled.button`
  padding: 3px 6px;
  border: 1px solid #888;
  border-radius: 4px;
  background: #f0f0f0;
  cursor: pointer;
`;