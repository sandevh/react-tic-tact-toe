import React, { useRef, useState } from 'react'
import './tictactoe.css';
import circleIcon from '../assests/circle.png'
import crossIcon from '../assests/cross.png'

let data = ["", "", "", "", "", "", "", "", ""]

const TicTacToe = () => {

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }
    
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${crossIcon}'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circleIcon}'>`;
      data[num] = "o";
    }
    titleRef.current.innerHTML = `Game On!`

    setCount(count + 1);
    checkWin();
    if (count >= 8) {
      titleRef.current.innerHTML = `Draw!`
    }
  }

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  }

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Player <img src='${crossIcon}'> won!`;
    } else {
      titleRef.current.innerHTML = `Player <img src='${circleIcon}'> won!`;
    }
  }

  const reset = () => {
    setLock(false);
    setCount(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = "";
    }
    titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
    boxArray.forEach((e) => {
      e.current.innerHTML = "";
    });
  }

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => {toggle(e, 0)}}></div>
          <div className="boxes" ref={box2} onClick={(e) => {toggle(e, 1)}}></div>
          <div className="boxes" ref={box3} onClick={(e) => {toggle(e, 2)}}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => {toggle(e, 3)}}></div>
          <div className="boxes" ref={box5} onClick={(e) => {toggle(e, 4)}}></div>
          <div className="boxes" ref={box6} onClick={(e) => {toggle(e, 5)}}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => {toggle(e, 6)}}></div>
          <div className="boxes" ref={box8} onClick={(e) => {toggle(e, 7)}}></div>
          <div className="boxes" ref={box9} onClick={(e) => {toggle(e, 8)}}></div>
        </div>
      </div>
      <button className="reset" onClick={() => reset()}>Reset</button>
    </div>  
  )
}

export default TicTacToe

// import React, { useState } from 'react';
// import './tictactoe.css';
// import circleIcon from '../assests/circle.png';
// import crossIcon from '../assests/cross.png';

// const TicTacToe = () => {
//   const [board, setBoard] = useState(Array(9).fill(""));
//   const [isXTurn, setIsXTurn] = useState(true);
//   const [winner, setWinner] = useState(null);

//   const handleClick = (index) => {
//     if (board[index] !== "" || winner) return;
    
//     const newBoard = [...board];
//     newBoard[index] = isXTurn ? "x" : "o";
//     setBoard(newBoard);
//     setIsXTurn(!isXTurn);
//     checkWin(newBoard);
//   };

//   const checkWin = (newBoard) => {
//     const winningCombinations = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8],
//       [0, 3, 6], [1, 4, 7], [2, 5, 8],
//       [0, 4, 8], [2, 4, 6]
//     ];
    
//     for (let [a, b, c] of winningCombinations) {
//       if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
//         setWinner(newBoard[a]);
//         return;
//       }
//     }
    
//     if (!newBoard.includes("")) {
//       setWinner("draw");
//     }
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(""));
//     setIsXTurn(true);
//     setWinner(null);
//   };

//   return (
//     <div className='container'>
//       <h1 className="title">
//         {winner ? (winner === "draw" ? "It's a Draw!" : `Player ${winner === "x" ? "X" : "O"} Wins!`) : "Tic Tac Toe in React"}
//       </h1>
//       <div className="board">
//         <div className="row">
//           {[0, 1, 2].map((index) => (
//             <div key={index} className="boxes" onClick={() => handleClick(index)}>
//               {board[index] && <img src={board[index] === "x" ? crossIcon : circleIcon} alt={board[index]} />}
//             </div>
//           ))}
//         </div>
//         <div className="row">
//           {[3, 4, 5].map((index) => (
//             <div key={index} className="boxes" onClick={() => handleClick(index)}>
//               {board[index] && <img src={board[index] === "x" ? crossIcon : circleIcon} alt={board[index]} />}
//             </div>
//           ))}
//         </div>
//         <div className="row">
//           {[6, 7, 8].map((index) => (
//             <div key={index} className="boxes" onClick={() => handleClick(index)}>
//               {board[index] && <img src={board[index] === "x" ? crossIcon : circleIcon} alt={board[index]} />}
//             </div>
//           ))}
//         </div>
//       </div>
//       <button className="reset" onClick={resetGame}>Reset</button>
//     </div>
//   );
// };

// export default TicTacToe;