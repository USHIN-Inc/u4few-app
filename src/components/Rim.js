/* eslint-disable global-require */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Region from './Region';
import SessionContext from '../contexts/SessionContext';
import Banner from './UserBanner';

const Rim = ({ children }) => {
  const { session } = useContext(SessionContext);
  const { rimColor } = session;

  return (
    <RimView backgroundColor={rimColor.background} color={rimColor.text}>
      <Banner />
      <Region type="Facts" />
      <Region type="Merits" />
      <Region type="People" />
      <Region type="Thoughts" />
      {children}
      <Region type="Actions" />
      <Region type="Feelings" />
      <Region type="Needs" />
      <Region type="Topics" />
    </RimView>
  );
};

Rim.propTypes = {
  children: PropTypes.node.isRequired,
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
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'red'};
  color: ${props => (props.color ? props.color : 'inherit')};
`;

export default Rim;
