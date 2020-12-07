import { useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import Cell from "./cell";

type SheetTypes = {
  columns: number;
};

export const Sheet = styled.div<SheetTypes>`
  display: grid;
  grid-template-columns: 32px repeat(${(props) => props.columns - 1}, 90px);
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  height: 400px;
  margin-top: 2rem;
`;

type TableType = {
  rows: number;
  columns: number;
};

const getColumnName = (index: number) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Table = ({ rows, columns }: TableType) => {
  const [data, setData] = useState({});

  const setCellValue = useCallback(
    ({ row, column, value }) => {
      const newData = { ...data };
      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

  const computeCell = useCallback(
    ({ row, column }) => {
      const cellContent = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          const expression = cellContent.substr(1).split(/([+*-])/g);
          let subStitutedExpression = "";
          expression.forEach((item) => {
            if (/^[A-z][0-9]$/g.test(item || "")) {
              subStitutedExpression += data[(item || "").toUpperCase()] || 0;
            } else {
              subStitutedExpression += item;
            }
          });
          try {
            return eval(subStitutedExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data]
  );

  return (
    <Sheet columns={columns}>
      {Array(rows)
        .fill("")
        .map((m, i) => {
          return (
            <Fragment key={i}>
              {Array(columns)
                .fill("")
                .map((n, j) => {
                  const columnName = getColumnName(j);
                  return (
                    <Cell
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </Sheet>
  );
};

export default Table;
