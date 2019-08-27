import React from 'react';
import './FocusRegion.css';

function FocusRegion(props) {
  return (
    <div className="FocusRegion border">
      <dl className="row">
        <dt className="col-sm-3">id</dt>
        <dd className="col-sm-9">{props.node.id}</dd>
        <dt className="col-sm-3">title</dt>
        <dd className="col-sm-9">{props.node.title}</dd>
        <dt className="col-sm-3">category</dt>
        <dd className="col-sm-9">{props.node.category}</dd>
      </dl>
    </div>
  );
}

export default FocusRegion;
