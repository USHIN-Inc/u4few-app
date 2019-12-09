/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
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
  uid,
  region,
  category,
  subCategory,
  initialValue,
  handleCancel,
  handleDelete,
  placeholderContent,
  onPointInputSubmit,
  onPointInputBlur,
}) => (
  <Formik
    initialValues={{ content: initialValue }}
    onSubmit={e => {
      e.id = id;
      e.uid = uid;
      onPointInputSubmit(e);
    }}
  >
    {({ handleSubmit }) => (
      <Form style={{ width: '80%' }}>
        <Card>
          <CardHeader>
            {getText(region, category, subCategory)}
            {/* {region} : {category} : {subCategory} */}
          </CardHeader>
          <Field
            onClick={e => e.stopPropagation()}
            className="form-control"
            autoFocus
            placeholder={placeholderContent}
            id={id}
            name="content"
            as="textarea"
            rows="5"
            onBlur={onPointInputBlur}
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
            {handleDelete && (
              <Button onClick={handleDelete}>
                <Icon icon={faTrashAlt} />
              </Button>
            )}
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
  onPointInputBlur: e => {
    e.stopPropagation();
    e.preventDefault();
  },
  handleCancel: null,
  handleDelete: null,
};

PointInput.propTypes = {
  id: PropTypes.string,
  uid: PropTypes.string,
  region: PropTypes.string.isRequired,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  initialValue: PropTypes.string,
  placeholderContent: PropTypes.string,
  onPointInputSubmit: PropTypes.func.isRequired,
  onPointInputBlur: PropTypes.func,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
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
