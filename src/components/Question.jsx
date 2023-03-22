import React from "react"
import { nanoid } from "nanoid"
import Option from "./Option"

export default function Question(props) {

    const [options, setOptions] = React.useState(props.options.map(option => ({
        isSelected: false,
        value: option,
        id: nanoid()
    })))
    const selectedAnswer = options.find(option => option.isSelected)
        ? options.find(option => option.isSelected).value
        : ""

    const select = (id) => {
        setOptions(prevOptions => {
            return prevOptions.map(option => {
                return option.id === id ? { ...option, isSelected: !option.isSelected } : { ...option, isSelected: false }
            })
        })
    }

    const optionElements = options.map(option => {
        return <Option
            isSelected={option.isSelected}
            handleClick={() => select(option.id)}
            key={option.id}
            value={option.value}
        />
    })

    React.useEffect(() => {
        props.setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                return question.id === props.id ?
                    { ...question, selectedAnswer: selectedAnswer } :
                    question
            })
        })
    }, [options])

    return (
        <div>
            <h3>{props.question}</h3>
            <div>{optionElements}</div>
        </div>

    )
}