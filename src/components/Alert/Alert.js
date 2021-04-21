import React from 'react';
import './Alert.css';

const Alert = (props) => {
  const alertIcons = {
    Error: <i className="fas fa-exclamation-circle mr-1"></i>,
    Success: <i className="fas fa-check-circle mr-1"></i>,
    Warning: <i className="fas fa-exclamation-triangle mr-1"></i>,
    Info: <i className="fas fa-info-circle mr-1 text-b"></i>,
  };

  const classList = ['Alert', props.type].join(' ');
  return (
    <p className={classList}>
      {alertIcons[props.type]}
      {props.message}
      <span className="Reason">{props.reason}</span>
    </p>
  );
};

export default Alert;
