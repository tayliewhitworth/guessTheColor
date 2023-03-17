import './App.css'
import { useState, useEffect } from 'react'

export default function App() {
  const [color, setColor] = useState('')
  const [answers, setAnswers] = useState<string[]>([])

  const [message, setMessage] = useState('')
  const [clsColor, setClsColor] = useState<boolean>()

  const generateRandomHex = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const randomize = () => {
    
    const actualColor = generateRandomHex()
    setColor(actualColor)
    setAnswers([actualColor, generateRandomHex(), generateRandomHex()].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    // TODO get random color
    randomize()
  }, [])


  const handleClick = (clickedColor: string) => {
    if (clickedColor === color) {
      setMessage('Correct! Good Job!')
      setClsColor(true)
      setTimeout(() => {
        randomize()
        setMessage('')
      }, 2000)
    } else {
      setMessage('Wrong Color! Keep Guessing!')
      setClsColor(false)
    }
  }

  return (
    <main>
      <div className='grid-container'>
        <div className={clsColor ? 'message correct' : 'message wrong'}>
          {message}
        </div>
        <div
          className='guess-me'
          style={{ background: color }}
        ></div>
        <div className='color-btns'>
          {answers.map((hex, i) => (
            <button onClick={() => handleClick(hex)} key={i} className='color-btn'>{hex}</button>
          ))}
        </div>
      </div>
    </main>
  )
}