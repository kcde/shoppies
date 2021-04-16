import React from 'react';
import './Alert.css';

const Alert = (props) => {
  const alertIcons = {
    Error: <i className="fas fa-exclamation-circle mr-1"></i>,
    Success: <i class="fas fa-check-circle mr-1"></i>,
    Warning: <i class="fas fa-exclamation-triangle mr-1"></i>,
    Info: <i class="fas fa-info-circle mr-1 text-b"></i>,
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
