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

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UiContext from '../../contexts/UiContext';

const Section = ({ title, children }) => {
  const { sidePanelState } = useContext(UiContext);

  const [open, setOpen] = useState(true);
  function handleOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  }

  const [sectionSize, setSectionSize] = useState('small');
  function toggleSectionSize() {
    switch (sectionSize) {
      case 'small':
        setSectionSize('medium');
        break;
      case 'medium':
        setSectionSize('large');
        break;
      case 'large':
        setSectionSize('small');
        break;
      default:
        console.log('error');
        break;
    }
  }

  const classes = [];

  classes.push(`section--size-${sectionSize}`);
  classes.push(open ? 'section--open' : 'section--closed');
  classes.push(`right-panel--${sidePanelState}`);

  return (
    <SectionContainer className={classes.join(' ')}>
      {/* eslint-disable-next-line */}
      <SectionHeader>
        <Title onClick={handleOpen}>{title}</Title>
      </SectionHeader>
      {open && children}
    </SectionContainer>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  padding: 4px;
  margin-bottom: 8px;
  font-size: 1.5rem;
`;

const SectionContainer = styled.div`
  margin: 8px;
  border-bottom: 1px solid lightgray;
  overflow-y: scroll;
  transition: width 1s;

  &.right-panel--closed {
    max-width: 0px;
  }

  &.right-panel--open {
    max-width: calc(512px - 128px - 32px);
  }

  &.right-panel--open-2 {
    max-width: calc(512px + 128px - 32px);
  }

  &.right-panel--open-3 {
    max-width: calc(1024px - 32px);
  }

  &.section--size-small {
    width: calc(512px - 128px - 32px);
  }

  &.section--size-medium {
    width: calc(512px + 128px - 32px);
  }
  &.section--size-large {
    width: calc(1024px - 32px);
  }

  &.section--open {
    animation: open 1s ease-in;
    animation-fill-mode: forwards;

    @keyframes open {
      from {
        height: 48px;
      }
      to {
        height: 80%;
      }
    }
  }

  &.section--closed {
    animation: close 1s ease-in;
    animation-fill-mode: forwards;

    @keyframes close {
      0% {
        height: 80%;
      }
      100% {
        height: 48px;
      }
    }
  }
`;

export default Section;
