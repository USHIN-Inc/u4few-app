import React from 'react';
import './Region.css';

function Region(props) {
  return (
    <div className="Region border border-dark">
      {props.children}
    </div>
  );
}

export default Region;
