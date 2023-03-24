import React, { useEffect, useMemo, useState } from "react";
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
  /* border: 2px white solid; */
  /* height: calc(100% / 9); */
  /* height: 100%; */
  height: 20px;
  /* background-color: rgba(255, 255, 255, ${({ isValue }) =>
    isValue ? 0.2 : 0}; */

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
  ${({ isValue }) =>
    isValue &&
    css`
      /* text-shadow: 0px 4px 3px rgba(0, 255, 0, 0.4),
        0px 8px 13px rgba(0, 255, 0, 0.1), 0px 18px 23px rgba(0, 255, 0, 0.1); */
      text-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
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
    //   [0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
    //     <TR key={x}>
    //       {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => (
    //         <TD key={`${x} ${y}`}>
    //           <SquareButton onClick={() => onSquareClick(x, y)}>
    //             {y}
    //           </SquareButton>
    //         </TD>
    //       ))}
    //     </TR>
    //   )),
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
