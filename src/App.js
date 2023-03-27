import * as React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ChakraBaseProvider , extendTheme , Heading, Text,Button } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'


//Chakra UI
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// Action Types
const SET_SQUARES = 'SET_SQUARES';
const SET_NEXT_VALUE = 'SET_NEXT_VALUE';
const RESTART = 'RESTART';

// Action Creators
const setSquares = (squares) => ({ type: SET_SQUARES, payload: squares });
const setNextValue = (nextValue) => ({ type: SET_NEXT_VALUE, payload: nextValue });
const setRestart = () => ({ type: RESTART });

// Reducer
const initialState = {
  squares: Array(9).fill(null),
  nextValue: 'X'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SQUARES:
      return { ...state, squares: action.payload };
    case SET_NEXT_VALUE:
      return { ...state, nextValue: action.payload };
    case RESTART:
      return { ...initialState };
    default:
      return state;
  }
};

const store = createStore(reducer);

function Board() {
  const squares = useSelector((state) => state.squares);
  const nextValue = useSelector((state) => state.nextValue);
  const dispatch = useDispatch();

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[square] = nextValue;
    dispatch(setSquares(newSquares));
    dispatch(setNextValue(calculateNextValue(newSquares)));
  }

  function restart() {
    dispatch(setRestart());
  }

  function renderSquare(i) {
    return (
      <Button borderRadius='md' bg='blue' color='white' px={4} h={8} className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div>
      <Center>
      <Heading size="lg" mb={2}>Tic Tac Toe</Heading>
      </Center>
      <Center>
      <Text mb={4}>Mari bermain Tic Tac Toe!</Text>
      </Center>
      <Center>
      <Text>{status}</Text>
      </Center>
      <div>
      <Center>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </Center>
      </div>
      <div>
      <Center>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </Center>
      </div>
      <div>
        <Center>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </Center>
      </div>
      <Center>
        <Button  borderRadius='md' bg='tomato' color='white' px={4} h={8} onClick={restart}>restart</Button>
        </Center>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Provider store={store}>
        <Game />
      </Provider>
    </ChakraBaseProvider>
  );
}

export default App;
