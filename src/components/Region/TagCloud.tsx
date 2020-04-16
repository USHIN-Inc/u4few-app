/* eslint-disable react/prop-types */
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
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import * as TAGS from '../../constants/tags';
import DataContext from '../../context/DataContext';
import useDebounce from '../../hooks/useDebounce';
import UiContext from '../../context/UiContext';

function cancelEvents(e: any) {
  e.preventDefault();
  e.stopPropagation();
}

const TagCloud: React.FC<{ region: string }> = ({ region }) => {
  const {
    semscreen: { updatePoint },
  } = useContext(DataContext);
  const {
    rim: { toggleRegionState },
  } = useContext(UiContext);
  const currentTags = Object.keys(TAGS[region]);
  let longHoverEvent: ReturnType<typeof setTimeout>;
  const [category, setCategory] = useState<string | null>(null);
  let subCategories;
  if (category) {
    subCategories = TAGS[region][category];
  }

  /*
    Categories handlers
  */
  function handleCategoryDragEnter(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '24px';
    const targetName = el.getAttribute('name');
    longHoverEvent = setTimeout(() => {
      setCategory(targetName);
    }, 750);
  }

  function handleCategoryDragLeave(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '16px';
    clearTimeout(longHoverEvent);
  }

  function handleCategoryDragOver(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
  }

  function handleCategoryDrop(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    const pointId = e.dataTransfer.getData('text');
    const targetName = el.getAttribute('name');
    updatePoint(pointId, { category: targetName, subCategory: null, region });
    toggleRegionState(region);
  }

  function renderCategoriesTags(tags: string[]): React.ReactNodeArray {
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

  function handleSubCategoryDragEnter(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '24px';
  }
  function handleSubCategoryDragLeave(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '16px';
  }
  function handleSubCategoryDrop(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    const pointId = e.dataTransfer.getData('text');
    const targetName = el.getAttribute('name');
    updatePoint(pointId, { category, subCategory: targetName, region });
    toggleRegionState(region);
  }
  function renderSubCategoriesTags(tags: string[]): React.ReactNodeArray {
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
  let statusLongHover: ReturnType<typeof setTimeout>;
  function handleStatusDragEnter(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '24px';
    statusLongHover = setTimeout(() => {
      setCategory(null);
    }, 500);
  }
  function handleStatusDragLeave(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const el = e.target as HTMLDivElement;
    el.style.padding = '16px';
    clearTimeout(statusLongHover);
  }
  /*
    Active Region handlers
  */
  function handleRegionOnDrop(e: React.DragEvent<HTMLDivElement>) {
    cancelEvents(e);
    const pointId = e.dataTransfer.getData('text');
    updatePoint(pointId, { category: null, subCategory: null, region });
    toggleRegionState(region);
  }

  const visible = useDebounce(true, 1000);

  return (
    <TagCloudView onDrop={handleRegionOnDrop}>
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
    </TagCloudView>
  );
};

// TagsCloud.propTypes = {
//   region: PropTypes.string.isRequired,
// };

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

const TagCloudView = styled.div`
  text-align: center;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

export default TagCloud;
