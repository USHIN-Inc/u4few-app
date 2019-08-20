import React from 'react';
import Region from './Region'
import './Rim.scss';

function Rim(props) {
  return (
    <div className="Rim">
      <Region type="Facts" />
      <Region type="Merits" />
      <Region type="People" />
      <Region type="Thoughts" />
      {props.children}
      <Region type="Actions" />
      <Region type="Needs" />
      <Region type="Feelings" />
      <Region type="Topics" />
    </div>
  );
}

export default Rim;
