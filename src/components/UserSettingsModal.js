/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TwitterPicker } from 'react-color';
import SessionContext from '../contexts/SessionContext';

/*
  TODO: update default colors in color palette
  current ones are pretty bad for txt color
  TODO: Add Error messages
*/

const UserSettingsModal = ({ show, handleClose }) => {
  const { session, setSession } = useContext(SessionContext);

  function updateSession(values) {
    const { username, textColor, backgroundColor } = values;
    console.log(session);
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
      backgroundColor: session.rimColor.backgroundColor,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      textColor: Yup.string(),
      backgroundColor: Yup.string(),
    }),
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
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
            {/* TODO: Add Error validation message */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Text color</Form.Label>
            <TwitterPicker
              name="textColor"
              color={formik.values.textColor}
              onChange={e => formik.setFieldValue('textColor', e.hex)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Background color</Form.Label>
            <TwitterPicker
              name="backgroundColor"
              color={formik.values.backgroundColor}
              onChange={e => formik.setFieldValue('backgroundColor', e.hex)}
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
