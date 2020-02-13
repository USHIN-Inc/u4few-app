/* eslint-disable jsx-a11y/no-autofocus */
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
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';

function getText(region, category, subCategory) {
  if (subCategory === '' && category === '') {
    return `${region}`;
  }

  if (subCategory === '' && category !== '') {
    return `${region} :${category}`;
  }

  return `${region} :${category} :${subCategory}`;
}

const PointInput = ({
  id,
  region,
  category,
  subCategory,
  initialValue,
  handleCancel,
  placeholderContent,
  onPointInputSubmit,
}) => (
  <Formik
    initialValues={{ content: initialValue }}
    onSubmit={e => {
      e.id = id;
      onPointInputSubmit(e);
    }}
  >
    {({ handleSubmit }) => (
      <Form style={{ width: '80%' }}>
        <Card>
          <CardHeader>{getText(region, category, subCategory)}</CardHeader>
          <Field
            onClick={e => e.stopPropagation()}
            className="form-control"
            autoFocus
            placeholder={placeholderContent}
            id={id}
            name="content"
            as="textarea"
            rows="5"
            // onBlur={handleSubmit}
          />
          <Card.Footer
            style={{
              width: '100%',
              height: '32px',
              padding: '4px 8px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Button type="submit" onClick={handleSubmit}>
              <Icon icon={faCheck} color="green" />
            </Button>
            <Button onClick={handleCancel}>
              <Icon icon={faTimes} color="red" />
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    )}
  </Formik>
);

PointInput.defaultProps = {
  id: '',
  initialValue: '',
  category: '',
  subCategory: '',
  placeholderContent: '',
  handleCancel: null,
};

PointInput.propTypes = {
  id: PropTypes.string,
  region: PropTypes.string.isRequired,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  initialValue: PropTypes.string,
  placeholderContent: PropTypes.string,
  onPointInputSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
};

const CardHeader = styled(Card.Header)`
  padding: 4px;
  height: 20px;
  font-size: 12px;
  text-align: left;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
`;

export default PointInput;
