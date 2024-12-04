import React from 'react'
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
      hasUppercase: false,
      writingMode: 'horizontal-tb',
      textOrientation: 'mixed', 
      letterSpacing: 0,
      lineHeight: 1, // Añadir lineHeight inicial
    },
  }

  getStyle() {
    let { object } = this.props;
    return {
      ...super.getStyle(),
      dominantBaseline: 'central',
      fontWeight: object.fontWeight,
      fontStyle: object.fontStyle,
      textDecoration: object.textDecoration,
      mixBlendMode: object.blendmode,
      WebkitUserSelect: 'none',
      writingMode: object.writingMode, // Añadir modo de escritura
      textOrientation: object.textOrientation, // Añadir orientación de texto
      letterSpacing: `${object.letterSpacing}px`,
      lineHeight: `${object.lineHeight}px`, // Añadir lineHeight al estilo
    };
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
    const { rotate, writingMode, ...restOfAttributes } = this.getObjectAttributes()
    const textLength = object?.text?.trim().length
    const isExpand = object?.isExpand
    const maxLength = object?.maxLength
    const hasUppercase = object?.hasUppercase

    const hasLineBreak = textLength > maxLength && !isExpand

    return (
      <text
        style={this.getStyle()}
        {...restOfAttributes}
        writingMode={object.writingMode} // Añadir modo de escritura
        textAnchor={object.textAnchor}
        fontSize={object.fontSize}
        fontFamily={object.fontFamily}
        lengthAdjust={object?.lengthAdjust}
      >
        {hasLineBreak? (
          <LineBreak object={object} maxLength={maxLength} hasUppercase={hasUppercase} />
        ) : (
          <>{hasUppercase ? object.text.toUpperCase() : object.text}</>
        )}
      </text>
    );
  }
}

function LineBreak({ object, maxLength, hasUppercase = false }) {
  const hasSpace = object?.text?.includes(' ')
  let words = hasSpace
    ? object.text.trim().split(' ').filter((w) => w.length)
    : [object?.text.trim()]

  const lines = lineBreak(words, maxLength)
  const hasMany = lines?.length > 1
  const firstLine = lines?.[0]
  
  // Calcular el espaciado vertical basado en lineHeight y fontSize
  const lineSpacing = (object.lineHeight || 1) * object.fontSize

  return (
    <>
      <tspan x={object?.x} dy="0em">
        {(hasUppercase && firstLine) ? firstLine.toUpperCase(): firstLine}
      </tspan>

      {hasMany &&
        lines.slice(1, lines.length).map((t, index) => (
          <tspan key={t} x={object?.x} dy={`${lineSpacing}px`}>
            {(hasUppercase && t) ? t.toUpperCase() : t}
          </tspan>
        ))}
    </>
  )
}
