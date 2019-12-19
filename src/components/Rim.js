/* eslint-disable global-require */
/*
  Copyright (C) 2019 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
import React, { useContext } from 'react';
import styled from 'styled-components';
import Region from './Region/Region';
import SessionContext from '../contexts/SessionContext';
import Banner from './UserBanner';
import DragContext from '../contexts/DragContext';

const Rim = () => {
  const {
    session: { rimColor },
  } = useContext(SessionContext);
  const { setRegion } = useContext(DragContext);

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
