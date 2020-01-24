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

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SimpleForm = ({ placeholder, onSubmit, onChange }) => {
  const [value, setValue] = useState('');

  function handleCreateItem(e) {
    e.preventDefault();
    if (value !== '') onSubmit(value);
    setValue('');
  }

  function handleChange(e) {
    e.preventDefault();
    setValue(e.target.value);
    onChange(e.target.value);
  }

  function handleEnter(e) {
    e.preventDefault();
    if (e.keyCode === 0) {
      handleCreateItem(e);
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="form-control"
        placeholder={placeholder}
      />
      <div
        role="button"
        tabIndex={0}
        className="input-group-append"
        onKeyPress={handleEnter}
        onClick={handleCreateItem}
      >
        <span className="input-group-text">add</span>
      </div>
    </div>
  );
};

SimpleForm.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

SimpleForm.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SimpleForm;
