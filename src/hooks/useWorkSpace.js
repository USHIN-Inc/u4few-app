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

import uuid from 'uuid';
import initialAppState from '../constants/initialState';
import useLocalStorage from './useLocalStorage';

const useWorkSpace = () => {
  const [workSpaces, setWorkSpaces] = useLocalStorage(
    'workSpace',
    initialAppState.workSpaces
  );

  const [currentWorkSpace, setCurrentWorkSpace] = useLocalStorage(
    'currentWorkSpace',
    initialAppState.workSpaces[0].id
  );

  function switchWorkSpace(workSpaceId, setSession) {
    const newSession = workSpaces.find(w => w.id === workSpaceId);
    if (!newSession) {
      console.log('error');
      return;
    }
    setSession(newSession);
    setCurrentWorkSpace(newSession.id);
  }

  function createWorkSpace(name) {
    if (name === '') {
      return;
    }
    setWorkSpaces([
      ...workSpaces,
      {
        name,
        id: uuid(),
        me: {
          username: 'anonymous',
          uid: 'r31',
          rimColor: {
            text: '#111',
            background: '#eee',
          },
          points: [],
        },
        users: [],
      },
    ]);
  }

  function destroyWorkSpace(workSpaceId) {
    const newArray = workSpaces.filter(w => w.id !== workSpaceId);
    setWorkSpaces(newArray);
  }

  return {
    workSpaces,
    currentWorkSpace,
    createWorkSpace,
    destroyWorkSpace,
    switchWorkSpace,
  };
};

export default useWorkSpace;
