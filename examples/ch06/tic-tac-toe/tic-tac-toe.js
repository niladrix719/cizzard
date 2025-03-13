import { createApp, h, hFragment, hString } from "https://unpkg.com/cizzard@1.1.0/dist/cizzard.js";

const state = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  player: 'X',
  isWinner: null,
  isDraw: false,
  filled: 0
}

const reducers = {
  'click-cell': (state, { x, y }) => {
    console.log(x, y)
    if(state.board[x][y])
      throw new Error ("Invalid Move")
    if(x >= 3 || x < 0 || y >=3 || y < 0)
      throw new Error ("Invalid Move")
    if(state.isWinner || state.isDraw)
      throw new Error ("Game Over")

    const newBoard = [...state.board]
    newBoard[x][y] = state.player;
    state.board = newBoard

    let isDraw;

    if(state.filled + 1 === 9)
      isDraw = true;

    let isWinner;

    for(let i = 0; i < 3; i++) {
      if(newBoard[i][0] === newBoard[i][1] && newBoard[i][1] === newBoard[i][2]) {
        isWinner = newBoard[i][0]
        break;
      }
    }

    for(let i = 0; i < 3; i++) {
      if(newBoard[0][i] === newBoard[1][i] && newBoard[1][i] === newBoard[2][i]) {
        isWinner = newBoard[0][i]
        break;
      }
    }

    if(newBoard[0][0] === newBoard[1][1] && newBoard[1][1] === newBoard[2][2]) {
      isWinner = newBoard[0][0]
    }

    if(newBoard[0][2] === newBoard[1][1] && newBoard[1][1] === newBoard[2][0]) {
      isWinner = newBoard[0][2]
    }

    return {
      ...state,
      board: newBoard,
      player: state.player === "X" ? "O" : "X",
      filled: state.filled + 1,
      isDraw,
      isWinner,
    }
  }
}

function App (state, emit) {
  return hFragment([
    state.isWinner ? h('h1', {}, [
      hString(`Winner is : ${state.isWinner}`)
    ]):
    state.isDraw ? h('h1', {}, [
      hString(`It's a draw!`)
    ]) :
    state.player === "X" ? h('h1', {}, [
      hString(`It's X's turn`)
    ]) :
    h('h1', {}, [
      hString(`It's O's turn`)
    ]),
    h('table', { "border" : "1"}, [
      ...state.board.map((row, i) =>
        h('tr', {}, row.map((_, j) =>
          h('td', { on: {
            "click": () => {
              emit("click-cell", { x:i, y:j })
            }
          }}, [state.board[i][j]])
        ))
      )
    ])
  ])
}

createApp({ state, reducers, view: App }).mount(document.body)