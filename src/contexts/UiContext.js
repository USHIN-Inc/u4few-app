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
import useLocalState from '../hooks/useLocalStorage';

const UiContext = createContext({
  sidePanelState: null,
  setSidePanelState: () => {},
  toggleSidePanel: () => {},
  topPanelOpen: null,
  setTopPanelOpen: () => {},
});

const UiContextProvider = ({ children }) => {
  const [sidePanelState, setSidePanelState] = useLocalState(
    'sidePanel',
    'closed'
  );

  function toggleSidePanel() {
    switch (sidePanelState) {
      case 'closed':
        setSidePanelState('open');
        break;
      case 'open':
        setSidePanelState('closed');
        break;
      default:
        console.log('error');
    }
  }

  const [topPanelOpen, setTopPanelOpen] = useLocalState('topPanel', true);

  return (
    <UiContext.Provider
      value={{
        sidePanelState,
        setSidePanelState,
        toggleSidePanel,
        topPanelOpen,
        setTopPanelOpen,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

UiContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UiContextProvider };

export default UiContext;
