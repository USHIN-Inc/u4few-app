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

import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useHat = () => {
  const [hats, setHats] = useLocalStorage('hats', [
    { name: 'development', hatIndex: 0, colorIndex: 0 },
    { name: 'kindwoman', hatIndex: 2, colorIndex: 2 },
  ]);
  const [selectedHat, setSelectedHat] = useState(undefined);

  function changeHatIcon(name, hatIndex, colorIndex) {
    setHats(
      hats.map(h => {
        if (h.name === name) {
          return { name, hatIndex, colorIndex };
        }
        return h;
      })
    );
  }

  function updateSelectedHat(name) {
    setSelectedHat(name);
  }

  function createHat(name) {
    // filter to check name is not in use
    const inUse = hats.find(h => h.name === name);
    if (inUse) {
      // TODO: add a kind of validation, this is a good place for a portal
      return;
    }
    // if name !inUse dave the new hat
    setHats([...hats, { name, hatIndex: 0, colorIndex: 0 }]);
  }

  function destroyHat(name) {
    // filter the array exclude name
    setHats(hats.filter(h => h.name !== name)); // go and try do this on java ha!
  }

  return {
    hats,
    createHat,
    destroyHat,
    selectedHat,
    changeHatIcon,
    updateSelectedHat,
  };
};

export default useHat;
