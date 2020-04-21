/* eslint-disable */
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
import useAgenda, { UseAgendaI } from '../hooks/useAgenda';
import useHats, { UseHatsI } from '../hooks/useHats';
import useSemscreen, { UseSemscreenI } from '../hooks/useSemscreen';
import useMe, { UseMeI } from '../hooks/useMe';

// Context Schema
interface DataContextI {
  me: UseMeI;
  agenda: UseAgendaI;
  hats: UseHatsI;
  semscreen: UseSemscreenI;
}

const DataContext = createContext<DataContextI | null>(null);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const me = useMe();
  const agenda = useAgenda();
  const hats = useHats();
  const semscreen = useSemscreen(hats.selectedHat, hats.setSelectedHat, me);

  return (
    <DataContext.Provider
      value={{
        me,
        agenda,
        hats,
        semscreen,
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
