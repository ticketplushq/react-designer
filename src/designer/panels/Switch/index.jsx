import style from '../styles/check.module.css'

export const Switch = ({ label, icon, defaultValue, nextValue, onChange }) => {
  const handleCheck = (event) => {
    const { checked } = event.target
    const newState = checked ? nextValue : defaultValue
    onChange(newState)
  }

  return (
    <label htmlFor={label} className={style.container}>
      <input
        className={style.check}
        id={label}
        type="checkbox"
        onChange={handleCheck}
      />
      {icon}
    </label>
  )
}
