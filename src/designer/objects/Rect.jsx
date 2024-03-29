import React, { Component } from 'react'
import { modes } from '../constants'
import Icon from '../Icon'
import _ from 'lodash'

import { Vector } from './Vector'

export class Rect extends Vector {
  static meta = {
    icon: <Icon icon={'rectangle'} size={30} />,
    initial: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      fill: 'blue',
      radius: 0,
      blendmode: 'normal',
      rotate: 0,
      active: true,
      label: 'default_label',
    },
  }

  render() {
    let { object, index } = this.props
    return (
      <rect
        style={this.getStyle()}
        {...this.getObjectAttributes()}
        rx={object.radius}
        width={object.width}
        height={object.height}
      />
    )
  }
}
