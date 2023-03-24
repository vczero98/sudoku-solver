import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NumberSelect from "./NumberSelect";
import SudokuBoard from "./SudokuBoard";

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  text-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const BoardContainer = styled.div`
  height: 700px;
  width: 700px;
  padding: 20px;
  background: rgb(255, 255, 255, 0.3);
  margin: 0 auto;
  border-radius: 5%;
  position: relative;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const Main = () => {
  const [selectingSquareValue, setSelectingSquareValue] = useState(null);
  const [boardState, setBoardState] = useState(null);

  // Generate initial board state
  useEffect(() => {
    setBoardState(
      [...Array(9).keys()].map((x) =>
        [...Array(9).keys()].map((y) => ({ value: null, pen: null }))
      )
    );
  }, []);

  const onSudokuSquareClick = useCallback(
    (x, y) => {
      if (boardState[x][y].value) {
        // If there is already a value, we clear it
        const newBoardState = produce(boardState, (draft) => {
          draft[x][y].value = null;
        });

        setBoardState(newBoardState);
      } else {
        // We show the options for the value of the square
        setSelectingSquareValue({ x, y });
      }
    },
    [boardState]
  );

  const onNumberSelectClick = useCallback(
    (newValue) => {
      const { x, y } = selectingSquareValue;

      // Update the board state
      const newBoardState = produce(boardState, (draft) => {
        draft[x][y].value = newValue;
      });
      setBoardState(newBoardState);

      // Hide the number select
      setSelectingSquareValue(null);
    },
    [selectingSquareValue]
  );

  return (
    <>
      <Title>Sudoku Solver!</Title>

      <BoardContainer>
        {selectingSquareValue ? (
          <NumberSelect onValueSelect={onNumberSelectClick} />
        ) : (
          <SudokuBoard
            onSquareClick={onSudokuSquareClick}
            {...{ boardState }}
          />
        )}
      </BoardContainer>
    </>
  );
};

export default Main;
