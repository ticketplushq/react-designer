import React, { useState, memo } from 'react'
import _ from 'lodash'

import PropertyGroup from './PropertyGroup'
import Columns from './Columns'
import Column from './Column'

const areEqual = (prevProps, nextProps) => {
  const propsToCompare = ['width', 'height', 'x', 'y', 'rotate', 'uuid']
  return propsToCompare.every(prop => 
    prevProps.object?.[prop] === nextProps.object?.[prop]
  )
}

const SizePanelBase = ({ object, onChange }) => {
  const [localValues, setLocalValues] = useState({
    width: object.width || '',
    height: object.height || '',
    x: object.x || '',
    y: object.y || '',
    rotate: object.rotate || '',
  })

  const handleChange = (prop, value) => {
    setLocalValues(prev => ({...prev, [prop]: value}))
    
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      onChange(prop, numValue)
    }
  }

  // El useEffect se puede eliminar ya que:
  // 1. El estado inicial ya tiene los valores correctos
  // 2. El memo evitará re-renders innecesarios
  // 3. Cuando las props cambien, el componente se volverá a montar con los nuevos valores iniciales

  return (
    <PropertyGroup className="react-designer-size-panel" object={object}>
      {_.has(object, 'width', 'height') && (
        <Columns label="Size">
          <Column
            showIf={_.has(object, 'width')}
            label="width"
            value={localValues.width}
            inputProps={{ type: 'number' }}
            onChange={(value) => handleChange('width', value)}
          />
          <Column
            showIf={_.has(object, 'height')}
            label="height"
            value={localValues.height}
            inputProps={{ type: 'number' }}
            onChange={(value) => handleChange('height', value)}
          />
        </Columns>
      )}
      <Columns label="Position">
        <Column
          showIf={_.has(object, 'x')}
          label="left"
          value={localValues.x}
          inputProps={{ type: 'number' }}
          onChange={(value) => handleChange('x', value)}
        />
        <Column
          showIf={_.has(object, 'y')}
          label="top"
          value={localValues.y}
          inputProps={{ type: 'number' }}
          onChange={(value) => handleChange('y', value)}
        />
      </Columns>
      {_.has(object, 'rotate') && (
        <Columns label="Rotation">
          <Column
            label="angle"
            value={localValues.rotate}
            inputProps={{ type: 'number' }}
            onChange={(value) => handleChange('rotate', value)}
          />
        </Columns>
      )}
    </PropertyGroup>
  )
}

export const SizePanel = memo(SizePanelBase, areEqual)
