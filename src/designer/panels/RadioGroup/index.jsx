import React from 'react'
import style from './radioGroup.module.css'

export const RadioGroup = ({ name, defaultValue, onChange, children }) => {
  return (
    <div className={style.group}>
      {React.Children.toArray(children).map((child) => {
        return React.cloneElement(child, { name, defaultValue, onChange })
      })}
    </div>
  )
}
