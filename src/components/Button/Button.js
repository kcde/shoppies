import React from 'react';

const Button = (props) => {
  return (
    <button className="btn" disabled={props.disable ? true : null} onClick={() => props.clicked()}>
      {props.children}
    </button>
  );
};

export default Button;
