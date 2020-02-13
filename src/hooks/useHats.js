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
import uuidv4 from 'uuid/v4';
import useLocalStorage from './useLocalStorage';
import { initialAppStateV2 } from '../constants/initialState';

const useHat = () => {
  const [hats, setHats] = useLocalStorage('hats', [...initialAppStateV2.hats]);
  const [selectedHat, setSelectedHat] = useLocalStorage('currentHat', hats[0]);

  function changeHatIcon(id, hatIndex, hatColorIndex) {
    setHats(
      hats.map(h => {
        if (h.id === id) {
          return {
            ...h,
            settings: {
              ...h.settings,
              hatIndex,
              hatColorIndex,
            },
          };
        }
        return h;
      })
    );
  }

  function switchSelectedHat(id) {
    const hat = hats.find(h => h.id === id);
    if (!hat) {
      alert('something went wrong while switching hats');
      return;
    }
    // save current selected hat state to hats state
    setHats(
      hats.map(h => {
        if (h.id === selectedHat.id) {
          return selectedHat;
        }
        return h;
      })
    );
    // setSlected hat to new selected hat
    setSelectedHat(hat);
  }

  function createHat(name) {
    // filter to check name is not in use
    const inUse = hats.find(h => h.name === name);
    if (inUse) {
      alert('that hat name is already in use');
      return;
    }
    // create a new hat
    const newHat = {
      name,
      id: uuidv4(),
      settings: {
        textColor: '#111',
        backgroundColor: '#eee',
        hatIndex: 0,
        hatColorIndex: 0,
      },
      points: [],
    };
    setHats([...hats, newHat]);
  }

  function destroyHat(id) {
    // filter the array exclude id
    setHats(hats.filter(h => h.id !== id)); // go and try do this on java ha!
  }

  return {
    hats,
    createHat,
    destroyHat,
    selectedHat,
    setSelectedHat,
    switchSelectedHat,
    changeHatIcon,
  };
};

export default useHat;
