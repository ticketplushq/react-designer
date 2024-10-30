import React, {Component} from 'react';
import _ from 'lodash';
import { Portal } from 'react-portal';

import Icon from '../Icon';

import styles from './styles';
import PropertyGroup from './PropertyGroup';
import Button from './Button';
import SwitchState from './SwitchState';
import Columns from './Columns';
import Column from './Column';
import styleCss from './styles/panel.module.css'
import { NameItem } from './NameItem';
import { RowFlex } from './RowFlex';

class PanelList extends Component {
  render() {
    let {object, objectComponent, id, showPanels, show = false} = this.props;

    return (
      <div 
        style={{
          ...styles.propertyPanel, 
          display: showPanels || show ? 'block' : 'none'
        }} 
        className={styleCss.container}
      >
        {showPanels && objectComponent.panels.map((Panel, i) => <Panel key={i} id={id} {...this.props} />)}
        {show && !showPanels && (
            <PropertyGroup showIf>
              <RowFlex>
                <NameItem>Tools Panel</NameItem>
              </RowFlex>
              <span style={{marginTop: '5px', fontSize: '1rem'}}>Select element</span>
            </PropertyGroup>
          )
        }
      </div>
    );
  }
};

export default PanelList;
