import style from '../styles/check.module.css'

export const Switch = ({
  text,
  label,
  defaultValue,
  nextValue,
  onChange,
  defaultChecked,
}) => {
  const handleCheck = (event) => {
    const { checked } = event.target
    const newState = checked ? nextValue : defaultValue
    onChange(newState, checked)
  }

  return (
    <label htmlFor={label} className={`${style.container} react-designer-switch-label`}>
      <input
        className='react-designer-switch-input'
        id={label}
        type="checkbox"
        onChange={handleCheck}
        defaultChecked={defaultChecked}
      />
      {text && <span>{text}</span>}
    </label>
  )
}
