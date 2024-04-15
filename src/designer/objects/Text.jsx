import React, { Component } from 'react'
import { modes } from '../constants'
import Icon from '../Icon'

import { Vector } from './Vector'
import WebFont from 'webfontloader'
import { lineBreak } from '../utils/lineBreak'

export class Text extends Vector {
  static meta = {
    icon: <Icon icon={'text'} size={30} />,
    initial: {
      label: 'default_label',
      text: 'Tipo acentuación de la palabra',
      rotate: 0,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAnchor: 'middle',
      fill: 'black',
      fontSize: 20,
      fontFamily: 'Open Sans',
      isExpand: true,
      maxLength: 15,
      active: true,
      hasUppercase: false
    },
  }

  getStyle() {
    let { object } = this.props
    return {
      ...super.getStyle(),
      dominantBaseline: 'central',
      fontWeight: object.fontWeight,
      fontStyle: object.fontStyle,
      textDecoration: object.textDecoration,
      mixBlendMode: object.blendmode,
      WebkitUserSelect: 'none',
    }
  }

  getTransformMatrix({ rotate, x, y }) {
    return `rotate(${rotate} ${x} ${y})`
  }

  render() {
    let { object, index } = this.props
    

    WebFont.load({
      google: {
        families: [object.fontFamily],
      },
    })
    const { rotate, ...restOfAttributes } = this.getObjectAttributes()
    const textLength = object?.text?.trim().length
    const isExpand = object?.isExpand
    const maxLength = object?.maxLength
    const hasUppercase = object?.hasUppercase

    return (
      <text
        style={this.getStyle()}
        {...restOfAttributes}
        textAnchor={object.textAnchor}
        fontSize={object.fontSize}
        fontFamily={object.fontFamily}
        lengthAdjust={object?.lengthAdjust}
      >
        {textLength > maxLength && !isExpand ? (
          <LineBreak object={object} maxLength={maxLength} hasUppercase={hasUppercase} />
        ) : (
          <>{hasUppercase ?   object.text.toUpperCase(): object.text}</>
        )}
      </text>
    )
  }
}

function LineBreak({ object, maxLength, hasUppercase }) {
  const hasSpace = object?.text?.includes(' ')
  let words = hasSpace
    ? object.text.trim().split(' ').filter((w) => w.length)
    : [object?.text.trim()]
  
  if(hasUppercase) {
    words = words.map(w => w.toUpperCase())
  }

  const lines = lineBreak(words, maxLength)
  const hasMany = lines?.length > 1
  const firstLine = lines[0]

  return (
    <>
      <tspan x={object?.x} dy="0em">
        {firstLine}
      </tspan>

      {hasMany &&
        lines.slice(1, lines.length).map((t, index) => (
          <tspan key={t} x={object?.x} dy="1.03em">
            {t}
          </tspan>
        ))}
    </>
  )
}
