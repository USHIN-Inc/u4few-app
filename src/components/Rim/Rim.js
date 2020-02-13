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
import DataContext from '../../context/DataContext';
import Banner from '../Banner';
import RimView from './RimView';
import RimContext from '../../context/RimContext';

const Rim = () => {
  const {
    semscreen: {
      settings: { textColor, backgroundColor },
    },
  } = useContext(DataContext);
  const {
    state: { className },
  } = useContext(RimContext);

  return (
    <RimView
      id="rim"
      backgroundColor={backgroundColor}
      color={textColor}
      className={className}
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

export default Rim;
