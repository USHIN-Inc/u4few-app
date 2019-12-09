import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function getText(region, category, subCategory) {
  if (subCategory === '' && category === '') {
    return `${region}`;
  }

  if (subCategory === '' && category !== '') {
    return `${region} :${category}`;
  }

  return `${region} :${category} :${subCategory}`;
}

const PointView = ({
  content,
  region,
  category,
  subCategory,
  handleCancel,
  username,
}) => (
  <Card style={{ width: '80%' }}>
    <Card.Body>
      <Card.Subtitle
        style={{
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Badge variant="light">{getText(region, category, subCategory)}</Badge>
        <Badge variant="primary">author: {username}</Badge>
      </Card.Subtitle>
      <br />
      <Card.Text>{content}</Card.Text>
    </Card.Body>
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
      <Button onClick={handleCancel}>
        <Icon icon={faTimes} color="red" />
      </Button>
    </Card.Footer>
  </Card>
);

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
`;

PointView.defaultProps = {
  category: '',
  subCategory: '',
};

PointView.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
};

export default PointView;
