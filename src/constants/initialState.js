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

const meuid = uuidv4();
const paulaid = uuidv4();
const ws1 = uuidv4();
const ws2 = uuidv4();

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
      points: [
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
        },
      ],
    },
    // end of first workSpace
  ],
};

export { initialAppStateV2 };

const initialAppState = {
  currentWorkSpace: ws2,
  workSpaces: [
    {
      name: 'development',
      id: ws1,
      me: {
        username: 'anonymous',
        uid: meuid,
        rimColor: {
          text: '#111',
          background: '#eee',
        },
        points: [
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
            uid: meuid,
          },
        ],
      },
      // end of me workspace 1
      users: [
        {
          username: 'paula',
          rimColor: {
            text: '#fff',
            background: '#00f',
            uid: paulaid,
          },
          points: [
            {
              id: 'a2',
              content: 'dbschema',
              region: 'Topics',
              category: 'clotles',
              subCategory: 'test',
              uid: paulaid,
            },
            {
              id: 'a4',
              content: 'Fix app authorization like plz',
              region: 'Actions',
              uid: paulaid,
            },
            {
              id: 'a5',
              content: 'UX team',
              region: 'People',
              uid: paulaid,
            },
            {
              id: 'a6',
              content: 'Jonh Doe',
              region: 'People',
              uid: paulaid,
            },
          ],
        },
        // end of first user in workspace1
      ],
    },
    // end of workspace 1
    {
      name: 'animals',
      id: ws2,
      me: {
        username: 'anonymous',
        uid: meuid,
        rimColor: {
          text: '#111',
          background: '#eee',
        },
        points: [
          {
            id: '1',
            content: 'Food',
            region: 'Topics',
            uid: meuid,
          },
          {
            id: '2',
            content: 'Species',
            region: 'Topics',
            uid: meuid,
          },
          {
            id: '4',
            content: 'Feed the cats',
            region: 'Actions',
            uid: meuid,
          },
          {
            id: '5',
            content: 'Lalo',
            region: 'People',
            uid: meuid,
          },
          {
            id: '6',
            content: 'Manuel',
            region: 'People',
            uid: meuid,
          },
        ],
      },
      users: [
        {
          username: 'paula',
          rimColor: {
            text: '#fff',
            background: '#00f',
            uid: paulaid,
          },
          points: [
            {
              id: 'a2',
              content: 'Adopting',
              region: 'Topics',
              category: 'wanting',
              subCategory: 'more',
              uid: paulaid,
            },
            {
              id: 'a4',
              content: 'find someone to adopt wendy',
              region: 'Actions',
              uid: paulaid,
            },
            {
              id: 'a5',
              content: 'hugo',
              region: 'People',
              uid: paulaid,
            },
            {
              id: 'a6',
              content: 'miriam',
              region: 'People',
              uid: paulaid,
            },
          ],
        },
        // end of first user in workspace1
      ],
    },
  ],
};

export default initialAppState;
