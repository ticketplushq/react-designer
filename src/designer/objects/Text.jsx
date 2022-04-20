import React, { Component } from 'react'
import { modes } from '../constants'
import Icon from '../Icon'

import { Vector } from './Vector'
import WebFont from 'webfontloader'

export class Text extends Vector {
  static meta = {
    icon: <Icon icon={'text'} size={30} />,
    initial: {
      label: 'defult text',
      text: 'Type some text...',
      rotate: 0,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAnchor: 'middle',
      fill: 'black',
      fontSize: 20,
      fontFamily: 'Open Sans',
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
    return (
      <text
        style={this.getStyle()}
        {...restOfAttributes}
        textAnchor={object.textAnchor}
        fontSize={object.fontSize}
        fontFamily={object.fontFamily}
      >
        {object.text}
      </text>
    )
  }
}
