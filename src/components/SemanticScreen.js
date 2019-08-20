import React from 'react';
import Rim from './Rim'
import FocusRegion from './FocusRegion'
import './SemanticScreen.css';

function SemanticScreen() {
  return (
    <div className="SemanticScreen border border-dark">
      <Rim>
        <FocusRegion>
          Focus
        </FocusRegion>
      </Rim>
    </div>
  );
}

export default SemanticScreen;
