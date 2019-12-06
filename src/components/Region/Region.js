import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { singularize } from 'inflected';
import SessionContext from '../../contexts/SessionContext';
import RegionPassive from './RegionPassive';
import RegionActive from './RegionActive';
import DragContext from '../../contexts/DragContext';

const Region = ({ type }) => {
  const { session, setSession } = useContext(SessionContext);
  const { region, setRegion } = useContext(DragContext);
  const { points, users } = session;

  const [pointInput, setPointInput] = useState(null);

  const _points = points.filter(
    point => point.category === singularize(type).toLocaleLowerCase()
  );

  users.forEach(user => {
    user.points.forEach(point => {
      if (point.category === singularize(type).toLowerCase()) {
        _points.push({ ...point, username: user.username });
      }
    });
  });

  /*
    ##### Drag Handlers #####
  */
  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setRegion(type);
  }

  function handleDragLeave(e) {
    e.preventDefault();
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
    e.target.classList.remove('bg-light');

    // TODO: update this to use DragContext
    const pointId = e.dataTransfer.getData('text');

    if (type === 'Focus' && _points.length > 0) {
      return;
    }

    // update the point to this area
    const newPoints = points.map(point => {
      if (point.id === pointId) {
        return {
          ...point,
          category: `${singularize(type).toLowerCase()}`,
          subCategory: null,
        };
      }
      return point;
    });
    setSession({
      ...session,
      points: newPoints,
    });
  }

  const classes = `${type} ${region === type ? 'active' : ''}
    ${region !== type && region !== '' ? 'small' : ''}`;

  const isActive = region === type;

  if (type === 'Focus') {
    if (pointInput && pointInput.category === 'focus') {
      setRegion('Focus');
    } else if (region === 'Focus' && !pointInput) {
      setRegion('');
    }
    return (
      <RegionView onDrop={handleDrop} className={`${classes}`}>
        <RegionPassive
          pointInput={pointInput}
          setPointInput={setPointInput}
          points={_points}
          region={type}
        />
      </RegionView>
    );
  }

  return (
    <RegionView
      className={classes}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isActive && <RegionActive region={type} />}
      {!isActive && (
        <RegionPassive
          pointInput={pointInput}
          setPointInput={setPointInput}
          points={_points}
          region={type}
        />
      )}
    </RegionView>
  );
};

Region.propTypes = {
  type: PropTypes.string.isRequired,
};

const RegionView = styled.div`
  width: 30vw;
  height: 30vh;
  transition: all 0.5s;
  border-radius: 4px;
  border: 1px solid gray;
  &.active {
    width: 45vw;
    height: 45vh;
  }
  &.small {
    width: 16vw;
    height: 16vh;
  }
  &.Facts {
    grid-area: facts;
  }
  &.Merits {
    grid-area: merits;
  }
  &.People {
    grid-area: people;
  }
  &.Thoughts {
    grid-area: thoughts;
  }
  &.Actions {
    grid-area: actions;
  }
  &.Feelings {
    grid-area: feelings;
  }
  &.Needs {
    grid-area: needs;
  }
  &.Topics {
    grid-area: topics;
  }
  text-align: center;
  &:focus {
    min-height: 4rem;
  }
`;

export default Region;
