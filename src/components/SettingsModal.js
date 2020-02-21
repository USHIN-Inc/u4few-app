/* eslint-disable react/jsx-props-no-spreading */
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TwitterPicker } from 'react-color';
import DataContext from '../context/DataContext';

const textColors = [
  '#CB5400',
  '#CF9800',
  '#67BC9A',
  '#009E64',
  '#55A7DC',
  '#00649D',
  '#4C5257',
  '#B50633',
  '#BD6B7F',
  '#7100B0',
];

const backgroundColors = [
  '#FEA96E',
  '#FFDD7D',
  '#BBF1DC',
  '#5ADAAB',
  '#D2EEFF',
  '#61B2E0',
  '#D8DFE5',
  '#F16D8F',
  '#FFD4DF',
  '#CA6EFE',
];

// TODO: add option to change hat name

const SettingsModal = ({ show, handleClose }) => {
  const {
    semscreen: { settings, updateSettings },
    me,
  } = useContext(DataContext);

  const [values, setValues] = useState({
    username: me.username,
    textColor: settings.textColor,
    backgroundColor: settings.backgroundColor,
  });

  function updateSession() {
    const { textColor, backgroundColor, username } = values;
    console.log(values);
    updateSettings({ textColor, backgroundColor });
    if (username !== me.username) me.setUsername(username);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>Hat settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={values.username}
              onChange={e => setValues({ ...values, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Text color</Form.Label>
            <TwitterPicker
              name="textColor"
              color={values.textColor}
              onChange={e => setValues({ ...values, textColor: e.hex })}
              colors={textColors}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Background color</Form.Label>
            <TwitterPicker
              name="backgroundColor"
              color={values.backgroundColor}
              onChange={e => setValues({ ...values, backgroundColor: e.hex })}
              colors={backgroundColors}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateSession} size="sm">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

SettingsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SettingsModal;
