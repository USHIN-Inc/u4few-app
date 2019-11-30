import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import PointView from './PointView';
import { Needs } from '../constants/tags';
import SessionContext from '../contexts/SessionContext';

const badgeVariants = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
];

function renderBadges(subCategory) {
  let badges = [];
  Object.entries(Needs).forEach(entry => {
    if (entry[0] === subCategory) {
      badges = [...entry[1]];
    }
  });
  const TagsBadgeds = badges.map(tag => {
    const variant = Math.floor(Math.random() * 6);
    return (
      <MyBadge key={tag} variant={badgeVariants[variant]}>
        {tag}
      </MyBadge>
    );
  });
  return TagsBadgeds;
}

function renderSubCategoriesButtons(handleSubCategoryChange) {
  const subCategories = Object.keys(Needs);
  const subCategoriesButtons = subCategories.map(subCategory => (
    <Button
      key={subCategory}
      name={subCategory}
      variant="secondary"
      onClick={handleSubCategoryChange}
    >
      {subCategory}
    </Button>
  ));

  return subCategoriesButtons;
}

const TagsModal = ({ show, handleClose, type, pointId }) => {
  const [subCategory, setSubCAtegory] = useState('Clarity');

  const { session } = useContext(SessionContext);
  const { points } = session;

  const [point, setPoint] = useState({
    category: 'test',
    content: 'test',
    username: 'test',
  });

  useEffect(() => {
    points.forEach(p => {
      if (p.id === pointId) {
        setPoint(p);
      }
    });
  }, [pointId, points]);

  function handleSubCategoryChange(e) {
    e.preventDefault();
    setSubCAtegory(e.target.name);
  }

  return (
    <StyledModal show={show} centered>
      <ModalBody>
        {type}
        <Card>
          <Card.Header style={{ display: 'flex', flexFlow: 'row' }}>
            <ButtonGroup vertical>
              {renderSubCategoriesButtons(handleSubCategoryChange)}
            </ButtonGroup>
            <BadgesContainer>{renderBadges(subCategory)}</BadgesContainer>
          </Card.Header>
        </Card>
        <br />
        <PointView
          category={point.category}
          content={point.content}
          handleCancel={handleClose}
          username={session.username}
        />
      </ModalBody>
    </StyledModal>
  );
};

TagsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  pointId: PropTypes.string.isRequired,
};

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* justify-content: space-around; */
  /*
    TODO: test this idea
  */
  /*
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-auto-rows: auto auto auto auto auto;
  grid-template-areas:
    "badge1 badge2 badge3 . ."
    ". badge4 badg5 bade6 ."
  */
`;

const StyledModal = styled(Modal)``;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const MyBadge = styled(Badge)`
  height: 16px;
  margin: 8px;
`;

export default TagsModal;
