import Dropzone from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { Designer, Rect, Text, Image, Circle, Path, getImageDimensions, resizeDimensions } from './designer'
import  { ticket } from './example/ticket'

import './App.css'
import { Hero } from './components/Hero'
import { ticketImage } from './example/ticketBackground'


function App() {
  const [backgroundImage, setBackgroundImage] = useState(ticketImage.image)
  const [imageDimensions, setImageDimensions] = useState({ width: 400, height: 400 })
  const [state, setState] = useState(structuredClone(ticket))

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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length == 0) {
      return
    }
    const file = acceptedFiles[0]
    const fr = new FileReader()

    fr.onload = (e) => {
      setBackgroundImage(e.target.result)
    }

    fr.readAsDataURL(file)
  }, [])

  const actives = state.filter((element) => element?.active)

  useEffect(() => {
    if(backgroundImage) {
      getImageDimensions(backgroundImage)
        .then(dimensions => {
            const { width, height } = resizeDimensions(dimensions.width, dimensions.height)
            setImageDimensions({ width, height })
        })
        .catch(error => {
            console.error('Error al cargar la imagen:', error);
        });
    }
  },[backgroundImage])

  return (
    <main className='container'>
      <Hero title="React Designer"/>
      <div className='designer-container'>
        <Designer
          showPanel
          width={imageDimensions.width}
          height={imageDimensions.height}
          objectTypes={{
            text: Text,
            rect: Rect,
            circle: Circle,
            polygon: Path,
            image: Image,
          }}
          onUpdate={handleUpdate}
          objects={actives}
          backgroundSize="contain"
          backgroundImage={backgroundImage ? `url(${backgroundImage})`: null}
        />
      </div>
      <Dropzone
        accept="image/*"
        onDrop={onDrop}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p style={{ backgroundColor: 'white', padding: '5px 10px', cursor: 'pointer'}}>Background image</p>
          </div>
        )}
      </Dropzone>
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
