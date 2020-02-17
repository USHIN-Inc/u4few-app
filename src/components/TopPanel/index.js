/* eslint-disable react/jsx-props-no-spreading */
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
import HistorySlider from './HistorySlider';

const TopPanel = () => {
  const { topPanelOpen } = useContext(UiContext);
  return (
    <PanelContainer id="topPanel" open={topPanelOpen}>
      {topPanelOpen && (
        <>
          <HistorySlider />
          <Help>
            <p>Ctrl + click on a hat to start a new session</p>
          </Help>
        </>
      )}
    </PanelContainer>
  );
};

const Help = styled.div`
  margin-left: 32px;
  > p {
    font-size: 1.5rem;
  }
`;

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 32px;
  background: white;
  transition: height 1s;
  ${props =>
    props.open
      ? css`
          height: calc(128px + 32px);
        `
      : css`
          height: 0px;
        `}
`;

export default TopPanel;
