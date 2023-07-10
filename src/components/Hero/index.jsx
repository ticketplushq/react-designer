import { memo } from 'react'
import {HeroBox} from './HeroBox'

import './style.css'

export const Hero = memo(({title}) =>{

  return (
    <header className='visual'>
      <div>
        <span className='hero-title-text'>{title}</span>
        <span className="hero-title-text dot">.</span>
      </div>
      <HeroBox position='bottom-right'/>
      <HeroBox position='bottom-left'/>
      <HeroBox position='top-right'/>
      <HeroBox position='top-left'/>
    </header>
  )
})