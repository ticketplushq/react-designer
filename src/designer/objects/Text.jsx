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
      mixBlendMode: object.blendMode,
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
          <LineBreak object={object} maxLength={maxLength} />
        ) : (
          object.text
        )}
      </text>
    )
  }
}

function LineBreak({ object, maxLength }) {
  const hasSpace = object?.text?.includes(' ')
  const words = hasSpace
    ? object.text
        .trim()
        .split(' ')
        .filter((w) => w.length)
    : [object?.text.trim()]
  const lines = lineBreak(words, maxLength)

  return (
    <>
      {lines.map((t) => (
        <tspan key={t} x={object?.x} dy="1.03em">
          {t}
        </tspan>
      ))}
    </>
  )
}
