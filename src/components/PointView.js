import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PointView = ({ content, category, handleCancel, username }) => (
  <Card style={{ width: '80%' }}>
    <Card.Body>
      <Card.Subtitle
        style={{
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Badge variant="light">{category}</Badge>
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

PointView.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default PointView;
