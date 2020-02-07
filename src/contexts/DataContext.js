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

import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useAgenda from '../hooks/useAgenda';
import useHat from '../hooks/useHat';
import useSession from '../hooks/useSession';
import useWorkSpace from '../hooks/useWorkSpace';

const DataContext = createContext({
  agenda: {
    agendaItems: undefined,
    setAgendaItems: () => {},
    createAgendaItem: () => {},
    destroyAgendaItem: () => {},
  },
  hat: {
    hats: undefined,
    createHat: () => {},
    destroyHat: () => {},
    selectedHat: () => {},
    updateSelectedtHat: () => {},
  },
  session: {
    session: undefined,
    setSession: () => {},
    putHatOn: () => {},
    destroyPoint: () => {},
    updateUserSettings: () => {},
    updatePoint: () => {},
    createPoin: () => {},
  },
  workSpace: {
    workSpaces: undefined,
    switchWorkSpace: () => {},
    createWorkSpace: () => {},
    destroyWorkSpace: () => {},
  },
});

const DataContextProvider = ({ children }) => {
  const agenda = useAgenda();
  const hat = useHat();
  const workSpace = useWorkSpace();

  const session = useSession();

  return (
    <DataContext.Provider
      value={{
        agenda,
        hat,
        session,
        workSpace,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContext;

export { DataContextProvider };
