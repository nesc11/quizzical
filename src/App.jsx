import React from "react"
import Question from "./components/Question"
import { nanoid } from "nanoid"

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [ready, setReady] = React.useState(false)
  const [counter, setCounter] = React.useState(0)


  const questionElements = questions.map(question => {
    return (
      <Question
        ready={ready}
        correctAnswer={question.correctAnswer}
        id={question.id}
        setQuestions={setQuestions}
        key={question.id}
        question={question.question}
        options={question.options}
      />
    )
  })

  const startGame = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=21")
      .then(res => res.json())
      .then(data => setQuestions(
        data.results.map(questionObject => {
          return {
            id: nanoid(),
            question: questionObject.question,
            correctAnswer: questionObject.correct_answer,
            options: [questionObject.correct_answer, ...questionObject.incorrect_answers],
            selectedAnswer: ""
          }
        })
      ))
  }


  const evaluate = () => {
    if (ready) {
      startGame()
      setReady(false)
      setCounter(0)
    } else {
      const finalArray = questions.filter(question => question.selectedAnswer)
      if (finalArray.length === 5) {
        const correctAnswers = questions.filter(question => question.selectedAnswer === question.correctAnswer)
        setReady(true)
        setCounter(correctAnswers.length)
      } else {
        alert("Answer all the questions!")
      }
    }
  }

  return (
    questions.length > 0
      ?
      <React.Fragment>
        {questionElements}
        <div className="score-container">
          {ready && <p className="score-text">You scored {`${counter}`}/5 correct answers</p>}
          <button className="btn" onClick={evaluate}>{ready ? "Play again" : "Check answers"}</button>
        </div>
      </React.Fragment>
      :
      <div className="initial-container">
        <h1 className="initial-title">Quizzical</h1>
        <p className="initial-description">Some description if needed</p>
        <button className="btn" onClick={startGame}>Start quiz</button>
      </div>
  )
}