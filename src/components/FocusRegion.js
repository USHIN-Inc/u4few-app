import React from 'react';
import './FocusRegion.css';

function FocusRegion(props) {
  return (
    <div className="FocusRegion border border-dark">
      {props.children}
    </div>
  );
}

export default FocusRegion;
