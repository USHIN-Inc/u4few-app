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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import DataContext from '../../context/DataContext';

const { createSliderWithTooltip } = Slider;

const SliderWithTooltip = createSliderWithTooltip(Slider);
const HistorySlider = () => {
  const {
    semscreen: {
      timeTravel: { versions, currentPoints, historyLength, switchHistory },
    },
  } = useContext(DataContext);

  return (
    <HistorySliderContainer>
      {historyLength > 1 && (
        <SliderWithTooltip
          min={0}
          max={historyLength - 1}
          defaultValue={currentPoints}
          onAfterChange={e => switchHistory(e)}
          dots
          tipFormatter={value => {
            console.log(versions[value]);
            const date = new Date(versions[value]).toDateString();
            return date;
          }}
        />
      )}
    </HistorySliderContainer>
  );
};

const HistorySliderContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 80vw;
`;

export default HistorySlider;
