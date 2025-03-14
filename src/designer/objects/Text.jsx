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
      preserveCase: true,
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
    const preserveCase = object?.preserveCase ?? true

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
          <LineBreak object={object} maxLength={maxLength} preserveCase={preserveCase} />
        ) : (
          <>{!preserveCase ? object.text.toUpperCase() : object.text}</>
        )}
      </text>
    );
  }
}

function LineBreak({ object, maxLength, preserveCase = true }) {
  // Almacenar el texto original para preservar mayúsculas/minúsculas
  const originalText = object?.text?.trim() || '';
  
  const hasSpace = originalText.includes(' ');
  
  // Para procesar los saltos de línea, trabajamos con el texto en el formato deseado
  const processText = !preserveCase ? originalText.toUpperCase() : originalText;
  
  let words = hasSpace
    ? processText.split(' ').filter((w) => w.length)
    : [processText];

  const lines = lineBreak(words, maxLength);
  const hasMany = lines?.length > 1;
  
  // Mapear las líneas de vuelta al texto original para preservar mayúsculas/minúsculas
  const originalLines = [];
  let currentPos = 0;
  
  // Solo necesitamos este proceso especial si queremos preservar el caso original
  if (preserveCase) {
    // Para cada línea procesada, encontramos el texto correspondiente en el original
    lines.forEach(line => {
      const lineLength = line.length;
      // Extraer la porción correspondiente del texto original
      const originalLine = originalText.substr(currentPos, lineLength);
      originalLines.push(originalLine);
      // Actualizar la posición actual en el texto original
      currentPos += lineLength + (originalText.charAt(currentPos + lineLength) === ' ' ? 1 : 0);
    });
  } else {
    // Si no preservamos el caso o usamos mayúsculas, usamos las líneas procesadas
    originalLines.push(...lines);
  }
  
  // Calcular el espaciado vertical basado en lineHeight y fontSize
  const lineSpacing = (object.lineHeight || 1) * object.fontSize;

  return (
    <>
      <tspan x={object?.x} dy="0em">
        {originalLines[0] || ''}
      </tspan>

      {hasMany &&
        originalLines.slice(1).map((line, index) => (
          <tspan key={`line-${index}`} x={object?.x} dy={`${lineSpacing}px`}>
            {line || ''}
          </tspan>
        ))}
    </>
  );
}
