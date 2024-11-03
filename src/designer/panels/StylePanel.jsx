import React from 'react'
import PropertyGroup from './PropertyGroup'
import Columns from './Columns'
import Column from './Column'
import ColorInput from './ColorInput'

import styles from './styles/panel.module.css'

const modes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

export const StylePanel = (props) => {
  const object = props?.object

  return (
    <PropertyGroup className="react-designer-style-panel">
      <Columns label="Fill" showIf={object?.hasOwnProperty('fill')}>
        <Column>
          <ColorInput
            value={object.fill}
            onChange={props?.onChange?.bind?.(this, 'fill')}
          />
        </Column>
      </Columns>
      <Columns label="Stroke" showIf={object?.hasOwnProperty('stroke')}>
        <Column>
          <ColorInput
            value={object.stroke}
            onChange={props?.onChange?.bind?.(this, 'stroke')}
          />
        </Column>
        <Column label="width">
          <input
            className={`${styles.input} ${styles.integerInput}`}
            style={{ width: 30 }}
            onChange={(e) =>
              props?.onChange?.('strokeWidth', e.target.value)
            }
            value={object.strokeWidth}
          />
        </Column>
        <Column showIf={object?.hasOwnProperty('radius')} label="radius">
          <input
            className={`${styles.input} ${styles.integerInput}`}
            style={{ width: 30 }}
            onChange={(e) => props?.onChange?.('radius', e.target.value)}
            value={object.radius}
          />
        </Column>
      </Columns>
      <Columns label="Blending">
        <Column>
          <select
            className={`${styles.select} react-designer-select`}
            value={object.blendmode}
            onChange={(e) => props?.onChange?.('blendmode', e.target.value)}
          >
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </Column>
      </Columns>
    </PropertyGroup>
  )
 
}
