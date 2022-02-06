import { useState } from 'react'
import { Designer, Rect, Text } from './designer'
import './App.css'

function App() {
  const [state, setState] = useState({
    objects: [],
  })

  return (
    <div>
      <div>
        <Designer
          width={600}
          height={400}
          objectTypes={{
            text: Text,
            rect: Rect,
          }}
          onUpdate={(objects) => setState({ objects })}
          objects={state.objects}
        />
      </div>
    </div>
  )
}

export default App
