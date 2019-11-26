import React from 'react';
import Rim from './Rim';
import SummaryRim from './SummaryRim';
import Region from './Region';

const SemanticScreen = () => (
  <SummaryRim>
    <Rim>
      <Region type="Focus" />
    </Rim>
  </SummaryRim>
);

export default SemanticScreen;
