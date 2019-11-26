/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Point from './Point';

const SummaryRegion = ({ points, type }) => {
  console.log('summaryRegion', type, points);

  const displayedPoints = points.map(n => (
    <Point key={n.id} id={n.id} title={n.title} category={n.category} />
  ));

  return (
    <SummaryRegionView className={`border ${type}`}>
      {displayedPoints}
    </SummaryRegionView>
  );
};

SummaryRegion.defaultProps = {
  points: [],
};

SummaryRegion.propTypes = {
  points: PropTypes.array,
  type: PropTypes.string.isRequired,
};

const SummaryRegionView = styled.div`
  &.Facts,
  &.Merits,
  &.People,
  &.Thoughts,
  &.Actions,
  &.Needs,
  &.Feelings,
  &.Topics {
    position: relative;
  }
  &.Facts:before,
  &.Merits:before,
  &.People:before,
  &.Thoughts:before,
  &.Actions:before,
  &.Needs:before,
  &.Feelings:before,
  &.Topics:before {
    content: '';
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.33;
    z-index: -1;
  }
  &.Facts:before {
    background-image: url(${require('./../images/square.svg')});
    background-position: top left;
  }
  &.Merits:before {
    background-image: url(${require('./../images/star.svg')});
    background-position: top center;
  }
  &.People:before {
    background-image: url(${require('./../images/banner.svg')});
    background-position: top right;
  }
  &.Thoughts:before {
    background-image: url(${require('./../images/circle.svg')});
    background-position: center left;
  }
  &.Actions:before {
    background-image: url(${require('./../images/arrow.svg')});
    background-position: center right;
  }
  &.Needs:before {
    background-image: url(${require('./../images/heart.svg')});
    background-position: bottom left;
  }
  &.Feelings:before {
    background-image: url(${require('./../images/triangle.svg')});
    background-position: bottom center;
  }
  &.Topics:before {
    background-image: url(${require('./../images/trapezoid.svg')});
    background-position: bottom right;
  }
`;

export default SummaryRegion;
