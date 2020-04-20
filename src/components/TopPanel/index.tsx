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

import UiContext from '../../context/UiContext';
import HistorySlider from './HistorySlider';

const TopPanel = () => {
  const { topPanelOpen, setTopPanelOpen } = useContext(UiContext)!;
  return (
    <PanelContainer
      id="topPanel"
      className={topPanelOpen ? 'open' : 'close'}
      onClick={() => setTopPanelOpen(false)}
    >
      {topPanelOpen && <HistorySlider />}
    </PanelContainer>
  );
};

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 32px;
  background: white;
  transition: height 1s;
  &.open {
    height: calc(128px + 32px);
  }
  &.close {
    height: 0px;
  }
`;

export default TopPanel;
