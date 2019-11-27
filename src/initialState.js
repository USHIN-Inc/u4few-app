const initialAppState = {
  me: {
    username: 'anonymous',
    rimColor: {
      text: '#111',
      background: '#eee',
    },
    points: [
      {
        id: '1',
        content: 'U4U',
        category: 'topic',
      },
      {
        id: '2',
        content: 'Frontend',
        category: 'topic',
      },
      {
        id: '4',
        content: '@alex Finish the frontend for U4U, like, soon!',
        category: 'action',
      },
      {
        id: '5',
        content: 'Development Team',
        category: 'person',
      },
      {
        id: '6',
        content: 'Alex Garcia',
        category: 'person',
      },
    ],
  },
  users: [
    {
      username: 'paula',
      rimColor: {
        text: '#fff',
        background: '#00f',
      },
      points: [
        {
          id: 1,
          content: 'U4U',
          category: 'topic',
        },
        {
          id: 2,
          content: 'Frontend',
          category: 'topic',
        },
        {
          id: 4,
          content: '@alex Finish the frontend for U4U, like, soon!',
          category: 'action',
        },
        {
          id: 5,
          content: 'Development Team',
          category: 'person',
        },
        {
          id: 6,
          content: 'Alex Garcia',
          category: 'person',
        },
      ],
    },
  ],
};

export default initialAppState;
