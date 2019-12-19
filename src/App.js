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
import React from 'react';
import styled from 'styled-components';
import useLocalStorage from './hooks/useLocalStorage';

import SessionContext from './contexts/SessionContext';
import SemanticScreen from './components/SemanticScreen';

import initialAppState from './constants/initialState';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => {
  // useLocalStorage only uses initial state if there is
  // not a localStorage yet in memory
  const [session, setSession] = useLocalStorage('session', {
    ...initialAppState.me,
    users: initialAppState.users,
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <Wrapper>
        <SemanticScreen />
      </Wrapper>
    </SessionContext.Provider>
  );
};

export default App;
