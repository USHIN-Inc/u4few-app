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
import styled, { css } from 'styled-components';

import UiContext from '../../context/UiContext';
import Agenda from './Agenda';
import Hats from './Hats';
import TrashZone from './TrashZone';

const RightPanel = () => {
  const { sidePanelState, toggleSidePanel } = useContext(UiContext);

  const className = `panel__right--${sidePanelState}`;

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleSidePanel();
  }

  return (
    <PanelContainer id="rightPanel" onClick={handleClick} className={className}>
      {sidePanelState !== 'closed' && <Hats />}
      {sidePanelState !== 'closed' && <Agenda />}
      <TrashZone sidePanelState={sidePanelState} />
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  position: relative;
  background: white;
  transition: width 1s;
  overflow-y: auto;

  &.panel__right--closed {
    width: 0px;
  }

  &.panel__right--open {
    width: calc(512px - 128px);
  }

  &.panel__right--open-2 {
    width: calc(512px + 128px);
  }

  &.panel__right--open-3 {
    width: 1024px;
  }

  ${props =>
    props.open
      ? css`
          width: calc(512px - 128px);
        `
      : css`
          width: 0px;
        `};
`;

export default RightPanel;
