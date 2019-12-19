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
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TwitterPicker } from 'react-color';
import SessionContext from '../contexts/SessionContext';

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

const UserSettingsModal = ({ show, handleClose }) => {
  const { session, setSession } = useContext(SessionContext);

  function updateSession(values) {
    const { username, textColor, backgroundColor } = values;
    console.log(backgroundColor);
    setSession({
      ...session,
      username,
      rimColor: {
        text: textColor,
        background: backgroundColor,
      },
    });
    handleClose();
  }

  const formik = useFormik({
    initialValues: {
      username: session.username,
      textColor: session.rimColor.text,
      backgroundColor: session.rimColor.background,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      textColor: Yup.string(),
      backgroundColor: Yup.string(),
    }),
    onSubmit: values => {
      updateSession(values);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>User settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (
              <Alert variant="danger">{formik.errors.username}</Alert>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Text color</Form.Label>
            <TwitterPicker
              name="textColor"
              color={formik.values.textColor}
              onChange={e => formik.setFieldValue('textColor', e.hex)}
              colors={textColors}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Background color</Form.Label>
            <TwitterPicker
              name="backgroundColor"
              color={formik.values.backgroundColor}
              onChange={e => formik.setFieldValue('backgroundColor', e.hex)}
              colors={backgroundColors}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={formik.handleSubmit} size="sm">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

UserSettingsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UserSettingsModal;
