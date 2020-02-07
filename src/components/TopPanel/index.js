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

import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import UiContext from '../../contexts/UiContext';
import NewWorkSpaceForm from './NewWorkSpaceForm';
import DataContext from '../../contexts/DataContext';

const TopPanel = () => {
  const { topPanelOpen } = useContext(UiContext);
  const {
    workSpace: {
      workSpaces,
      switchWorkSpace,
      currentWorkSpace,
      destroyWorkSpace,
    },
    session: { setSession },
  } = useContext(DataContext);

  function handleDeleteWorkSpace(workSpaceId) {
    if (window.confirm('are you sure you want to delete this workSpace')) {
      destroyWorkSpace(workSpaceId);
      // TODO: handle session undefined
      // setSession(undefined);
    }
  }

  return (
    <PanelContainer id="topPanel" open={topPanelOpen}>
      {topPanelOpen && (
        <>
          {workSpaces.map(workspace => {
            if (workspace.id === currentWorkSpace) {
              return (
                <WorkSpace key={workspace.id}>
                  {workspace.name}
                  <DeleteIcon
                    handleDelete={() => handleDeleteWorkSpace(workspace.id)}
                  />
                </WorkSpace>
              );
            }
            return (
              <WorkSpace
                key={workspace.id}
                onClick={() => switchWorkSpace(workspace.id, setSession)}
              >
                {workspace.name}
              </WorkSpace>
            );
          })}
        </>
      )}

      {topPanelOpen && workSpaces.length < 5 && <NewWorkSpaceForm />}
    </PanelContainer>
  );
};

const DeleteIcon = ({ handleDelete }) => (
  <div style={{ marginLeft: '8px' }}>
    <Icon onClick={handleDelete} icon={faTimes} />
  </div>
);
DeleteIcon.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};

const WorkSpace = styled.div`
  min-width: 64px;
  width: min-content;
  height: 65px;
  padding: 8px;
  margin-right: 32px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 32px;
  background: #f5f5f5;
  transition: height 1s;
  ${props =>
    props.open
      ? css`
          height: calc(128px + 32px);
        `
      : css`
          height: 0px;
        `}
`;

export default TopPanel;
