import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  height: 100%;
  max-height: 100%;
  position: relative;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`;

const TR = styled.tr`
  &:not(:first-child) {
    border-top: 5px solid rgba(255, 255, 255, 0.5);
  }
`;

const TD = styled.td`
  font-size: 80px;
  text-align: center;
  vertical-align: center;
  height: 20px;
  position: relative;

  &:not(:first-child) {
    border-left: 5px solid rgba(255, 255, 255, 0.5);
  }
`;

const SquareButton = styled.button`
  height: 100%;
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  top: 0;
  left: 0;
`;

const NumberSelect = ({ onValueSelect }) => {
  const renderedSquares = useMemo(
    () =>
      [0, 1, 2].map((x) => (
        <TR key={x}>
          {[0, 1, 2].map((y) => (
            <TD key={`${x} ${y}`}>
              <SquareButton onClick={() => onValueSelect(x * 3 + y + 1)}>
                {x * 3 + y + 1}
              </SquareButton>
            </TD>
          ))}
        </TR>
      )),
    [onValueSelect]
  );

  return (
    <Table>
      <tbody>{renderedSquares}</tbody>
    </Table>
  );
};

export default NumberSelect;
