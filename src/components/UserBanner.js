/* eslint-disable global-require */
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
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import DataContext from '../contexts/DataContext';
import UserSettingsModal from './UserSettingsModal';

const Banner = () => {
  const {
    session: {
      session: {
        me: { rimColor, username },
      },
    },
  } = useContext(DataContext);

  const [editing, setEditing] = useState(false);

  function handleClose() {
    setEditing(false);
  }

  function handleOpen() {
    setEditing(true);
  }
  return (
    <>
      <BannerView color={rimColor.text} onClick={handleOpen}>
        {username}
      </BannerView>
      <UserSettingsModal show={editing} handleClose={handleClose} />
    </>
  );
};

const BannerView = styled.div`
  position: absolute;
  text-align: center;
  font-size: 1rem;
  top: -0.75rem;
  right: 0.5rem;
  padding: 0;
  z-index: 1;
  cursor: pointer;
  color: ${props => (props.color ? props.color : 'inherit')};

  &:before {
    content: '';
    position: absolute;
    background-image: url(${require('../images/banner.png')});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: opacity(0.33);
  }
`;

export default Banner;
