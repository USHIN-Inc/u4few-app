/* eslint-disable */
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
import React, { useContext } from 'react';
import styled from 'styled-components';
import RegionPassive from './RegionPassive';
import TagCloud from './TagCloud';
import DataContext from '../../context/DataContext';
import UiContext from '../../context/UiContext';

const Region = ({ regionName }: { regionName: string }) => {
  const {
    semscreen: {
      settings: { backgroundColor },
    },
  } = useContext(DataContext)!;
  const {
    rim: {
      state: { regionActive, cloud },
    },
  } = useContext(UiContext)!;

  const {
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    regionPoints,
  } = useRegion({ regionName });

  return (
    <RegionView
      onClick={handleClick}
      background={backgroundColor}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {regionName !== 'Focus' && cloud && regionActive === regionName && (
        <TagCloud region={regionName} />
      )}
      {!cloud && <RegionPassive points={regionPoints} region={regionName} />}
    </RegionView>
  );
};

interface RegionViewProps {
  background: string;
}

const RegionView = styled.div<RegionViewProps>`
  width: 100%;
  height: 100%;
  transition: all 1s;
  background-color: ${props => props.background};
`;

export default Region;

/* 
  ##### useRegion ######
  controller for the region component
  returns: 
  {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    regionPoints,
  };
*/
const useRegion = ({ regionName }: { regionName: string }) => {
  const {
    semscreen: { points, updatePoint },
  } = useContext(DataContext)!;
  const {
    rim: {
      state: { regionActive, isEditing },
      setIsEditing,
      toggleRegionState,
    },
  } = useContext(UiContext)!;

  const regionPoints = points.filter(point => point.region === regionName);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (isEditing) {
      setIsEditing(false);
      return;
    }

    toggleRegionState(regionName);
  }

  let longEvent: number;

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (regionName === 'Focus') {
      return;
    }
    if (regionActive !== regionName && regionActive !== 'none') {
      toggleRegionState(regionActive!);
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        toggleRegionState(regionName, true);
      }, 1000);
    } else if (regionActive === 'none') {
      window.clearTimeout(longEvent);
      longEvent = setTimeout(() => {
        // setRegion(type);
        toggleRegionState(regionName, true);
      }, 1000);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    window.clearTimeout(longEvent);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    // updates the point category
    e.preventDefault();
    clearTimeout(longEvent);
    if (regionName === 'Focus' && regionPoints.length > 0) {
      return;
    }

    // closes the region
    if (regionActive !== 'none') {
      toggleRegionState(regionActive!);
    }

    const pointId = e.dataTransfer.getData('text');

    // update the point to this area
    updatePoint(pointId, {
      region: regionName,
      category: undefined,
      subCategory: undefined,
    });
  }
  // End Drag Handlers

  return {
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    regionPoints,
  };
};
