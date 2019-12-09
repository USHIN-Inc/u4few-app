import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import DragContext from '../contexts/DragContext';
import PointInput from './PointInput';
import PointView from './PointView';

const Point = ({ point }) => {
  const { id, content, region, category, subCategory, uid, username } = point;
  const { session, setSession } = useContext(SessionContext);
  const { setDragPoint, setRegion } = useContext(DragContext);
  const [isEditing, setIsEditing] = useState(false);

  function deletePoint(e) {
    e.stopPropagation();
    setSession({
      ...session,
      points: session.points.filter(_point => _point.id !== id),
    });
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
    setDragPoint(point);
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  }

  // TODO: check if operation was successful
  function handleDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragPoint(null);
    setRegion('');
  }

  function handleUpdate(e) {
    if (e.content !== content) {
      setSession({
        ...session,
        points: session.points.map(_point => {
          if (_point.id === e.id) {
            return { ..._point, content: e.content };
          }
          return _point;
        }),
      });
    }
    setIsEditing(!isEditing);
  }

  function handleCancel(e) {
    e.stopPropagation();
    setIsEditing(false);
  }

  if (session.uid === uid && isEditing) {
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
  const isDraggable = uid === session.uid;

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
      // className="border rounded"
      id={id}
      draggable={isDraggable}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Text>{contentExcerpt}</Text>
      {subText !== 'focu' && <SubCategoryText>{subText}</SubCategoryText>}
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
  font-size: 1rem;
  padding: 4px;
  margin: 8px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const SubCategoryText = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

export default Point;
