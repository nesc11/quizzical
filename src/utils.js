import { nanoid } from "nanoid"


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }
  

export const generateOptions = (optionsArr) => {
    const options = shuffleArray(optionsArr)

    return options.map(option => ({
        id: nanoid(),
        option: option,
        isSelected: false
    }))
}