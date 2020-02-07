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
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import DataContext from '../../contexts/DataContext';

const NewWorkSpaceForm = () => {
  const {
    workSpace: { createWorkSpace },
  } = useContext(DataContext);
  const [adding, setAdding] = useState(false);
  const [newWorkSpace, setNewWorkspace] = useState('');

  function handleAddClick() {
    if (!adding) {
      setAdding(true);
      return;
    }
    createWorkSpace(newWorkSpace);
    setNewWorkspace('');
    setAdding(false);
  }

  return (
    <WorkSpace className="border rounded-lg">
      {adding && (
        <div className="d-flex justify-content-center align-items-center pr-3">
          <StyledInput
            value={newWorkSpace}
            onChange={e => setNewWorkspace(e.target.value)}
            className="form-control"
          />
          <AddIcon onClick={handleAddClick} icon={faPlus} />
        </div>
      )}
      {!adding && (
        <div>
          <AddIcon onClick={handleAddClick} icon={faPlus} />
        </div>
      )}
    </WorkSpace>
  );
};

const StyledInput = styled.input`
  margin-left: 16px;
  margin-right: 16px;
`;

const AddIcon = styled(Icon)``;

const WorkSpace = styled.div`
  min-width: 64px;
  height: 64px;
  margin-right: 32px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NewWorkSpaceForm;
