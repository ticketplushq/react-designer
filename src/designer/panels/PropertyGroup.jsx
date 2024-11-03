import React from 'react';
import styles from './styles/panel.module.css'

const PropertyGroup = ({showIf=true , className, ...props}) => {
  if (!showIf) {
    return <div className={styles.empty} />;
  }
  return (
    <div className={`${styles.group} react-designer-panel-group ${className || ''}`}>
      {props.children}
    </div>
  );
};

export default PropertyGroup;
