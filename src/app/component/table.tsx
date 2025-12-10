'use client';
import React, { useState } from "react";
import * as S from '../style/table';

// 각 표의 데이터 구조
interface TableData {
  id: number;
  title: string;
  columns: string[];
  rows: number;
  values: string[][]; // 각 셀의 입력값 저장
}

export function Table() {
  const [tables, setTables] = useState<TableData[]>([
    {
      id: 1,
      title: "표 1",
      columns: ["조건A", "조건B", "조건C"],
      rows: 1,
      values: [["", "", ""]],
    },
  ]);

  // 새로운 표 추가
  const addTable = () => {
    const newId = tables.length + 1;
    setTables([
      ...tables,
      {
        id: newId,
        title: `표 ${newId}`,
        columns: ["조건A", "조건B", "조건C"],
        rows: 1,
        values: [["", "", ""]],
      }
    ]);
  };

  // 특정 표 제목 변경
  const updateTitle = (id: number, newTitle: string) => {
    setTables(tables.map(tbl => 
      tbl.id === id ? { ...tbl, title: newTitle } : tbl
    ));
  };

  // 셀 입력값 갱신
  const updateCell = (tableId: number, row: number, col: number, value: string) => {
    setTables(tables.map(tbl => {
      if (tbl.id !== tableId) return tbl;

      const newValues = tbl.values.map(r => [...r]);
      newValues[row][col] = value;

      return { ...tbl, values: newValues };
    }));
  };

  // 열 추가
  const addColumn = (id: number) => {
    setTables(tables.map(tbl => {
      if (tbl.id !== id) return tbl;

      const newColName = `조건${String.fromCharCode(65 + tbl.columns.length)}`;
      return {
        ...tbl,
        columns: [...tbl.columns, newColName],
        values: tbl.values.map(row => [...row, ""]),
      };
    }));
  };

  // 열 삭제
  const removeColumn = (id: number) => {
    setTables(tables.map(tbl => {
      if (tbl.id !== id || tbl.columns.length <= 1) return tbl;

      return {
        ...tbl,
        columns: tbl.columns.slice(0, -1),
        values: tbl.values.map(row => row.slice(0, -1)),
      };
    }));
  };

  // 행 추가
  const addRow = (id: number) => {
    setTables(tables.map(tbl => {
      if (tbl.id !== id) return tbl;

      return {
        ...tbl,
        rows: tbl.rows + 1,
        values: [...tbl.values, new Array(tbl.columns.length).fill("")],
      };
    }));
  };

  // 행 삭제
  const removeRow = (id: number) => {
    setTables(tables.map(tbl => {
      if (tbl.id !== id || tbl.rows <= 1) return tbl;

      return {
        ...tbl,
        rows: tbl.rows - 1,
        values: tbl.values.slice(0, -1),
      };
    }));
  };

  // 평균 계산
  const calcMean = (tbl: TableData) => {
    return tbl.columns.map((_, colIdx) => {
      const nums = tbl.values
        .map(row => parseFloat(row[colIdx]))
        .filter(n => !isNaN(n));

      if (nums.length === 0) return "-";

      const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
      return avg.toFixed(2);
    });
  };

  return (
    <S.Container>
      <h2>표 생성 기능</h2>
      <S.AddTableButton onClick={addTable}>+ 새 표 추가</S.AddTableButton>

      {tables.map((tbl) => {
        const means = calcMean(tbl);

        return (
          <S.TableWrapper key={tbl.id}>
            
            {/* 조작 버튼들 */}
            <div>
              <S.Button onClick={() => addColumn(tbl.id)}>열 추가</S.Button>
              <S.DelButton onClick={() => removeColumn(tbl.id)}>열 삭제</S.DelButton>

              <S.Button onClick={() => addRow(tbl.id)}>행 추가</S.Button>
              <S.DelButton onClick={() => removeRow(tbl.id)}>행 삭제</S.DelButton>
            </div>

            {/* 표 렌더링 */}
            <S.Table>
              <thead>
                <tr>
                  {tbl.columns.map((col, idx) => (
                    <S.Th key={idx}>{col}</S.Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbl.values.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <S.Td key={cIdx}>
                        <S.Cell
                          value={cell}
                          onChange={(e) =>
                            updateCell(tbl.id, rIdx, cIdx, e.target.value)
                          }
                          placeholder="숫자 입력"
                        />
                      </S.Td>
                    ))}
                  </tr>
                ))}

                {/* 평균 행 */}
                <tr>
                  {means.map((avg, i) => (
                    <S.Td key={i} style={{ background: "#f4f4f4", fontWeight: "bold" }}>
                      {avg}
                    </S.Td>
                  ))}
                </tr>
              </tbody>
            </S.Table>
          </S.TableWrapper>
        );
      })}
    </S.Container>
  );
}
