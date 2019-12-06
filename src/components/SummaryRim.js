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
  grid-template-columns: 1rem auto 1rem;
  grid-template-rows: 1rem auto 1rem;
`;

SummaryRim.defaultProps = {
  points: [],
};

SummaryRim.propTypes = {
  points: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default SummaryRim;
