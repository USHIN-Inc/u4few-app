import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from './hooks/useLocalStorage';

import SessionContext from './contexts/SessionContext';
import SemanticScreen from './components/SemanticScreen';

import initialAppState from './constants/initialState';

const App = () => {
  // useLocalStorage only uses initial state if there is
  // not a localStorage yet in memory
  const [session, setSession] = useLocalStorage('session', {
    ...initialAppState.me,
    users: initialAppState.users,
  });

  const [hoverActive, setHoverActive] = useState(false);

  function handleDragEnter(e) {
    e.preventDefault();

    setHoverActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();

    setHoverActive(false);

    console.log('bye');
  }

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <Wrapper onDragEnter={handleDragEnter} onDragEnd={handleDragLeave}>
        <SemanticScreen />
      </Wrapper>
      <TrashCan className={hoverActive ? 'active' : null}>
        <Icon icon={faTrashAlt} color="red" size="10x" />
      </TrashCan>
    </SessionContext.Provider>
  );
};

const TrashCan = styled.div`
  position: absolute;
  opacity: 0;
  content: 'trashcan';
  right: 50px;
  bottom: 50px;
  height: 150px;
  width: 150px;
  transition: opacity 1s;
  z-index: 3;
  &.active {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export default App;
