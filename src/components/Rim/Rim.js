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

/* eslint-disable global-require */
import React, { useContext } from 'react';
import Region from '../Region/Region';
import DataContext from '../../contexts/DataContext';
import Banner from '../Banner';
import RimView from './RimView';
import useRimReducer from './useRimReducer';

const Rim = () => {
  const {
    semscreen: {
      settings: { textColor, backgroundColor },
    },
  } = useContext(DataContext);

  const [rimState, dispatch] = useRimReducer();

  return (
    <RimView
      id="rim"
      backgroundColor={backgroundColor}
      color={textColor}
      className={rimState.className}
    >
      <Banner />
      <Region type="Facts" rimState={rimState} dispatch={dispatch} />
      <Region type="Merits" rimState={rimState} dispatch={dispatch} />
      <Region type="People" rimState={rimState} dispatch={dispatch} />
      <Region type="Thoughts" rimState={rimState} dispatch={dispatch} />
      <Region type="Focus" rimState={rimState} dispatch={dispatch} />
      <Region type="Actions" rimState={rimState} dispatch={dispatch} />
      <Region type="Feelings" rimState={rimState} dispatch={dispatch} />
      <Region type="Needs" rimState={rimState} dispatch={dispatch} />
      <Region type="Topics" rimState={rimState} dispatch={dispatch} />
    </RimView>
  );
};

export default Rim;
