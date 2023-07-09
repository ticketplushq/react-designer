import React, { Component } from 'react'
import { modes } from '../constants'
import Icon from '../Icon'
import _ from 'lodash'

import { Vector } from './Vector'
import BezierEditor from '../editors/BezierEditor'

export class Path extends Vector {
  static meta = {
    initial: {
      fill: '#e3e3e3',
      closed: false,
      rotate: 0,
      movex: 0,
      movey: 0,
      path: [],
      stroke: 'gray',
      strokeWidth: 1,
      active: true,
      label: 'default_label',
    },
    mode: modes.DRAW_PATH,
    icon: <Icon icon={'polygon'} size={30} />,
    editor: BezierEditor,
  }

  buildPath(object) {
    let { path } = object

    let curves = path.map(
      ({ x1, y1, x2, y2, x, y }, i) => `C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`
    )

    let instructions = [`M ${object.movex} ${object.movey}`, ...curves]

    if (object.closed) {
      instructions = [...instructions, 'Z']
    }

    return instructions.join('\n')
  }

  getTransformMatrix({ rotate, x, y, movex, movey }) {
    return `
      translate(${x - movex} ${y - movey})
      rotate(${rotate} ${x} ${y})
    `
  }

  render() {
    let { object } = this.props
    let fill = object.closed ? object.fill : 'transparent'
    return (
      <path
        style={this.getStyle(object)}
        {...this.getObjectAttributes()}
        d={this.buildPath(object)}
        fill={fill}
      />
    )
  }
}
