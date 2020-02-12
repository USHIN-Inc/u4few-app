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

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../../contexts/DataContext';

const TrashZone = ({ sidePanelState }) => {
  const {
    semscreen: { destroyPoint },
  } = useContext(DataContext);
  const [active, setActive] = useState(false);

  const className = `btn__trash-zone--${sidePanelState}`;

  function handleDragEnter(e) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const pointId = e.dataTransfer.getData('text');
    destroyPoint(pointId);
    setActive(false);
  }
  return (
    <Bottom
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={className}
      active={active}
    >
      <Icon icon={faTrashAlt} size="2x" />
    </Bottom>
  );
};

TrashZone.propTypes = {
  sidePanelState: PropTypes.string.isRequired,
};

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
  transition: background-color 1s;

  &.btn__trash-zone--closed {
    display: none;
  }

  &.btn__trash-zone--open {
    width: calc(512px - 128px);
  }

  &.btn__trash-zone--open-2 {
    width: calc(512px + 128px);
  }

  &.btn__trash-zone--open-3 {
    width: 1024px;
  }

  ${props =>
    props.active &&
    css`
      background-color: #fddfdf;
    `}
`;

export default TrashZone;
