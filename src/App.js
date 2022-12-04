import React from "react";
import Die from "./component/Die.js";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App (){
    const [arrayDice, setArrayDice] = React.useState(allNewDice)
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = arrayDice.every(die => die.isHeld)
        const firstValue = arrayDice[0].value
        const allSameValue = arrayDice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
        }
    }, [arrayDice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice(){
        const randomNum = []
        for(let i = 0; i < 10; i++){
            randomNum.push({
                value: Math.ceil(Math.random()* 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return randomNum
    }

    function holdDice(id){
        setArrayDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
        }))
    }

    function rollDice(){
        if(!tenzies){
            setArrayDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                die:
                generateNewDie()
            }))
        }else{
            setTenzies(false)
            setArrayDice(allNewDice())
        }
        
    }

    const diceElement = arrayDice.map(dice => (
            <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={holdDice} id={dice.id}/>
    ))
    

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElement}
            </div>
                <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game": "Roll" }</button>
        </main>
    )
}