import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { singularize } from 'inflected';
import Point from './Point';
import PointInput from './PointInput';
import SessionContext from '../contexts/SessionContext';

const Region = ({ type }) => {
  const { session, setSession } = useContext(SessionContext);

  const [hover, setHover] = useState(false);

  const { points } = session;

  const _points = points.filter(
    point => point.category === singularize(type).toLocaleLowerCase()
  );

  const [pointInput, setPointInput] = useState(null);

  // Starts the Focus region with a pointInput
  if (!pointInput && _points.length === 0 && type === 'Focus') {
    setPointInput({
      id: uuidv4(),
      placeholderContent: 'Tap, type, or paste anywhere...',
    });
  }

  /*
    handles the creation of the PointInput for a new
    Point in a Region
  */
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // prevents Focus area from having more that one point
    if (type === 'Focus') {
      return;
    }
    setPointInput({
      id: uuidv4(),
      placeholderContent: `new ${singularize(type).toLowerCase()}`,
    });
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setHover(true);
    console.log(type, 'handleDragEnter');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setHover(false);
    console.log(type, 'handleDragLeave');
  }

  // this method is required to implement the
  // drag drop zone
  function handleDragOver(e) {
    e.preventDefault();
  }

  // this function updates the point
  // category to the current region type
  function handleDrop(e) {
    e.preventDefault();
    setHover(false);
    e.target.classList.remove('bg-light');
    console.log(type, 'handleDrop');

    const pointId = e.dataTransfer.getData('text');

    if (type === 'Focus' && _points.length > 0) {
      return;
    }

    // update the point to this area
    const newPoints = points.map(point => {
      if (point.id === pointId) {
        return { ...point, category: `${singularize(type).toLowerCase()}` };
      }
      return point;
    });
    setSession({
      ...session,
      points: newPoints,
    });
  }

  /*
    this function saves the point to this region
    useState hook
   */
  function handlePointInputSubmit(e) {
    const { id, content } = e;
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
          content,
          category: singularize(type).toLowerCase(),
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

  const displayedPoints = _points.map(point => (
    <Point
      key={point.id}
      id={point.id}
      content={point.content}
      category={point.category}
    />
  ));

  return (
    <RegionView
      className={`border ${type}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <RegionInnerView type={type} hover={hover}>
        {displayedPoints}
        {pointInput && (
          <PointInput
            id={pointInput.id}
            placeholderContent={pointInput.placeholderContent}
            onPointInputBlur={handlePointInputBlur}
            handleCancel={handlePointInputCancel}
            onPointInputSubmit={handlePointInputSubmit}
          />
        )}
      </RegionInnerView>
    </RegionView>
  );
};

Region.propTypes = {
  type: PropTypes.string.isRequired,
};

const RegionView = styled.div`
  text-align: center;
  &:focus {
    min-height: 4rem;
  }
`;

const RegionInnerView = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  ${({ hover, type }) =>
    hover &&
    `
    &:before {
      position: absolute;
      diplay: flex;
      flex-grow: 1;
      height: 100%;
      width: 100%;
      top: 0;
      font-size: 24px;
      color: #4D4D4D;
      font-weight: bold;
      background: #F5F5F5;
      content: '${type}'
    }
  `}
`;

export default Region;
