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

const SummaryRim = ({ points, children }) => (
  <Summary>
    <SummaryRegion
      type="Facts"
      points={points.filter(n => n.category === 'fact')}
    />
    <SummaryRegion
      type="Merits"
      points={points.filter(n => n.category === 'merit')}
    />
    <SummaryRegion
      type="People"
      points={points.filter(n => n.category === 'person')}
    />
    <SummaryRegion
      type="Thoughts"
      points={points.filter(n => n.category === 'thought')}
    />
    {children}
    <SummaryRegion
      type="Actions"
      points={points.filter(n => n.category === 'action')}
    />
    <SummaryRegion
      type="Needs"
      points={points.filter(n => n.category === 'need')}
    />
    <SummaryRegion
      type="Feelings"
      points={points.filter(n => n.category === 'feeling')}
    />
    <SummaryRegion
      type="Topics"
      points={points.filter(n => n.category === 'topic')}
    />
  </Summary>
);

const Summary = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
`;

SummaryRim.defaultProps = {
  points: [],
};

SummaryRim.propTypes = {
  points: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default SummaryRim;
