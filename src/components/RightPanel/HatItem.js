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
    hat: { destroyHat, selectedHat, updateSelectedHat, changeHatIcon },
  } = useContext(DataContext);

  function handleHatIconChange(e) {
    e.preventDefault();
    e.stopPropagation();
    let newHat;
    let newColor;
    if (hat.hatIndex === hatOptions.length - 1) {
      newHat = 0;
      if (hat.colorIndex === colorOptions.length - 1) {
        newColor = 0;
      } else {
        newColor = hat.colorIndex + 1;
      }
    } else {
      newHat = hat.hatIndex + 1;
      newColor = hat.colorIndex;
    }
    changeHatIcon(hat.name, newHat, newColor);
  }

  function handleHatSelection(e) {
    e.preventDefault();
    e.stopPropagation();
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
        color={colorOptions[hat.colorIndex]}
        icon={hatOptions[hat.hatIndex]}
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
