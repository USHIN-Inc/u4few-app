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
import ListGroup from 'react-bootstrap/ListGroup';

import Section from '../commons/Section';
import DataContext from '../../contexts/DataContext';
import SimpleForm from '../commons/SimpleForm';

import HatItem from './HatItem';

const Hats = () => {
  const {
    hats: { hats, createHat },
  } = useContext(DataContext);

  const [search, setSearch] = useState('');

  function handleCreateHat(value) {
    createHat(value);
    setSearch('');
  }

  function byQuery(query) {
    return function(item) {
      return !query || item.name.toLowerCase().includes(query.toLowerCase());
    };
  }

  function handleChange(value) {
    setSearch(value);
  }

  return (
    <Section title="Hats">
      <>
        {/* eslint-disable-next-line react/button-has-type */}
        <SimpleForm
          placeholder="search / new Hat"
          onChange={handleChange}
          onSubmit={handleCreateHat}
        />
        <ListGroup>
          {hats.filter(byQuery(search)).map(hat => (
            <HatItem key={hat.name} hat={hat} />
          ))}
        </ListGroup>
      </>
    </Section>
  );
};

export default Hats;
