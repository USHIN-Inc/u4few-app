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
import DataContext from '../../context/DataContext';
import UiContext from '../../context/UiContext';

const Region = ({ type }) => {
  const {
    semscreen: {
      points,
      updatePoint,
      settings: { backgroundColor },
    },
  } = useContext(DataContext);
  const {
    rim: {
      state: { region, cloud },
      activateRegion,
      deactivateRegion,
    },
  } = useContext(UiContext);

  const _points = points.filter(point => point.region === type);

  /*
    ##### Drag Handlers #####
  */
  let longEvent;

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'Focus') {
      return;
    }
    if (region !== type && region !== 'none') {
      deactivateRegion(region);
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        activateRegion(type, true);
      }, 1000);
    } else if (region === 'none') {
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        // setRegion(type);
        activateRegion(type, true);
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

    if (region !== 'none') {
      deactivateRegion(region);
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

  /*
    The following logic handles when to show the points
    in order for the rim animations to look good the
    points should be hidden while resizing
  */
  const [isSmall, setIsSmall] = useState(true);
  const [timeOut, setTimeOut] = useState(null);
  useEffect(() => {
    if (region === 'none') {
      setTimeOut(
        setTimeout(() => {
          setIsSmall(false);
        }, 1000)
      );
    }
    if (region !== 'none' && region !== type) {
      clearTimeout(timeOut);
      setIsSmall(true);
    }
    // eslint-disable-next-line
  }, [region, type]);
  // End of Is small logic

  return (
    <RegionView
      background={backgroundColor}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {type !== 'Focus' && cloud && region === type && (
        <RegionActive region={type} />
      )}
      {!cloud && !isSmall && <RegionPassive points={_points} region={type} />}
    </RegionView>
  );
};

Region.propTypes = {
  type: PropTypes.string.isRequired,
};

const RegionView = styled.div`
  width: 100%;
  height: 100%;
  transition: all 1s;
  background-color: ${props => props.background};
  text-align: center;
`;

export default Region;
