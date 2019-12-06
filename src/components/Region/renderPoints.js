import React from 'react';
import Point from '../Point';

const renderPoints = points =>
  points.map(point => (
    <Point
      point={point}
      key={point.id}
      id={point.id}
      content={point.content}
      category={point.category}
      subCategory={point.subCategory}
      uid={point.uid}
      username={point.username}
    />
  ));

export default renderPoints;
