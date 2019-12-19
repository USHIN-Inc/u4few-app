/*
  Copyright (C) 2019 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SessionContext from '../../contexts/SessionContext';
import RegionPassive from './RegionPassive';
import RegionActive from './RegionActive';
import DragContext from '../../contexts/DragContext';

const Region = ({ type }) => {
  const { session, setSession } = useContext(SessionContext);
  const { region, setRegion } = useContext(DragContext);
  const { points, users, rimColor } = session;

  const [pointInput, setPointInput] = useState(null);

  const _points = points.filter(point => point.region === type);

  users.forEach(user => {
    user.points.forEach(point => {
      if (point.region === type) {
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
          region: type,
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
    if (pointInput && pointInput.region === 'Focus') {
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
  width: 30.5vw;
  height: 30.5vh;
  transition: all 0.5s;
  background-color: ${props => props.background};

  &.active {
    width: 83vw;
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
