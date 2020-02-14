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
/*
  This component will handle showing the small region
  and will show only the small points stuff
*/
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { singularize } from 'inflected';
import DataContext from '../../context/DataContext';
import PointInput from '../PointInput';
import Point from '../Point';
import UiContext from '../../context/UiContext';

const RegionPassive = ({ points, region }) => {
  const {
    semscreen: { createPoint },
    me: { uid },
  } = useContext(DataContext);
  const {
    rim: {
      state: { isEditing },
      setIsEditing,
      activateRegion,
      deactivateRegion,
    },
  } = useContext(UiContext);

  const [pointInput, setPointInput] = useState(null);
  useEffect(() => {
    // Starts the Focus region with a pointInput
    if (
      !pointInput &&
      points.filter(p => p.region === 'Focus').length === 0 &&
      region === 'Focus'
    ) {
      activateRegion('Focus');
      setPointInput({
        id: uuidv4(),
        uid,
        placeholderContent: 'Tap, type, or paste anywhere...',
        region,
      });
    }
    /* eslint-disable-next-line */
  }, []);
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // only allows one editor or point to be open at any given time
    if (pointInput || isEditing) {
      return;
    }
    // prevents Focus area from having more that one point
    if (region === 'Focus' && points.length > 0) {
      return;
    }
    setIsEditing(true);
    activateRegion(region);
    setPointInput({
      id: uuidv4(),
      uid,
      placeholderContent: `new ${singularize(region).toLowerCase()}`,
      region,
    });
  }

  /*
    this function saves the point to this region
    useState hook
   */
  function _closePointInput() {
    setPointInput(null);
    setIsEditing(false);
    deactivateRegion(region);
  }
  function handlePointInputSubmit(e) {
    const { id, content } = e;
    if (content === '') {
      _closePointInput();
      return;
    }
    createPoint({ id, uid, content, region });
    _closePointInput();
  }

  function handlePointInputCancel(e) {
    e.stopPropagation();
    _closePointInput();
  }

  return (
    <RegionPassiveView onClick={handleClick}>
      {points.map(point => (
        <Point point={point} key={point.id} />
      ))}
      {pointInput && (
        <PointInput
          id={pointInput.id}
          region={pointInput.region}
          placeholderContent={pointInput.placeholderContent}
          onPointInputBlur={handlePointInputSubmit}
          handleCancel={handlePointInputCancel}
          onPointInputSubmit={handlePointInputSubmit}
        />
      )}
    </RegionPassiveView>
  );
};

RegionPassive.propTypes = {
  points: PropTypes.array.isRequired,
  region: PropTypes.string.isRequired,
};

const RegionPassiveView = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 12px;
`;

export default RegionPassive;
