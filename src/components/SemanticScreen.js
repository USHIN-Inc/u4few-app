import React, { useState } from 'react';
import Rim from './Rim';
import SummaryRim from './SummaryRim';
import DragContext from '../contexts/DragContext';

const SemanticScreen = () => {
  const [dragPoint, setDragPoint] = useState(null);
  const [region, setRegion] = useState('');
  return (
    <DragContext.Provider
      value={{
        dragPoint,
        setDragPoint,
        region,
        setRegion,
      }}
    >
      <SummaryRim>
        <Rim />
      </SummaryRim>
    </DragContext.Provider>
  );
};

export default SemanticScreen;
