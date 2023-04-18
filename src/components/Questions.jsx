import { Question } from "./Question"
import { nanoid } from "nanoid"

import { useState, useEffect } from "react"


export const Questions = () => {
    const [questions, setQuestions] = useState(null)
    const [checkText, setCheckText] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchQuestions = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=5")
        const data = await res.json()
        setQuestions(data.results.map(questionInfo => ({
            id: nanoid(),
            question: questionInfo.question,
            correctAnswer: questionInfo.correct_answer,
            options: [...questionInfo.incorrect_answers, questionInfo.correct_answer],
            selectedOption: null
        })))
        setLoading(false)
    }
    console.log("h");

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handleCheck = () => {
        if (checkText) {
            setCheckText(null)
            setLoading(true)
            fetchQuestions()
        } else {
            const numCompleteQuestions = questions.filter(question => question.selectedOption).length
            if (numCompleteQuestions < questions.length) return
            else {
                const numCorrectAnswers = questions.filter(question => question.correctAnswer === question.selectedOption).length
                setCheckText(`You scored ${numCorrectAnswers}/${questions.length} correct answers`)
            }
        }
    }

    if (loading) {
        return (
            <h2 className="loading-text">Loading...</h2>
        )
    }

    return (
        <div className="questions-container">
            {questions.map(item => {
                return (
                    <Question
                        optionsArr={item.options}
                        key={item.id}
                        question={item.question}
                        setQuestions={setQuestions}
                        idQuestion={item.id}
                        correctAnswer={item.correctAnswer}
                        checkText={checkText}
                    />
                )
            })}
            <div className="check-btn-container">
                <p className="check-text">{checkText && checkText}</p>
                <button className="btn check-btn" onClick={handleCheck}>{checkText ? "Play again" : "Check answers"}</button>
            </div>
        </div>
    )
}