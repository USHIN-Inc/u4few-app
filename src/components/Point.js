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
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PointInput from './PointInput';
import PointView from './PointView';
import DataContext from '../contexts/DataContext';

const Point = ({
  point: { id, content, region, category, subCategory, uid, username, hat },
}) => {
  const {
    semscreen: { destroyPoint, putHatOn, updatePoint },
    me,
  } = useContext(DataContext);

  const [isEditing, setIsEditing] = useState(false);

  function deletePoint(e) {
    e.stopPropagation();
    destroyPoint(id);
  }

  const contentExcerpt =
    content.length > 8 ? `${content.substring(0, 5).trim()}...` : content;

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(!isEditing);
  }

  // this seems ok, but we can add like a image
  // to represent the point for a ux/ui upgrade
  function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  }

  // handles the dropping of hats
  function handleDrop(e) {
    const hatName = e.dataTransfer.getData('hat');
    putHatOn(id, hatName);
  }

  // TODO: check if operation was successful
  function handleDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleUpdate(e) {
    if (e.content !== content) {
      updatePoint(id, { content: e.content });
    }
    setIsEditing(!isEditing);
  }

  function handleCancel(e) {
    e.stopPropagation();
    setIsEditing(false);
  }

  if (me.uid === uid && isEditing) {
    return (
      <PointInput
        id={id}
        region={region}
        category={category}
        subCategory={subCategory}
        initialValue={content}
        handleCancel={handleCancel}
        handleDelete={deletePoint}
        onPointInputSubmit={handleUpdate}
      />
    );
  }

  if (isEditing) {
    return (
      <PointView
        user={uid}
        content={content}
        region={region}
        category={category}
        subCategory={subCategory}
        handleCancel={handleCancel}
        username={username}
      />
    );
  }
  const isDraggable = uid === me.uid;

  let subText;
  if (subCategory) {
    subText = subCategory;
  } else if (category) {
    subText = category;
  } else {
    subText = region;
  }

  return (
    <PointPreview
      id={id}
      draggable={isDraggable}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {hat && <SubCategoryText>{hat}</SubCategoryText>}
      <Text>{contentExcerpt}</Text>
      <SubCategoryText>{subText}</SubCategoryText>
    </PointPreview>
  );
};

Point.propTypes = {
  point: PropTypes.object.isRequired,
};

const PointPreview = styled.div`
  border-radius: 4px;
  border: 1px solid gray;
  display: flex;
  flex-flow: column;
  padding: 4px;
  margin: 8px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: bold;
`;

const SubCategoryText = styled.p`
  margin: 0;
  font-size: 0.8em;
`;

export default Point;
