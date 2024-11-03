import React, {Component} from 'react';
import PropertyGroup from './PropertyGroup';
import styles from './styles/panel.module.css'
import { NameItem } from './NameItem';
import { RowFlex } from './RowFlex';

class PanelList extends Component {
  render() {
    let {object, objectComponent, id, showPanels, show = false} = this.props;

    return (
      <div
        style={{
          display: showPanels || show ? 'block' : 'none'
        }} 
        className={`${styles.container} react-designer-panel-list`}
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
