/* eslint-disable global-require */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import SessionContext from '../contexts/SessionContext';
import UserSettingsModal from './UserSettingsModal';

/*
  This banner will handle the update of user settings
  username, rimcolor (rimcolor.text && rimcolor.backgroundColor)
  TODO:
    * Form for handling the fields
    * update function
  The update function will work directly with the context so
  this should be easy 3.1415zi
*/

const Banner = () => {
  const { session } = useContext(SessionContext);
  const { rimColor, username } = session;

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
