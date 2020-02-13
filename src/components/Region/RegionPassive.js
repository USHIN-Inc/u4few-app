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
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { singularize } from 'inflected';
import DataContext from '../../context/DataContext';
import PointInput from '../PointInput';
import Point from '../Point';
import RimContext from '../../context/RimContext';

const RegionPassive = ({ points, region, pointInput, setPointInput }) => {
  const {
    semscreen: { createPoint },
    me: { uid },
  } = useContext(DataContext);
  const {
    state: { isEditing },
    setIsEditing,
    deactivateRegion,
  } = useContext(RimContext);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // TODO add condition to know if we can open
    if (pointInput || isEditing) {
      return;
    }
    // prevents Focus area from having more that one point
    if (region === 'Focus' && points.length > 0) {
      return;
    }
    setIsEditing(true);
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
  function handlePointInputSubmit(e) {
    const { id, content } = e;
    if (content === '') {
      setPointInput(null);
      setIsEditing(false);
      deactivateRegion(region);
      return;
    }
    createPoint({ id, uid, content, region });
    setPointInput(null);
    setIsEditing(false);
    deactivateRegion(region);
  }

  function handlePointInputCancel(e) {
    e.stopPropagation();
    setPointInput(null);
    setIsEditing(false);
    deactivateRegion(region);
  }

  const canOpen = !pointInput;

  return (
    <RegionPassiveView onClick={handleClick}>
      {points.map(point => (
        <Point point={point} key={point.id} canOpen={canOpen} />
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
  overflow: auto;
  font-size: 12px;
`;

export default RegionPassive;
