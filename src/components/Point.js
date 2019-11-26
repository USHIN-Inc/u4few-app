import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import PointInput from './PointInput';

const Point = ({ id, content }) => {
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
    console.log(e.target);
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

  if (isEditing) {
    return (
      <PointInput
        id={id}
        initialValue={content}
        // onPointInputBlur={handleUpdate}
        handleCancel={handleCancel}
        handleDelete={deletePoint}
        onPointInputSubmit={handleUpdate}
      />
    );
  }

  return (
    <PointView
      className="border rounded"
      id={id}
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      title={content}
    >
      {contentExcerpt}
    </PointView>
  );
};

Point.defaultProps = {
  content: '',
};

Point.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const PointView = styled.div`
  display: inline-block;
  font-size: 0.66rem;
  padding: 8px;
  margin: 2px;
`;

export default Point;
