import React from 'react';

import styles from './styles/panel.module.css'

const Column = ({showIf=true, ...props}) => {
  if (!showIf) {
    return <div style={styles.empty} />;
  }

  return (
    <div className={styles.column} style={{ ...props.style}}>
      {props.children ||
        <input 
          className={`${styles.input} ${styles.textInput}`}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)} 
        />
      }
      {props.label &&
        <div className={styles.inputHelper}>{props.label}</div>}
    </div>
  );
};

export default Column;
