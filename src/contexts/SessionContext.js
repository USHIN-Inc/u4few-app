import { createContext } from 'react';

const SessionContext = createContext({
  session: null,
  setSession: () => {},
  users: [],
});

export default SessionContext;
