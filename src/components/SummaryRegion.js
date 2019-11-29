/* eslint-disable global-require */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Point from './Point';
import TagsModal from './TagsModal';

const SummaryRegion = ({ points, type }) => {
  const displayedPoints = points.map(n => (
    <Point key={n.id} id={n.id} title={n.title} category={n.category} />
  ));

  const [isShowing, setIsShowing] = useState(false);

  function handleShow() {
    setIsShowing(true);
  }

  function handleClose() {
    setIsShowing(false);
  }

  /*
    Here starts the handling of drag events
  */

  function handleDragEnter(e) {
    e.preventDefault();
  }

  function handleDragLeave(e) {
    e.preventDefault();
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    console.log(e.target);
    handleShow();
  }

  return (
    <>
      <SummaryRegionView
        className={`border ${type}`}
        type={type}
        onClick={handleShow}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {displayedPoints}
      </SummaryRegionView>
      <TagsModal show={isShowing} handleClose={handleClose} type={type} />
    </>
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
  &.Facts:after,
  &.Merits:after,
  &.People:after,
  &.Thoughts:after,
  &.Actions:after,
  &.Needs:after,
  &.Feelings:after,
  &.Topics:after {
    content: '';
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.33;
    z-index: -1;
  }
  &.Facts:after {
    background-image: url(${require('./../images/square.svg')});
    background-position: top left;
  }
  &.Merits:after {
    background-image: url(${require('./../images/star.svg')});
    background-position: top center;
  }
  &.People:after {
    background-image: url(${require('./../images/banner.svg')});
    background-position: top right;
  }
  &.Thoughts:after {
    background-image: url(${require('./../images/circle.svg')});
    background-position: center left;
  }
  &.Actions:after {
    background-image: url(${require('./../images/arrow.svg')});
    background-position: center right;
  }
  &.Needs:after {
    background-image: url(${require('./../images/heart.svg')});
    background-position: bottom left;
  }
  &.Feelings:after {
    background-image: url(${require('./../images/triangle.svg')});
    background-position: bottom center;
  }
  &.Topics:after {
    background-image: url(${require('./../images/trapezoid.svg')});
    background-position: bottom right;
  }
`;

export default SummaryRegion;
