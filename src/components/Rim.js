/* eslint-disable global-require */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Region from './Region';
import SessionContext from '../contexts/SessionContext';

const Rim = ({ children }) => {
  const { session } = useContext(SessionContext);
  const { points, rimColor, username } = session;

  return (
    <RimView backgroundColor={rimColor.backgroundColor} color={rimColor.text}>
      <Banner color={rimColor.text}>{username}</Banner>
      <Region type="Facts" points={points.filter(n => n.category === 'fact')} />
      <Region
        type="Merits"
        points={points.filter(n => n.category === 'merit')}
      />
      <Region
        type="People"
        points={points.filter(n => n.category === 'person')}
      />
      <Region
        type="Thoughts"
        points={points.filter(n => n.category === 'thought')}
      />
      {children}
      <Region
        type="Actions"
        points={points.filter(n => n.category === 'action')}
      />
      <Region type="Needs" points={points.filter(n => n.category === 'need')} />
      <Region
        type="Feelings"
        points={points.filter(n => n.category === 'feeling')}
      />
      <Region
        type="Topics"
        points={points.filter(n => n.category === 'topic')}
      />
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
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : 'inherit'};
  color: ${props => (props.color ? props.color : 'inherit')};
`;

const Banner = styled.div`
  position: absolute;
  text-align: center;
  font-size: 1rem;
  top: -0.75rem;
  right: 0.5rem;
  padding: 0;
  z-index: 1;
  color: ${props => (props.color ? props.color : 'inherit')};

  &:before {
    content: '';
    position: absolute;
    background-image: url(${require('../images/banner.png')});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: opacity(0.33);
  }
`;

export default Rim;
