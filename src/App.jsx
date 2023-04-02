import { useState } from 'react'
import { Designer, Rect, Text, Image } from './designer'
import './App.css'

function App() {
  const [state, setState] = useState([])

  const handleActive = (index, checked) => {
    setState((state) => {
      const newState = [...state]
      const element = newState[index]
      newState[index] = { ...element, active: checked }
      return newState
    })
  }

  const handleUpdate = (updateState, action) => {
    const isEmpetyState = state?.length === 0

    if (isEmpetyState || action?.remove || action?.arrange)
      return setState([...updateState])

    const newState = [...state]
    updateState.forEach((element) => {
      const currentIndex = state.findIndex((e) => e?.uuid === element?.uuid)
      if (currentIndex !== -1) {
        newState[currentIndex] = { ...element }
      } else {
        newState.push({ ...element })
      }
    })
    setState(newState)
  }

  const actives = state.filter((element) => element?.active)

  return (
    <div>
      <div>
        <Designer
          width={600}
          height={400}
          objectTypes={{
            text: Text,
            rect: Rect,
            image: Image,
          }}
          onUpdate={handleUpdate}
          objects={actives}
        />
      </div>
      <ul style={{ padding: '30px' }}>
        {state?.map((element, index) => (
          <li key={element?.uuid}>
            {element?.label}-{element?.uuid}
            <input
              type="checkbox"
              checked={element?.active}
              onChange={(e) => handleActive(index, e.target.checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
