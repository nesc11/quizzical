import React, { useDeferredValue } from "react";

export default function Option(props) {

    const styles = {
        backgroundColor: props.isSelected ? "blue" : "white"
    }

    return (
        <span style={styles} onClick={props.handleClick}>{props.value}</span>
    )
}