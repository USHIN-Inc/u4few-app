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
  const { points, users, rimColor } = session;

  const [pointInput, setPointInput] = useState(null);

  const _points = points.filter(
    point => point.region === singularize(type).toLocaleLowerCase()
  );

  users.forEach(user => {
    user.points.forEach(point => {
      if (point.region === singularize(type).toLowerCase()) {
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
          region: `${singularize(type).toLowerCase()}`,
          category: null,
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

  let classes = `${type} ${region === type ? 'active' : ''}`;
  classes += `${region !== type && region !== '' ? 'small' : ''}`;
  classes += ` ${region}-active`;
  console.log(classes);
  const isActive = region === type;
  const isSmall = region !== '' && region !== type;

  if (type === 'Focus') {
    if (pointInput && pointInput.region === 'focu') {
      setRegion('Focus');
    } else if (region === 'Focus' && !pointInput) {
      setRegion('');
    }
    return (
      <RegionView
        background={rimColor.background}
        onDrop={handleDrop}
        className={`${classes}`}
      >
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
      background={rimColor.background}
      className={classes}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isActive ? (
        <RegionActive region={type} />
      ) : (
        <RegionPassive
          pointInput={pointInput}
          setPointInput={setPointInput}
          points={_points}
          region={type}
          isSmall={isSmall}
        />
      )}
    </RegionView>
  );
};

Region.propTypes = {
  type: PropTypes.string.isRequired,
};

const RegionView = styled.div`
  width: 32vw;
  height: 31.7vh;
  transition: all 0.5s;
  /* border: 1px solid gray; */
  background-color: ${props => props.background};

  &.active {
    width: 80vw;
    height: 80vh;
  }

  &.small {
    width: 6vw;
    height: 6.8vh;
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
`;

export default Region;
