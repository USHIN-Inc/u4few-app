import React from 'react';
import './Node.css';

function Node(props) {
  const title = props.title.substring(0,5).trim() + '...';

  return (
    <div className="Node rounded bg-primary">
      <div>{title}</div>
    </div>
  );
}

export default Node;
