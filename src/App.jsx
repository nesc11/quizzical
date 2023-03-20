import React from "react"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"

export default function App() {
  const [quizzes, setQuizzes] = React.useState([])



  const quizzesElements = quizzes.map(quiz => {
    return (
      <Quiz
        key={quiz.id}
        question={quiz.question}
        options={quiz.options}
      />
    )
  })

  const startGame = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=21")
      .then(res => res.json())
      .then(data => setQuizzes(
        data.results.map(quizObject => {
          return {
            id: nanoid(),
            question: quizObject.question,
            correctAnswer: quizObject.correct_answer,
            options: [quizObject.correct_answer, ...quizObject.incorrect_answers]
          }
        })
      ))
  }

  console.log(quizzes)

  return (
    quizzes.length > 0
      ?
      <React.Fragment>
        {quizzesElements}
        <button>Check answers</button>
      </React.Fragment>
      :
      <div>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button onClick={startGame}>Start quiz</button>
      </div>
  )
}