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
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RegionPassive from './RegionPassive';
import RegionActive from './RegionActive';
import DataContext from '../../contexts/DataContext';

const Region = ({ type, dispatch, rimState }) => {
  const {
    session: {
      session: { users },
      updatePoint,
      session,
    },
  } = useContext(DataContext);
  const { points, rimColor } = session.me;

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
  let longEvent;

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (rimState.region !== type && rimState.region !== 'none') {
      dispatch({ type: `deactivate${rimState.region}` });
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        dispatch({ type: `activate${type}` });
      }, 1000);
    } else if (rimState.region === 'none') {
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        // setRegion(type);
        dispatch({ type: `activate${type}` });
      }, 1000);
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    window.clearTimeout(longEvent);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    // updates the point category
    e.preventDefault();
    clearTimeout(longEvent);
    if (type === 'Focus' && _points.length > 0) {
      return;
    }

    if (rimState.region !== 'none') {
      dispatch({ type: `deactivate${rimState.region}` });
    }

    const pointId = e.dataTransfer.getData('text');

    // update the point to this area
    updatePoint(pointId, {
      region: type,
      category: undefined,
      subCategory: undefined,
    });
  }
  // End Drag Handlers

  // handles which region to show
  const isActive = rimState.region === type;

  /*
    The following logic handles when to show the points
    in order for the rim animations to look good the
    points should be hidden while resizing
  */
  const [isSmall, setIsSmall] = useState(true);
  const [timeOut, setTimeOut] = useState(null);
  useEffect(() => {
    if (rimState.region === 'none') {
      setTimeOut(
        setTimeout(() => {
          setIsSmall(false);
        }, 1000)
      );
    }
    if (rimState.region !== 'none' && rimState.region !== type) {
      clearTimeout(timeOut);
      setIsSmall(true);
    }
    // eslint-disable-next-line
  }, [rimState.region, type, pointInput]);
  // End of Is small logic

  if (type === 'Focus') {
    if (pointInput) {
      if (rimState.region !== 'Focus') dispatch({ type: 'activateFocus' });
    } else if (rimState.region === 'Focus' && !pointInput) {
      dispatch({ type: 'deactivateFocus' });
    }
    return (
      <RegionView
        background={rimColor.background}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {!isSmall && (
          <RegionPassive
            pointInput={pointInput}
            setPointInput={setPointInput}
            points={_points}
            region={type}
          />
        )}
      </RegionView>
    );
  }

  return (
    <RegionView
      background={rimColor.background}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isActive && <RegionActive region={type} dispatch={dispatch} />}
      {!isActive && !isSmall && (
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
  dispatch: PropTypes.func.isRequired,
  rimState: PropTypes.object.isRequired,
};

const RegionView = styled.div`
  width: 100%;
  height: 100%;
  transition: all 1s;
  background-color: ${props => props.background};
  text-align: center;
`;

export default Region;
