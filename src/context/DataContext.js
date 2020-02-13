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
import useHats from '../hooks/useHats';
import useSemscreen from '../hooks/useSemscreen';
import useMe from '../hooks/useMe';

const DataContext = createContext({
  me: {
    username: undefined,
    setUsername: () => {},
    uid: undefined,
  },
  agenda: {
    agendaItems: undefined,
    setAgendaItems: () => {},
    createAgendaItem: () => {},
    destroyAgendaItem: () => {},
  },
  hats: {
    hats: undefined,
    createHat: () => {},
    destroyHat: () => {},
    selectedHat: undefined, // name, id, settings, points, we can pass this to to semscreen
    setSelectedHat: () => {},
    switchSelectedHat: () => {}, // we pass this function to the semscreen hook
    changeHatIcon: () => {},
  },
  semscreen: {
    points: undefined,
    putHatOn: () => {},
    destroyPoint: () => {},
    updatePoint: () => {},
    createPoint: () => {},
    settings: {
      textColor: undefined, // string hex color
      backgroundColor: undefined, // string hex color
      hatIdex: undefined, // number
      hatColorIndex: undefined, // number
    },
    updateSettings: () => {},
  },
});

const DataContextProvider = ({ children }) => {
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
