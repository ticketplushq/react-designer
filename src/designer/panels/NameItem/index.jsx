import style from './nameItem.module.css'

export const NameItem = ({ children }) => {
  return <span className={style.name}>{children}</span>
}
