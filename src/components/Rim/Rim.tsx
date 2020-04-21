/* eslint-disable */
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
import Region from '../Region/Region';
import DataContext from '../../context/DataContext';
import Banner from '../Banner';
import RimView from './RimView';
import UiContext from '../../context/UiContext';

const Rim = () => {
  const {
    semscreen: {
      settings: { textColor },
    },
  } = useContext(DataContext)!;
  const {
    rim: {
      state: { className },
    },
  } = useContext(UiContext)!;

  return (
    <RimView
      id="rim"
      color={textColor}
      className={className}
    >
      <Banner />
      <Region regionName="Facts" />
      <Region regionName="Merits" />
      <Region regionName="People" />
      <Region regionName="Thoughts" />
      <Region regionName="Focus" />
      <Region regionName="Actions" />
      <Region regionName="Feelings" />
      <Region regionName="Needs" />
      <Region regionName="Topics" />
    </RimView>
  );
};

export default Rim;
