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

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faHatCowboy,
  faHatWizard,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import ListGroup from 'react-bootstrap/ListGroup';

import DeleteIcon from '../commons/DeleteIcon';
import DataContext from '../../contexts/DataContext';

const hatOptions = [faHatCowboy, faHatWizard, faGraduationCap];
const colorOptions = ['black', 'red', 'blue', 'green'];

const HatItem = ({ hat }) => {
  const {
    hat: { destroyHat, selectedHat, updateSelectedHat },
  } = useContext(DataContext);

  const [hatIndex, setHatIndex] = useState(0);
  const [colorIndex, setColoIndex] = useState(0);

  function handleHatIconChange(e) {
    e.preventDefault();
    e.stopPropagation();
    if (hatIndex === hatOptions.length - 1) {
      setHatIndex(0);
      if (colorIndex === colorOptions.length - 1) {
        setColoIndex(0);
      } else {
        setColoIndex(colorIndex + 1);
      }
    } else {
      setHatIndex(hatIndex + 1);
    }
  }

  function handleHatSelection() {
    if (selectedHat !== hat.name) {
      updateSelectedHat(hat.name);
    } else {
      updateSelectedHat(undefined);
    }
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('hat', hat.name);
    e.dataTransfer.dropEffect = 'copy';
  }

  let className = 'd-flex justify-content-between align-items-center';
  if (hat.name === selectedHat) {
    className += ' border-info bg-light';
  }

  return (
    <ListGroup.Item
      draggable
      onClick={handleHatSelection}
      onDragStart={handleDragStart}
      className={className}
    >
      <Icon
        color={colorOptions[colorIndex]}
        icon={hatOptions[hatIndex]}
        onClick={handleHatIconChange}
      />
      {hat.name}
      <DeleteIcon handleClick={() => destroyHat(hat.name)} />
    </ListGroup.Item>
  );
};

HatItem.propTypes = {
  hat: PropTypes.object.isRequired,
};

export default HatItem;
