import { memo } from "react"

export const HeroBox = memo(({position}) => (
  <div className={`hero-box ${position}`}></div>
))