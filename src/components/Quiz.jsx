import React from "react"
import { nanoid } from "nanoid"
import Option from "./Option"

export default function Quiz(props) {

    const [options, setOptions] = React.useState(props.options.map(option => ({
        isSelected: false,
        value: option,
        id: nanoid()
    })))
    // console.log(options)
    const select = (id) => {
        setOptions(prevOptions => {
            return prevOptions.map(option => {
                return option.id === id ? {...option, isSelected: !option.isSelected} : {...option, isSelected: false}
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

    return (
        <div>
            <h3>{props.question}</h3>
            <div>{optionElements}</div>
        </div>

    )
}