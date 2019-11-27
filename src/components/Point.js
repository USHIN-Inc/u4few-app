import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import PointInput from './PointInput';
import PointView from './PointView';

const Point = ({ id, content, category, uid }) => {
  const { session, setSession } = useContext(SessionContext);
  const [isEditing, setIsEditing] = useState(false);

  function deletePoint(e) {
    e.stopPropagation();
    setSession({
      ...session,
      points: session.points.filter(point => point.id !== id),
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
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  }

  // TODO: check if operation was successful
  function handleDragEnd(e) {
    console.log(e);
  }

  function handleUpdate(e) {
    if (e.content !== content) {
      setSession({
        ...session,
        points: session.points.map(point => {
          if (point.id === e.id) {
            return { ...point, content: e.content };
          }
          return point;
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
        category={category}
        handleCancel={handleCancel}
      />
    );
  }

  return (
    <PointPreview
      className="border rounded"
      id={id}
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      title={content}
    >
      {contentExcerpt}
    </PointPreview>
  );
};

Point.defaultProps = {
  content: '',
};

Point.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  category: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

const PointPreview = styled.div`
  display: inline-block;
  font-size: 1rem;
  padding: 8px;
  margin: 2px;
`;

export default Point;
