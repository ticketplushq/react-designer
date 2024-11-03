import style from '../styles/check.module.css'

export const RadioInput = ({
  name,
  value,
  defaultValue,
  onChange,
  label,
}) => {
  const handleChange = (event) => {
    const { value, name } = event.target
    onChange({ name, value })
  }

  const checked = value === defaultValue

  return (
    <label className={`${style.container} react-designer-radio-label`}>
      <input
        className='react-designer-radio-input'
        name={name}
        type="radio"
        value={value}
        defaultChecked={checked}
        onChange={handleChange}
      />
      {label && <span className='react-designer-radio-span'>{label}</span>}
    </label>
  )
}
