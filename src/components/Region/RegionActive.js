/*
  this Component will show the active region
  * list of tags
  * region label and current status indicator
*/
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { singularize } from 'inflected';
import * as TAGS from '../../constants/tags';
import SessionContext from '../../contexts/SessionContext';
import DragContext from '../../contexts/DragContext';

const Variants = ['primary', 'secondary', 'success', 'danger', 'warning'];

function cancelEvents(e) {
  e.preventDefault();
  e.stopPropagation();
}

const RegionActive = ({ region }) => {
  const { session, setSession } = useContext(SessionContext);
  const { setRegion } = useContext(DragContext);
  const currentTags = Object.keys(TAGS[region]);
  let longHoverEvent;
  const [subCategory, setSubCategory] = useState(null);
  let subCategories;
  if (subCategory) {
    subCategories = TAGS[region][subCategory];
  }

  /*
    #####  update the point category  #####
  */

  function updatePoint(pointId, category) {
    const { points } = session;
    const newPoints = points.map(point => {
      if (point.id === pointId) {
        return {
          ...point,
          subCategory: category,
          category: singularize(region).toLowerCase(),
        };
      }
      return point;
    });
    setSession({
      ...session,
      points: newPoints,
    });
  }

  /*
    Categories handlers
  */
  function handleCategoryDragEnter(e) {
    cancelEvents(e);
    e.target.style.padding = '24px';
    const category = e.target.getAttribute('name');
    longHoverEvent = setTimeout(() => {
      setSubCategory(category);
    }, 750);
  }

  function handleCategoryDragLeave(e) {
    cancelEvents(e);
    e.target.style.padding = '16px';
    clearTimeout(longHoverEvent);
  }

  function handleCategoryDragOver(e) {
    cancelEvents(e);
  }

  function handleCategoryDrop(e) {
    cancelEvents(e);
  }

  function renderCategoriesTags(tags) {
    return tags.map(label => {
      const random = Math.floor(Math.random() * 5);
      return (
        <Category
          key={label}
          variant={Variants[random]}
          name={label}
          onDragOver={handleCategoryDragOver}
          onDragEnter={handleCategoryDragEnter}
          onDragLeave={handleCategoryDragLeave}
          onDrop={handleCategoryDrop}
        >
          {label}
        </Category>
      );
    });
  }

  /*
    ########### SubCategories Handlers ##############
  */

  function handleSubCategoryDragEnter(e) {
    cancelEvents(e);
    e.target.style.padding = '24px';
  }
  function handleSubCategoryDragLeave(e) {
    cancelEvents(e);
    e.target.style.padding = '16px';
  }
  function handleSubCategoryDrop(e) {
    cancelEvents(e);
    const pointId = e.dataTransfer.getData('text');
    const targetName = e.target.getAttribute('name');
    updatePoint(pointId, targetName);
    setRegion('');
  }
  function renderSubCategoriesTags(tags) {
    return tags.map(label => {
      const random = Math.floor(Math.random() * 5);
      return (
        <Category
          key={label}
          variant={Variants[random]}
          name={label}
          onDragEnter={handleSubCategoryDragEnter}
          onDragLeave={handleSubCategoryDragLeave}
          onDrop={handleSubCategoryDrop}
        >
          {label}
        </Category>
      );
    });
  }
  /*
    status event handlers
  */
  let statusLongHover;
  function handleStatusDragEnter(e) {
    cancelEvents(e);
    e.target.style.padding = '24px';
    statusLongHover = setTimeout(() => {
      setSubCategory(null);
    }, 1);
  }
  function handleStatusDragLeave(e) {
    cancelEvents(e);
    e.target.style.padding = '16px';
    clearTimeout(statusLongHover);
  }
  /*
    Active Region handlers
  */
  function handleRegionOnDrop(e) {
    cancelEvents(e);
    setRegion('');
  }
  return (
    <RegionActiveView onDrop={handleRegionOnDrop}>
      <CategoryContainer>
        {subCategory
          ? renderSubCategoriesTags(subCategories)
          : renderCategoriesTags(currentTags)}
      </CategoryContainer>
      <Status
        onDragEnter={handleStatusDragEnter}
        onDragLeave={handleStatusDragLeave}
        variant="info"
      >
        {!subCategory ? region : subCategory}
      </Status>
    </RegionActiveView>
  );
};

RegionActive.propTypes = {
  region: PropTypes.string.isRequired,
};

const CategoryContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Category = styled(Alert)`
  padding: 16px;
  flex-basis: 15%;
  margin: 8px;
  transition: all 0.75s;
`;

const Status = styled(Alert)`
  margin: 0;
  width: 8rem;
`;

const RegionActiveView = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

export default RegionActive;
