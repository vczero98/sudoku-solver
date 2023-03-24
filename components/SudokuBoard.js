import React, { useMemo } from "react";
import styled, { css } from "styled-components";

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
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }

  &:nth-child(3n + 1) {
    border-width: 5px;
  }
`;

const TD = styled.td`
  font-size: 40px;
  text-align: center;
  vertical-align: center;
  position: relative;
  height: 20px;

  &:not(:first-child) {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }

  &:nth-child(3n + 1) {
    border-width: 5px;
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
  color: rgba(255, 255, 255, 0.5);

  ${({ isValue }) =>
    isValue &&
    css`
      color: white;
      background: rgba(255, 255, 255, 0.2);
    `};
`;

const SudokuBoard = ({ boardState, onSquareClick }) => {
  const renderedSquares = useMemo(
    () =>
      boardState?.map((row, x) => (
        <TR key={x}>
          {row.map((square, y) => (
            <TD key={`${x} ${y}`}>
              <SquareButton
                onClick={() => onSquareClick(x, y)}
                isValue={square.value}
              >
                {square.value || square.pen || " "}
              </SquareButton>
            </TD>
          ))}
        </TR>
      )),
    [boardState, onSquareClick]
  );

  return (
    <>
      {boardState && (
        <Table>
          <tbody>{renderedSquares}</tbody>
        </Table>
      )}
    </>
  );
};

export default SudokuBoard;
