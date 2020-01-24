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
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SummaryRegion from './SummaryRegion';

const SummaryRim = ({ children }) => (
  <Summary id="rim">
    <SummaryRegion type="Facts" />
    <SummaryRegion type="Merits" />
    <SummaryRegion type="People" />
    <SummaryRegion type="Thoughts" />
    {children}
    <SummaryRegion type="Actions" />
    <SummaryRegion type="Needs" />
    <SummaryRegion type="Feelings" />
    <SummaryRegion type="Topics" />
  </Summary>
);

const Summary = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  grid-template-rows: 2rem auto 2rem;
`;

SummaryRim.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SummaryRim;
