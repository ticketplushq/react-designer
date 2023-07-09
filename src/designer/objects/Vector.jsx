import React, { Component } from 'react'
import { modes } from '../constants'
import Icon from '../Icon'
import _ from 'lodash'

import {
  SizePanel,
  TextPanel,
  StylePanel,
  ArrangePanel,
  ImagePanel,
} from '../panels'

export class Vector extends Component {
  static panels = [SizePanel, TextPanel, StylePanel, ImagePanel, ArrangePanel]

  getStyle() {
    let { object } = this.props
    return {
      mixBlendMode: object.blendmode,
    }
  }

  getTransformMatrix({ rotate, x, y, width, height }) {
    if (rotate) {
      let centerX = width / 2 + x
      let centerY = height / 2 + y
      return `rotate(${rotate} ${centerX} ${centerY})`
    }
  }

  getObjectAttributes() {
    let { object, onRender, ...rest } = this.props
    const { active, label, isExpand, ...restObject } = object
    return {
      ...restObject,
      transform: this.getTransformMatrix(object),
      ref: onRender,
      ...rest,
    }
  }
}
