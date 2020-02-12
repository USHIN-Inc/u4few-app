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
/*
  this Component will show the active region
  * list of tags
  * region label and current status indicator
*/
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import * as TAGS from '../../constants/tags';
import DataContext from '../../contexts/DataContext';
import useDebounce from '../../hooks/useDebounce';

function cancelEvents(e) {
  e.preventDefault();
  e.stopPropagation();
}

const RegionActive = ({ region, dispatch }) => {
  const {
    semscreen: { updatePoint },
  } = useContext(DataContext);
  const currentTags = Object.keys(TAGS[region]);
  let longHoverEvent;
  const [category, setCategory] = useState(null);
  let subCategories;
  if (category) {
    subCategories = TAGS[region][category];
  }

  /*
    Categories handlers
  */
  function handleCategoryDragEnter(e) {
    cancelEvents(e);
    e.target.style.padding = '24px';
    const targetName = e.target.getAttribute('name');
    longHoverEvent = setTimeout(() => {
      setCategory(targetName);
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
    const pointId = e.dataTransfer.getData('text');
    const targetName = e.target.getAttribute('name');
    updatePoint(pointId, { category: targetName, subCategory: null, region });
    dispatch({ type: `deactivate${region}` });
  }

  function renderCategoriesTags(tags) {
    return tags.map(label => (
      <Category
        key={label}
        variant="secondary"
        name={label}
        onDragOver={handleCategoryDragOver}
        onDragEnter={handleCategoryDragEnter}
        onDragLeave={handleCategoryDragLeave}
        onDrop={handleCategoryDrop}
      >
        {label}
      </Category>
    ));
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
    updatePoint(pointId, { category, subCategory: targetName, region });
    dispatch({ type: `deactivate${region}` });
  }
  function renderSubCategoriesTags(tags) {
    return tags.map(label => (
      <Category
        key={label}
        variant="secondary"
        name={label}
        onDragEnter={handleSubCategoryDragEnter}
        onDragLeave={handleSubCategoryDragLeave}
        onDrop={handleSubCategoryDrop}
      >
        {label}
      </Category>
    ));
  }
  /*
    status event handlers
  */
  let statusLongHover;
  function handleStatusDragEnter(e) {
    cancelEvents(e);
    e.target.style.padding = '24px';
    statusLongHover = setTimeout(() => {
      setCategory(null);
    }, 500);
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
    const pointId = e.dataTransfer.getData('text');
    updatePoint(pointId, { category: null, subCategory: null, region });
    dispatch({ type: `deactivate${region}` });
  }

  const visible = useDebounce(true, 1000);

  return (
    <RegionActiveView onDrop={handleRegionOnDrop}>
      {visible && (
        <>
          <CategoryContainer>
            {category
              ? renderSubCategoriesTags(subCategories)
              : renderCategoriesTags(currentTags)}
          </CategoryContainer>
          <Status
            onDragEnter={handleStatusDragEnter}
            onDragLeave={handleStatusDragLeave}
            variant="secondary"
          >
            {!category ? region : category}
          </Status>
        </>
      )}
    </RegionActiveView>
  );
};

RegionActive.propTypes = {
  region: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
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
