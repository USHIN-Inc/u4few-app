import uuidv4 from 'uuid/v4';

const meuid = uuidv4();
const paulaid = uuidv4();

const initialAppState = {
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
        region: 'topic',
        uid: meuid,
      },
      {
        id: '2',
        content: 'Frontend',
        region: 'topic',
        uid: meuid,
      },
      {
        id: '4',
        content: '@alex Finish the frontend for U4U, like, soon!',
        region: 'action',
        uid: meuid,
      },
      {
        id: '5',
        content: 'Development Team',
        region: 'person',
        uid: meuid,
      },
      {
        id: '6',
        content: 'Alex Garcia',
        region: 'person',
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
          content: 'dbschema',
          region: 'topic',
          category: 'clotles',
          subCategory: 'test',
          uid: paulaid,
        },
        {
          id: 'a4',
          content: 'Fix app authorization like plz',
          region: 'action',
          uid: paulaid,
        },
        {
          id: 'a5',
          content: 'UX team',
          region: 'person',
          uid: paulaid,
        },
        {
          id: 'a6',
          content: 'Jonh Doe',
          region: 'person',
          uid: paulaid,
        },
      ],
    },
  ],
};

export default initialAppState;
