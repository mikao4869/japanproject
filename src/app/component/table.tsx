  'use client';
  import React, { useState } from "react";
  import * as S from '../style/table';

  export function Table() {
    // 열과 행 상태
    const [columns, setColumns] = useState<string[]>(["조건A", "조건B", "조건C", "조건D", "조건E"]);
    const [rows, setRows] = useState<number>(1); // 처음엔 1행만

    // 열 추가
    const addColumn = () => {
      setColumns([...columns, `조건${String.fromCharCode(65 + columns.length)}`]);
    };

    // 행 추가
    const addRow = () => {
      setRows(rows + 1);
    };

    // 열 삭제 (마지막 열 삭제)
    const removeColumn = () => {
      if (columns.length > 1) {
        setColumns(columns.slice(0, -1));
      }
    };

    // 행 삭제 (마지막 행 삭제)
    const removeRow = () => {
      if (rows > 1) {
        setRows(rows - 1);
      }
    };

    return (
      <S.Container>
        <h2>표 생성</h2>
        <p>콤마(,)로 구분된 숫자를 입력하세요</p>
      <S.TableWrapper>

          <S.Button onClick={addColumn}>열 추가</S.Button>
          <S.DelButton onClick={removeColumn}>열 삭제</S.DelButton>
          <S.Button onClick={addRow}>행 추가</S.Button>
          <S.DelButton onClick={removeRow}>행 삭제</S.DelButton>
    

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
                    <S.Cell />
                  </S.Td>
                ))}
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>
      </S.Container>
    );
  } 
