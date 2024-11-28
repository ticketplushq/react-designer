import React from 'react';

import styles from './styles/panel.module.css'

const Column = ({showIf=true, inputProps = {}, ...props}) => {
  if (!showIf) {
    return <div className={styles.empty} />;
  }

  return (
    <div className={styles.column} style={{ ...props.style}}>
      {props.children ||
        <input 
          {...inputProps}
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
