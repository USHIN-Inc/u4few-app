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
import React from 'react';
import styled from 'styled-components';
import Rim from './Rim/Rim';
import SummaryRim from './SummaryRim';
import RightPanel from './RightPanel/index';
import TopPanel from './TopPanel/index';

const SemanticScreen = () => (
  <Container id="semanticScreen">
    <SummaryRim>
      <Rim />
    </SummaryRim>
    <TopPanel />
    <RightPanel />
  </Container>
);

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    'topPanel topPanel'
    'rim rightPanel';

  > #topPanel {
    grid-area: topPanel;
  }

  > #rim {
    grid-area: rim;
  }

  > #rightPanel {
    grid-area: rightPanel;
  }
`;

export default SemanticScreen;
