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

/*
  i want to find a way to modify the grid colum and row
  size on hover to give the user some feedback
*/
const Summary = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  grid-template-rows: 2rem auto 2rem;
`;

SummaryRim.defaultProps = {
  points: [],
};

SummaryRim.propTypes = {
  points: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default SummaryRim;
