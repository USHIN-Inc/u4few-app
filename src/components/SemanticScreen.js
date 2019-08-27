import React from 'react';
import Rim from './Rim'
import FocusRegion from './FocusRegion'
import './SemanticScreen.css';

function SemanticScreen(props) {
  const username = props.user.username;
  const focusNode = props.user.nodes.find(
    n => n.title === props.focus
  );
  const nodes = props.user.nodes.filter(n =>
    ( n.parent_id === focusNode.id ) ||
    ( n.id === focusNode.parent_id )
  )
  return (
    <div className="SemanticScreen border">
      <Rim label="someone" nodes={[]}>
	<Rim label={username} nodes={nodes}>
          <FocusRegion node={focusNode} />
	</Rim>
      </Rim>
    </div>
  );
}

export default SemanticScreen;
