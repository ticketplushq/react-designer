import React from 'react';
import styles from './styles/panel.module.css'

const Columns = ({showIf=true, ...props}) => {
  if (!showIf) {
    return <div className={styles.empty} />;
  }
  return (
    <div className={styles.columns}>
      <div className={styles.panelTitle}>{props.label}</div>
      {props.children}
    </div>
  )
};

export default Columns;
