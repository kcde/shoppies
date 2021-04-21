import React from 'react';
const Poster = (props) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
      <img src={props.src} alt={props.alt} className="w-full" />
    </div>
  );
};

export default Poster;
