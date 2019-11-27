import React from 'react';
import styled from 'styled-components';
import useLocalStorage from './hooks/useLocalStorage';

import SessionContext from './contexts/SessionContext';
import SemanticScreen from './components/SemanticScreen';

import initialAppState from './initialState';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => {
  const [session, setSession] = useLocalStorage('session', initialAppState.me);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <Wrapper>
        <SemanticScreen />
      </Wrapper>
    </SessionContext.Provider>
  );
};

export default App;
