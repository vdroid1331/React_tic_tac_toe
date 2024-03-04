import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import isWinner from "../../util/checkWinner";



export default function Grid({ numberOfCards }) {
    const [turn, setTurn] = useState(true); // false -> X, true -> 0
    const [board, setBoard] = useState(Array(numberOfCards).fill(''));
    const [winner, setWinner] = useState(null)

    function play(index) {
        console.log("Move played!");
        if (turn == true) {
            board[index] = "O";
        } else {
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X")
        if (win) {
            setWinner(win);
            toast.success(`Congratulations ${win} won the game !!`)
        }
        setBoard([...board])
        setTurn(!turn);
    }
    function reset() {
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true)
    }

    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is {winner}</h1>
                    <button className="reset" onClick={reset}>Click</button>
                    <ToastContainer position="top-center" />
                </>
            )}
            <h1 className="turn-highlight">Current turn: {(turn) ? 'O': 'X'}</h1>
            <div className="grid">
                {board.map((value, idx) => {
                    return <Card gameEnded={winner ?true : false} onPlay={play} player={value} key={idx} index={idx} />
                })}
            </div>
        </div>
    )
}