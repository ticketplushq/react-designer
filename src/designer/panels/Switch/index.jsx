import style from '../styles/check.module.css'

export const Switch = ({
  text,
  label,
  icon,
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
    <label htmlFor={label} className={style.container}>
      <input
        className={icon ? style.check : ''}
        id={label}
        type="checkbox"
        onChange={handleCheck}
        defaultChecked={defaultChecked}
      />
      {icon && icon}
      {text && <span>{text}</span>}
    </label>
  )
}
