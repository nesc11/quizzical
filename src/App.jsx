import { useState } from "react"

import { Questions } from "./components/Questions"

export default function App() {

  const [started, setStarted] = useState(false)


  if (!started) {
    return (
      <div className="initial-container">
        <h1 className="app-title">Quizzical</h1>
        <p>Prove your knowledge!</p>
        <button
          className="btn"
          onClick={() => setStarted(true)}
        >Start quiz</button>
      </div>
    )
  }

  return (
    <Questions />
  )
}