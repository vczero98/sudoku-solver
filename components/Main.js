import Board from "@/logic/board";
import Solver from "@/logic/solver";
import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NumberSelect from "./NumberSelect";
import SudokuBoard from "./SudokuBoard";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  position: absolute;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  text-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  line-height: 50px;
  margin: 0;
  font-size: 10vh;

  /* Landscape */
  @media (min-aspect-ratio: 16/9) {
    font-size: 10vh;
  }

  /* Portrait */
  @media (max-aspect-ratio: 3/4) {
    font-size: 10vw;
  }
`;

const BoardContainer = styled.div`
  aspect-ratio: 1;
  background: rgb(255, 255, 255, 0.3);
  border-radius: 5%;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow: hidden;
  height: 60vh;

  /* Landscape */
  @media (min-aspect-ratio: 16/9) {
    height: 80%;
    background: #9af; /* blue */
  }

  /* Portrait */
  @media (max-aspect-ratio: 3/4) {
    background: red;
    height: auto;
    width: 80%;
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* top: 5%; */
  height: 20vh;

  /* Landscape */
  @media (min-aspect-ratio: 16/9) {
    top: 0;
    height: 50%;
    width: 50%;
  }
`;

const BodyContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  /* Landscape */
  @media (min-aspect-ratio: 16/9) {
    width: 50%;
  }
`;

const FooterContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
  bottom: 0;

  /* Landscape */
  @media (min-aspect-ratio: 16/9) {
    height: 50%;
    width: 50%;
  }
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

  const solveBoard = (boardState) => {
    const board = new Board();

    // Fill board
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (boardState[x][y].value) {
          board.addValue(x, y, boardState[x][y].value);
        }
      }
    }

    const solvedBoard = Solver.solve(board);

    // Create new board state
    const newBoardState = produce(boardState, (draft) => {
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          draft[x][y].pen = solvedBoard
            ? solvedBoard.getSquare(x, y).pen
            : null;
        }
      }
    });

    setBoardState(newBoardState);
  };

  const onSudokuSquareClick = useCallback(
    (x, y) => {
      if (boardState[x][y].value) {
        // If there is already a value, we clear it
        const newBoardState = produce(boardState, (draft) => {
          draft[x][y].value = null;
        });

        setBoardState(newBoardState);

        solveBoard(newBoardState);
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

      solveBoard(newBoardState);
    },
    [selectingSquareValue]
  );

  return (
    <Container>
      <HeaderContainer>
        <Title>Sudoku Solver!</Title>
      </HeaderContainer>

      <BodyContainer>
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
      </BodyContainer>

      <FooterContainer>{/* <button>Reset board</button> */}</FooterContainer>
    </Container>
  );
};

export default Main;
