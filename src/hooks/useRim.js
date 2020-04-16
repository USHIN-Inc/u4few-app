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
import { useReducer } from 'react';

const initialRimState = {
  className: 'passive',
  regionActive: 'none',
  cloud: false,
  isEditing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'activate':
      return {
        ...state,
        regionActive: action.regionActive,
        className: action.className,
        cloud: action.cloud,
      };
    case 'deactivate':
      return {
        ...state,
        regionActive: action.regionActive,
        className: action.className,
        cloud: action.cloud,
      };
    case 'set_editing':
      return {
        ...state,
        isEditing: action.isEditing,
      };
    default:
      return state;
  }
}

function useRim() {
  const [state, dispatch] = useReducer(reducer, initialRimState);

  const toggleRegionState = (region, cloud) => {
    if (state.regionActive === region) {
      dispatch({
        type: 'deactivate',
        regionActive: 'none',
        className: 'passive',
        cloud: false,
      });
    } else {
      dispatch({
        type: 'activate',
        regionActive: region,
        className: `${region}--active`,
        cloud,
      });
    }
  };

  const setIsEditing = value => {
    dispatch({
      type: 'set_editing',
      isEditing: value,
    });
  };

  return {
    state,
    setIsEditing,
    toggleRegionState,
  };
}

export default useRim;
