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
        category: 'topic',
        uid: meuid,
      },
      {
        id: '2',
        content: 'Frontend',
        category: 'topic',
        uid: meuid,
      },
      {
        id: '4',
        content: '@alex Finish the frontend for U4U, like, soon!',
        category: 'action',
        uid: meuid,
      },
      {
        id: '5',
        content: 'Development Team',
        category: 'person',
        uid: meuid,
      },
      {
        id: '6',
        content: 'Alex Garcia',
        category: 'person',
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
          category: 'topic',
          uid: paulaid,
        },
        {
          id: 'a4',
          content: 'Fix app authorization like plz',
          category: 'action',
          uid: paulaid,
        },
        {
          id: 'a5',
          content: 'UX team',
          category: 'person',
          uid: paulaid,
        },
        {
          id: 'a6',
          content: 'Jonh Doe',
          category: 'person',
          uid: paulaid,
        },
      ],
    },
  ],
};

export default initialAppState;
