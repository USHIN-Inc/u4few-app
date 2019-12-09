/* eslint-disable global-require */
import React, { useContext } from 'react';
import styled from 'styled-components';
import Region from './Region/Region';
import SessionContext from '../contexts/SessionContext';
import Banner from './UserBanner';
import DragContext from '../contexts/DragContext';

const Rim = () => {
  const { session } = useContext(SessionContext);
  const { setRegion } = useContext(DragContext);
  const { rimColor } = session;

  return (
    <RimView
      onClick={() => setRegion('')}
      onDragEnter={() => setRegion('')}
      backgroundColor={rimColor.background}
      color={rimColor.text}
    >
      <Banner />
      <Region type="Facts" />
      <Region type="Merits" />
      <Region type="People" />
      <Region type="Thoughts" />
      <Region type="Focus" />
      <Region type="Actions" />
      <Region type="Feelings" />
      <Region type="Needs" />
      <Region type="Topics" />
    </RimView>
  );
};

const RimView = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(4rem, auto) auto minmax(4rem, auto);
  grid-template-rows: minmax(4rem, auto) auto minmax(4rem, auto);
  grid-template-areas:
    'facts merits people'
    'thoughts . actions'
    'feelings needs topics';
  background-color: lightgray;
  color: ${props => (props.color ? props.color : 'inherit')};
  /* ##### Focus styles ##### */
  > .Focus {
    align-self: center;
    justify-self: center;
  }
  > .Focus.active {
    width: 83vw;
    height: 80vh;
  }
  > .Merits.Focus-active {
    width: 83vw;
  }
  > .Thoughts.Focus-active {
    height: 80vh;
  }
  > .Needs.Focus-active {
    width: 83vw;
  }
  > .Actions.Focus-active {
    height: 80vh;
  }

  /* ##### Actions styles ##### */
  > .Actions {
    align-self: center;
    justify-self: end;
  }
  > .Actions.active {
    width: 83vw;
    height: 80vh;
  }
  > .Topics.Actions-active {
    width: 83vw;
  }
  > .People.Actions-active {
    width: 83vw;
  }
  > .Focus.Actions-active {
    height: 80vh;
  }
  > .Thoughts.Actions-active {
    height: 80vh;
  }

  /* ##### People styles ##### */
  > .People {
    align-self: start;
    justify-self: end;
  }
  > .People.active {
    width: 83vw;
    height: 80vh;
  }
  > .Actions.People-active {
    width: 83vw;
  }
  > .Topics.People-active {
    width: 83vw;
  }
  > .Facts.People-active {
    height: 80vh;
  }
  > .Merits.People-active {
    height: 80vh;
  }

  /* ###### Merits styles ##### */
  > .Merits {
    align-self: start;
    justify-self: center;
  }
  > .Merits.active {
    width: 83vw;
    height: 80vh;
  }
  > .Facts.Merits-active {
    height: 80vh;
  }
  > .People.Merits-active {
    height: 80vh;
  }
  > .Focus.Merits-active {
    width: 83vw;
  }
  > .Needs.Merits-active {
    width: 83vw;
  }

  /* ##### Facts styles #####*/
  > .Facts {
    align-self: start;
    justify-self: start;
  }
  > .Facts.active {
    width: 83vw;
    height: 80vh;
  }
  > .Merits.Facts-active {
    height: 80vh;
  }
  > .People.Facts-active {
    height: 80vh;
  }
  > .Thoughts.Facts-active {
    width: 83vw;
  }
  > .Feelings.Facts-active {
    width: 83vw;
  }

  /* ##### Thoughts styles ##### */
  > .Thoughts {
    align-self: center;
    justify-self: start;
  }
  > .Thoughts.active {
    width: 83vw;
    height: 80vh;
  }
  > .Focus.Thoughts-active {
    height: 80vh;
  }
  > .Actions.Thoughts-active {
    height: 80vh;
  }
  > .Feelings.Thoughts-active {
    width: 83vw;
  }
  > .Facts.Thoughts-active {
    width: 83vw;
  }

  /* ##### Feelings active ##### */
  > .Feelings {
    align-self: end;
    justify-self: start;
  }
  > .Feelings.active {
    width: 83vw;
    height: 80vh;
  }
  > .Needs.Feelings-active {
    height: 80vh;
  }
  > .Topics.Feelings-active {
    height: 80vh;
  }
  > .Thoughts.Feelings-active {
    width: 83vw;
  }
  > .Facts.Feelings-active {
    width: 83vw;
  }

  /* ##### Needs styles ##### */
  > .Needs {
    align-self: end;
    justify-self: center;
  }
  > .Needs.active {
    width: 83vw;
    height: 80vh;
  }
  > .Feelings.Needs-active {
    height: 80vh;
  }
  > .Topics.Needs-active {
    height: 80vh;
  }
  > .Merits.Needs-active {
    width: 83vw;
  }
  > .Focus.Needs-active {
    width: 83vw;
  }

  /* ##### Topics styles ##### */
  > .Topics {
    align-self: end;
    justify-self: end;
  }
  > .Topics.active {
    width: 83vw;
    height: 80vh;
  }
  > .Feelings.Topics-active {
    height: 80vh;
  }
  > .Needs.Topics-active {
    height: 80vh;
  }
  > .People.Topics-active {
    width: 83vw;
  }
  > .Actions.Topics-active {
    width: 83vw;
  }
`;

export default Rim;
