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

  const activateRegion = (region, cloud) => {
    dispatch({
      type: `activate`,
      regionActive: region,
      className: `activate${region}`,
      cloud,
    });
  };

  const deactivateRegion = region => {
    dispatch({
      type: `deactivate`,
      regionActive: 'none',
      className: `deactivate${region}`,
      cloud: false,
    });
  };

  const setIsEditing = value => {
    dispatch({
      type: 'set_editing',
      isEditing: value,
    });
  };

  return { state, activateRegion, deactivateRegion, setIsEditing };
}

export default useRim;
