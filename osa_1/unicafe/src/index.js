import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({otsikko}) => <div><h1>{otsikko}</h1></div>
/* const Data = ({text, value}) => <div>{text} {value}</div>
const Total = ({text, total}) => <div>{text} {total}</div>
const Average = ({text, average}) => <div>{text} {average}</div>
const Positive = ({text, positive}) => <div>{text} {positive} {'%'}</div> */

const Statistics = ({stats}) => {
    const [good, neutral, bad, average] = stats
    const total = good + neutral + bad
    
    if (total === 0) {
        return (
            <div>
                Ei yhtään palautetta annettu
            </div>
          )
    }
    
    return (
/*         <div>
            <Data text = 'Hyvä ' value = {good}/>
            <Data text = 'Neutraali ' value = {neutral}/>
            <Data text = 'Huono ' value = {bad}/>
            <Total text = 'Yhteensä ' total = {total}/>
            <Average text = 'Keskiarvo ' average = {average / total}/>
            <Positive text = 'Positiivisia' positive = {((good / total) * 100).toFixed(0)}/>
        </div> */

        <table>
            <tbody>
                <tr>
                    <td>Hyvä</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>Neutraali</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>Huono</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>Yhteensä</td>
                    <td>{total}</td>
                </tr>
                <tr>
                    <td>Keskiarvo</td>
                    <td>{average / total}</td>
                </tr>
                <tr>
                    <td>Positiivisia</td>
                    <td>{((good / total) * 100).toFixed(0)} %</td>
                </tr>
            </tbody>
        </table>


    )   
}

const Button = ({handleClick, text}) => {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const App = () => {
    const otsikko1 = 'Anna palautetta'
    const otsikko2 = 'Statistiikka'

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [average, setAverage] = useState(0)
    const stats = [good, neutral, bad, average]

    const HandleGoodClick = () => {
        setGood(good + 1)
        setAverage(average + 1)
    }

    const HandleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAverage(average + 0)
    }

    const HandleBadClick = () => {
        setBad(bad + 1)
        setAverage(average - 1)
    }

    return (
        <div>
            <Header otsikko = {otsikko1}/>
            <Button handleClick = {HandleGoodClick} text = 'hyvä'/>
            <Button handleClick = {HandleNeutralClick} text = 'neutraali'/>
            <Button handleClick = {HandleBadClick} text = 'huono'/>
            
            <Header otsikko = {otsikko2}/>
            <Statistics stats = {stats} />

{/*             <Header otsikko = {otsikko2}/>
            <Statistics text = 'Hyvä ' value = {good}/>
            <Statistics text = 'Neutraali ' value = {neutral}/>
            <Statistics text = 'Huono ' value = {bad}/>
            <Total text = 'Yhteensä ' total = {total}/>
            <Average text = 'Keskiarvo ' average = {average}/>
            <Positive text = 'Positiivisia' positive = {((good / total) * 100).toFixed(0)}/>
 */}
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)