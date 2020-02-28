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
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { singularize } from 'inflected';
import DataContext from '../../context/DataContext';
import PointInput from '../PointInput';
import Point from '../Point';
import UiContext from '../../context/UiContext';

const RegionPassive = ({ points, region }) => {
  const {
    handleCreatePoint,
    handlePointInputCancel,
    handlePointInputSubmit,
    pointInput,
    isSmall,
    showCreateButton,
  } = useRegionPassive({ region, points });

  return (
    <RegionPassiveView>
      {!isSmall && (
        <>
          {points.map(point => (
            <Point point={point} regionName={region} key={point.id} />
          ))}
          {pointInput && (
            <PointInput
              id={pointInput.id}
              region={pointInput.region}
              placeholderContent={pointInput.placeholderContent}
              handleCancel={handlePointInputCancel}
              onPointInputSubmit={handlePointInputSubmit}
            />
          )}
          {showCreateButton && (
            <CreatePointButton handleClick={handleCreatePoint} />
          )}
        </>
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

const CreatePointButton = ({ handleClick }) => (
  <CreatePointButtonContainer onClick={handleClick}>
    <Icon icon={faPlus} size="3x" color="#D3D3D3" />
  </CreatePointButtonContainer>
);

CreatePointButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const CreatePointButtonContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 8px;
`;
/*
  ##### useRegionPassive ####
*/
const useRegionPassive = ({ region, points }) => {
  const {
    semscreen: { createPoint },
    me: { uid },
  } = useContext(DataContext);
  const {
    rim: {
      state: { regionActive, isEditing },
      setIsEditing,
      activateRegion,
    },
  } = useContext(UiContext);

  /*
    The following logic handles when to show the points
    in order for the rim animations to look good the
    points should be hidden while resizing
    */
  const [isSmall, setIsSmall] = useState(true);
  const [timeOut, setTimeOut] = useState(null);
  useEffect(() => {
    if (regionActive === 'none') {
      setTimeOut(
        setTimeout(() => {
          setIsSmall(false);
        }, 1000)
      );
    }
    if (regionActive !== 'none' && region !== regionActive) {
      clearTimeout(timeOut);
      setIsSmall(true);
    }
    // eslint-disable-next-line
  }, [region, regionActive]);
  // End of Is small logic

  // TODO: to solve new point blur or "click outside to close/save" move this
  // state to a context we can close it from the region component on click
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

  function handleCreatePoint(e) {
    e.preventDefault();
    e.stopPropagation();
    // only allows one editor or point to be open at any given time
    if (pointInput || isEditing) {
      console.log('point input', pointInput);
      return;
    }
    // prevents Focus area from having more that one point
    if (region === 'Focus' && points.length > 0) {
      return;
    }
    setIsEditing(true);
    // activateRegion(region);
    console.log('man');
    setPointInput({
      id: uuidv4(),
      uid,
      placeholderContent: `new ${singularize(region).toLowerCase()}`,
      region,
    });
  }

  function _closePointInput() {
    setPointInput(null);
    setIsEditing(false);
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

  return {
    handleCreatePoint,
    handlePointInputCancel,
    handlePointInputSubmit,
    isSmall,
    pointInput,
    showCreateButton: regionActive === region,
  };
};
