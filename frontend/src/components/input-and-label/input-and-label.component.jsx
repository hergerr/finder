import React from 'react';
import './input-and-label.styles.css';


export const InputAndLabel = (props) => (
    <div className="InputAndLabel-container">
        <div className="InputAndLabel-label">{props.label}</div>
        <input className="InputAndLabel-input" id={props.id}  onChange={props.onChange} value={props.value}/>
    </div>
)