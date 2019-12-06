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
    'needs feelings topics';
  justify-items: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'red'};
  color: ${props => (props.color ? props.color : 'inherit')};
`;

export default Rim;
