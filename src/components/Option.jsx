import React, { useDeferredValue } from "react";

export default function Option(props) {

    const setColor = () => {
        let color = props.isSelected ? "#D6DBF5" : "white"
        if (props.ready) {
            color = props.isSelected
                ? (props.correctAnswer === props.value ? "#94D7A2" : "#F8BCBC")
                : "white"
        }
        return color
    }

    const styles = {
        backgroundColor: setColor()
    }

    return (
        <span className="option-container" style={styles} onClick={props.handleClick}>{props.value}</span>
    )
}