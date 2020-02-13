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
import UiContext from '../../context/UiContext';

const Section = ({ title, children }) => {
  const { sidePanelState } = useContext(UiContext);

  const [open, setOpen] = useState(true);
  function handleOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  }

  const classes = [];

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
  overflow-y: hidden;
  width: auto;
  transition: max-height 1s;
  height: auto;
  max-height: 200vh;

  &.right-panel--open {
    max-width: calc(512px - 128px - 32px);
  }

  &.right-panel--open-2 {
    max-width: calc(512px + 128px - 32px);
  }

  &.right-panel--open-3 {
    max-width: calc(1024px - 32px);
  }

  &.section--closed {
    max-height: 48px;
  }
`;

export default Section;
