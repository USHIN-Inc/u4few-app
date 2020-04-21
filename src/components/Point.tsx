/* eslint-disable */
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
import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import DataContext from '../context/DataContext';
import UiContext from '../context/UiContext';

interface PointProps {
  point: {
    id: string;
    content: string;
    region: string;
    category?: string;
    subCategory?: string;
    uid: string;
    username: string;
    hat?: string;
  };
  regionName: string;
}

const Point: React.FC<PointProps> = ({
  point: { id, content, category, subCategory, uid },
  regionName,
}) => {
  // ** gobal state variables **
  const {
    me,
    semscreen: { updatePoint, createPoint, destroyPoint },
  } = useContext(DataContext)!;
  const {
    rim: {
      state: { isEditing, regionActive },
      toggleRegionState,
    },
  } = useContext(UiContext)!;

  // ** local state **

  // this state is for displaying the contentExcerpt or the full
  // content depending on the focused state of the input
  // if the input is focused its been edited and we should
  // show the full content. see contentExcerpt definition below
  const [focused, setFocused] = useState(false);

  // ref used to get next sibling and focus new point on creation
  const pointRef = useRef<HTMLLIElement>(null);

  //  ** computed values **
  const tag = subCategory ? subCategory : category ? category : null;
  let contentExcerpt =
    content.length > 70
      ? `${content.substring(0, 50).trim()}... ${tag ? '- ' + tag : ''}`
      : `${content} ${tag ? '- ' + tag : ''}`;
  if (focused && contentExcerpt !== content) contentExcerpt = content;
  const isDraggable = uid === me.uid && !isEditing;
  const own = me.uid === uid;

  // ** handlers **

  // to stop event propagation and avoid the region from
  // toggling it size
  function handleOnclick(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();
    e.stopPropagation();
  }

  // used to transfer the id of the point and catch that on the
  // onDrop handler of regions and categories
  function handleDragStart(e: React.DragEvent<HTMLElement>): void {
    e.stopPropagation();
    const el = e.target as HTMLDivElement;
    e.dataTransfer.setData('text', el.id);
    // sets the drag image to the partent element so we have a full
    // view of the point text
    e.dataTransfer.setDragImage(el.parentElement!, 0, 0);
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnd(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault();
    // TODO: implement hats drop
    console.log('hey be careful where you drop stuff im here');
  }

  function handleOnFocus(): void {
    setFocused(true);
    if (regionActive !== regionName) {
      toggleRegionState(regionName);
    }
  }

  function handleOnBlur(): void {
    setFocused(false);
    if (content === '') {
      destroyPoint(id);
    }
  }

  // creates new point on Enter keyDown and focus it
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (regionName === 'Focus') return;
      // create new point, and some how pass the focus to it
      createPoint({
        id: uuidv4(),
        content: '',
        region: regionName,
      });

      setTimeout(() => {
        const nextPoint = pointRef.current?.nextSibling?.firstChild?.nextSibling! as HTMLTextAreaElement;
        nextPoint.focus();
      }, 100);
    }
  }

  // this function handles the point value update
  // we no longer need a point input component
  function handlePointChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    updatePoint(id, { content: e.target.value });
  }

  return (
    <ListElement
      ref={pointRef}
      onClick={handleOnclick}
      onDrop={handleDrop}
    >
      <BulletPoint 
        id={id}
        draggable={isDraggable} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
      {own ? (
        <Input
          rows={1}
          value={contentExcerpt}
          onChange={handlePointChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          placeholder={`new ${regionName} point`}
        />
      ) : (
        <Disown>{contentExcerpt}</Disown>
      )}
    </ListElement>
  );
};

const BulletPoint = styled.div`
  background-color: black;
  border-radius: 999px;
  height: 8px;
  width: 8px;
  margin-right: 8px;
  position: relative;
  top: 8px;
  cursor: pointer;
`;

const ListElement = styled.li`
  list-style: none;
  display: flex;
  position: relative;
`;

const Disown = styled.div`
  height: 3.2rem;
  vertical-align: top;
`;

const Input = styled.textarea`
  background: none;
  vertical-align: top;
  height: 3.2rem;
  border: none;
  width: 100%;
  resize: none;
`;

export default Point;
