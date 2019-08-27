import React from 'react';
import Region from './Region'
import './Rim.scss';

function Rim(props) {
  const nodes = props.nodes;

  return (
    <div className="Rim">
      <div className="label rounded bg-info">{props.label}</div>
      <Region type="Facts" nodes={nodes.filter(n => n.category === 'fact')} />
      <Region type="Merits" nodes={nodes.filter(n => n.category === 'merit')} />
      <Region type="People" nodes={nodes.filter(n => n.category === 'person')} />
      <Region type="Thoughts" nodes={nodes.filter(n => n.category === 'thought')} />
      {props.children}
      <Region type="Actions" nodes={nodes.filter(n => n.category === 'action')} />
      <Region type="Needs" nodes={nodes.filter(n => n.category === 'need')} />
      <Region type="Feelings" nodes={nodes.filter(n => n.category === 'feeling')} />
      <Region type="Topics" nodes={nodes.filter(n => n.category === 'topic')} />
    </div>
  );
}

export default Rim;
