import style from '../styles/grid.module.css'

export const GridContainer = ({ children }) => {
  return <div className={style.container}>{children}</div>
}
