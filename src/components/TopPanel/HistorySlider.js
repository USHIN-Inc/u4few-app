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
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import DataContext from '../../context/DataContext';

const { Handle } = Slider;

// eslint-disable-next-line react/prop-types
const handle = ({ value, dragging, index }) => (
  <Tooltip
    prefixCls="rc-slider-tooltip"
    overlay={value}
    visible={dragging}
    placement="top"
    key={index}
  >
    <Handle value={value} />
  </Tooltip>
);

const HistorySlider = () => {
  const {
    semscreen: {
      timeTravel: { currentPoints, historyLength, switchHistory },
    },
  } = useContext(DataContext);

  return (
    <div style={{ width: '75%' }}>
      {historyLength > 1 && (
        <Slider
          min={0}
          max={historyLength - 1}
          value={currentPoints}
          onChange={e => switchHistory(e)}
          dots
          handle={handle}
        />
      )}
    </div>
  );
};

export default HistorySlider;
