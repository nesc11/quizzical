import { generateOptions } from "../utils"
import { Option } from "./Option"

import { useState, useEffect } from "react"

export const Question = ({ question, optionsArr, setQuestions, idQuestion, correctAnswer, checkText }) => {
    const [options, setOptions] = useState(generateOptions(optionsArr))

    const handleClick = (id) => {
        setOptions(prevOptions => {
            return prevOptions.map(item => {
                return item.id === id ? {...item, isSelected: !item.isSelected} : {...item, isSelected: false}
            })
        })
    }

    const optionElements = options.map(item => {
        return (
            <Option
                correctAnswer={correctAnswer}
                checkText={checkText}
                key={item.id}
                option={item.option}
                isSelected={item.isSelected}
                handleClick={() => handleClick(item.id)}
            />
        )
    })


    useEffect(() => {
        setQuestions(prevQuestions => {
            const selectedOption = options.find(option => option.isSelected) ? options.find(option => option.isSelected).option : null
            return prevQuestions.map(question => {
                return question.id === idQuestion ? {...question, selectedOption: selectedOption} : question
            })
        })
    }, [options])

    return (
        <div className="question-container">
            <h3 className="question-title">{question}</h3>
            <div className="options-container">
                {optionElements}
            </div>
        </div>
    )
}