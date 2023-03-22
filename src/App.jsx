import React from "react"
import Question from "./components/Question"
import { nanoid } from "nanoid"

export default function App() {
  const [questions, setQuestions] = React.useState([])


  const questionElements = questions.map(question => {
    return (
      <Question
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

  console.log(questions)

  return (
    questions.length > 0
      ?
      <React.Fragment>
        {questionElements}
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