export const Option = ({option, isSelected, handleClick, correctAnswer, checkText }) => {

    let styles = {
        backgroundColor: isSelected ? "#D6DBF5" : null,
        border: isSelected ? "none" : "1px solid #4D5B9E"
    }

    if (checkText && correctAnswer === option) {
        styles = {
            backgroundColor: "#94D7A2"
        }
    } else if (checkText && isSelected) {
        styles = {
            backgroundColor: "#F8BCBC",
            opacity: "0.5"
        }
    } else if (checkText) {
        styles = {
            opacity: "0.5",
            border: "1px solid #4D5B9E"
        }
    }

    return (
        <span onClick={handleClick} style={styles}>{option}</span>
    )
}