import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import PointView from './PointView';

const TagsModal = ({ show, handleClose, type }) => (
  <StyledModal show={show} centered>
    <ModalBody>
      {/* <TagsCloud /> */}
      {type}
      <Card>
        <Card.Header>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Clarity</Button>
            <Button variant="secondary">Reassurance</Button>
            <Button variant="secondary">Freedom</Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Badge variant="info">Understanding</Badge>
          <Badge variant="info">Stimulation</Badge>
          <Badge variant="info">Completion</Badge>
          <Badge variant="info">Comprehension</Badge>
          <Badge variant="info">Information</Badge>
          <Badge variant="info">Awareness</Badge>
          <Badge variant="info">Reflection</Badge>
          <Badge variant="info">Discrimination</Badge>
        </Card.Body>
      </Card>
      <br />
      <PointView
        category="test"
        content="test"
        handleCancel={handleClose}
        username="test"
      />
    </ModalBody>
  </StyledModal>
);

TagsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const StyledModal = styled(Modal)``;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export default TagsModal;
