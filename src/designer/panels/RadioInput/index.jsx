import style from '../styles/check.module.css'

export const RadioInput = ({
  name,
  value,
  defaultValue,
  onChange,
  icon,
  label,
}) => {
  const handleChange = (event) => {
    const { value, name } = event.target
    onChange({ name, value })
  }

  const checked = value === defaultValue

  return (
    <label className={style.container}>
      <input
        className={icon ? style.check : ''}
        name={name}
        type="radio"
        value={value}
        defaultChecked={checked}
        onChange={handleChange}
      />
      {icon && icon}
      {label && <span>{label}</span>}
    </label>
  )
}
