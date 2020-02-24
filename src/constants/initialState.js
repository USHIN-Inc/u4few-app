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
const meuid = '736f3b18';
const paulaid = 'b3efdd3';
const ws1 = 'dss7dsha2';

const initialAppStateV2 = {
  me: {
    username: 'anonymous',
    uid: meuid,
  },
  hats: [
    {
      name: 'test1',
      id: ws1,
      settings: {
        textColor: '#111',
        backgroundColor: '#eee',
        hatIndex: 0,
        hatColorIndex: 0,
      },
      versions: [new Date()],
      history: [
        [
          {
            id: '1',
            content: 'U4U',
            region: 'Topics',
            uid: meuid,
          },
          {
            id: '2',
            content: 'Frontend',
            region: 'Topics',
            uid: meuid,
          },
          {
            id: '4',
            content: '@alex Finish the frontend for U4U, like, soon!',
            region: 'Actions',
            uid: meuid,
          },
          {
            id: '5',
            content: 'Development Team',
            region: 'People',
            uid: meuid,
          },
          {
            id: '6',
            content: 'Alex Garcia',
            region: 'People',
            uid: paulaid,
            username: 'paula',
          },
        ],
      ],
    },
    // end of first workSpace
  ],
};

export { initialAppStateV2 };
