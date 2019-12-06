/*
  This component will handle showing the small region
  and will show only the small points stuff
*/
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { singularize } from 'inflected';
import renderPoints from './renderPoints';
import SessionContext from '../../contexts/SessionContext';
import PointInput from '../PointInput';

const RegionPassive = ({ points, region, pointInput, setPointInput }) => {
  const { session, setSession } = useContext(SessionContext);

  // const [pointInput, setPointInput] = useState(null);

  // Starts the Focus region with a pointInput
  if (!pointInput && points.length === 0 && region === 'Focus') {
    setPointInput({
      id: uuidv4(),
      uid: session.uid,
      placeholderContent: 'Tap, type, or paste anywhere...',
      category: singularize(region).toLowerCase(),
    });
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // prevents Focus area from having more that one point
    if (region === 'Focus') {
      return;
    }
    setPointInput({
      id: uuidv4(),
      uid: session.uid,
      placeholderContent: `new ${singularize(region).toLowerCase()}`,
      category: singularize(region).toLowerCase(),
    });
  }

  /*
    this function saves the point to this region
    useState hook
   */
  function handlePointInputSubmit(e) {
    const { id, content, uid } = e;
    if (content === '') {
      setPointInput(null);
      return;
    }
    setSession({
      ...session,
      points: [
        ...session.points,
        {
          id,
          uid,
          content,
          category: singularize(region).toLowerCase(),
        },
      ],
    });
    setPointInput(null);
  }

  /*
    there is a requirement so save on blur
    that is currently not the case here
  */
  function handlePointInputBlur(e) {
    e.preventDefault();
    e.stopPropagation();
    const content = e.target.value;

    if (content === '') {
      setPointInput(null);
    }
  }

  function handlePointInputCancel(e) {
    e.stopPropagation();
    setPointInput(null);
  }

  return (
    <RegionPassiveView onClick={handleClick}>
      {renderPoints(points)}
      {pointInput && (
        <PointInput
          id={pointInput.id}
          uid={pointInput.uid}
          placeholderContent={pointInput.placeholderContent}
          onPointInputBlur={handlePointInputBlur}
          handleCancel={handlePointInputCancel}
          onPointInputSubmit={handlePointInputSubmit}
        />
      )}
    </RegionPassiveView>
  );
};

RegionPassive.defaultProps = {
  pointInput: null,
};

RegionPassive.propTypes = {
  points: PropTypes.array.isRequired,
  region: PropTypes.string.isRequired,
  pointInput: PropTypes.object,
  setPointInput: PropTypes.func.isRequired,
};

const RegionPassiveView = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export default RegionPassive;
