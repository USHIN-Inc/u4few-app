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

function reducer(state, action) {
  switch (action.type) {
    case 'activateFacts':
      return { ...state, region: 'Facts', className: 'activateFacts' };
    case 'deactivateFacts':
      return { region: 'none', className: 'deactivateFacts' };

    case 'activateMerits':
      return { ...state, region: 'Merits', className: 'activateMerits' };
    case 'deactivateMerits':
      return { ...state, region: 'none', className: 'deactivateMerits' };

    case 'activatePeople':
      return { ...state, region: 'People', className: 'activatePeople' };
    case 'deactivatePeople':
      return { region: 'none', className: 'deactivatePeople' };

    case 'activateThoughts':
      return { ...state, region: 'Thoughts', className: 'activateThoughts' };
    case 'deactivateThoughts':
      return { ...state, region: 'none', className: 'deactivateThoughts' };

    case 'activateFocus':
      return { ...state, region: 'Focus', className: 'activateFocus' };
    case 'deactivateFocus':
      return { ...state, region: 'none', className: 'deactivateFocus' };

    case 'activateActions':
      return { ...state, region: 'Actions', className: 'activateActions' };
    case 'deactivateActions':
      return { ...state, region: 'none', className: 'deactivateActions' };

    case 'activateFeelings':
      return { ...state, region: 'Feelings', className: 'activateFeelings' };
    case 'deactivateFeelings':
      return { ...state, region: 'none', className: 'deactivateFeelings' };

    case 'activateNeeds':
      return { ...state, region: 'Needs', className: 'activateNeeds' };
    case 'deactivateNeeds':
      return { ...state, region: 'none', className: 'deactivateNeeds' };

    case 'activateTopics':
      return { ...state, region: 'Topics', className: 'activateTopics' };
    case 'deactivateTopics':
      return { ...state, region: 'none', className: 'deactivateTopis' };

    default:
      return state;
  }
}

export default function useRimReducer() {
  const initialRimState = { className: 'passive', region: 'none' };
  const [rimState, dispatch] = useReducer(reducer, initialRimState);
  return [rimState, dispatch];
}
