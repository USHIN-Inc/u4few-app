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
import styled from 'styled-components';

const RimView = styled.div`
  --active-size: 6fr;
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    'facts merits people'
    'thoughts . actions'
    'feelings needs topics';

  background-color: lightgray;
  color: ${props => (props.color ? props.color : 'inherit')};

  /* ##### Default style ##### */
  &.passive {
    animation: deactivateFocus 1s ease-in;
    animation-fill-mode: forwards;
  }

  /* ##### Focus styles ##### */
  > .Focus {
    align-self: center;
    justify-self: center;
  }
  &.activateFocus {
    animation: activateFocus 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateFocus {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
  }
  &.deactivateFocus {
    animation: deactivateFocus 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateFocus {
    0% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Actions styles ##### */
  > .Actions {
    align-self: center;
    justify-self: end;
    grid-area: actions;
  }
  &.activateActions {
    animation: activateActions 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateActions {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
  }
  &.deactivateActions {
    animation: deactivateActions 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateActions {
    0% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### People styles ##### */
  > .People {
    align-self: start;
    justify-self: end;
    grid-area: people;
  }

  &.activatePeople {
    animation: activatePeople 1s ease-in;
    animation-fill-mode: forwards;
  }

  @keyframes activatePeople {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
  }
  &.deactivatePeople {
    animation: deactivatePeople 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivatePeople {
    0% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ###### Merits styles ##### */
  > .Merits {
    align-self: start;
    justify-self: center;
    grid-area: merits;
  }
  &.activateMerits {
    animation: activateMerits 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateMerits {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
  }
  &.deactivateMerits {
    animation: deactivateMerits 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateMerits {
    0% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Facts styles #####*/
  > .Facts {
    align-self: start;
    justify-self: start;
    grid-area: facts;
  }
  &.activateFacts {
    animation: activateFacts 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateFacts {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
  }
  &.deactivateFacts {
    animation: deactivateFacts 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateFacts {
    0% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: var(--active-size) 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Thoughts styles ##### */
  > .Thoughts {
    align-self: center;
    justify-self: start;
    grid-area: thoughts;
  }
  &.activateThoughts {
    animation: activateThoughts 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateThoughts {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
  }
  &.deactivateThoughts {
    animation: deactivateThoughts 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateThoughts {
    0% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: 1fr var(--active-size) 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Feelings active ##### */
  > .Feelings {
    align-self: end;
    justify-self: start;
    grid-area: feelings;
  }
  &.activateFeelings {
    animation: activateFeelings 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateFeelings {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: 1fr 1fr var(--active-size);
    }
  }
  &.deactivateFeelings {
    animation: deactivateFeelings 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateFeelings {
    0% {
      grid-template-columns: var(--active-size) 1fr 1fr;
      grid-template-rows: 1fr 1fr var(--active-size);
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Needs styles ##### */
  > .Needs {
    align-self: end;
    justify-self: center;
    grid-area: needs;
  }
  &.activateNeeds {
    animation: activateNeeds 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateNeeds {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: 1fr 1fr var(--active-size);
    }
  }
  &.deactivateNeeds {
    animation: deactivateNeeds 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateNeeds {
    0% {
      grid-template-columns: 1fr var(--active-size) 1fr;
      grid-template-rows: 1fr 1fr var(--active-size);
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  /* ##### Topics styles ##### */
  > .Topics {
    align-self: end;
    justify-self: end;
    grid-area: topics;
  }
  &.activateTopics {
    animation: activateTopics 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes activateTopics {
    0% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    100% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: 1fr 1fr var(--active-size);
    }
  }
  &.deactivateTopics {
    animation: deactivateTopics 1s ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes deactivateTopics {
    0% {
      grid-template-columns: 1fr 1fr var(--active-size);
      grid-template-rows: 1fr 1fr var(--avtive-size);
    }
    100% {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
`;

export default RimView;
