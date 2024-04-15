import { useState } from 'react'
import { Designer, Rect, Text, Image, Circle, Path } from './designer'
import  { malevich } from './example/malevich'

import './App.css'
import { Hero } from './components/Hero'


function App() {
  const [state, setState] = useState(structuredClone(malevich))

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
    <main className='container'>
      <Hero title="React Designer"/>
      <div className='designer-container'>
        <Designer
          width={400}
          height={400}
          objectTypes={{
            text: Text,
            rect: Rect,
            circle: Circle,
            polygon: Path,
            image: Image,
          }}
          onUpdate={handleUpdate}
          objects={actives}
        />
      </div>
      <ul className='list-elements'>
        {state?.map((element, index) => (
          <li className='list-elements__item' key={element?.uuid}>
            <span>{element?.label}</span>
            <input
              type="checkbox"
              checked={element?.active}
              onChange={(e) => handleActive(index, e.target.checked)}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
