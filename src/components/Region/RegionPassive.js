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
  This component will handle showing the small region
  and will show only the small points stuff
*/
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { singularize } from 'inflected';
import renderPoints from './renderPoints';
import SessionContext from '../../contexts/SessionContext';
import PointInput from '../PointInput';

const RegionPassive = ({
  points,
  region,
  pointInput,
  setPointInput,
  isSmall,
}) => {
  const { session, setSession } = useContext(SessionContext);

  // const [pointInput, setPointInput] = useState(null);

  // Starts the Focus region with a pointInput
  if (!pointInput && points.length === 0 && region === 'Focus') {
    setPointInput({
      id: uuidv4(),
      uid: session.uid,
      placeholderContent: 'Tap, type, or paste anywhere...',
      region,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // prevents Focus area from having more that one point
    if (region === 'Focus') {
      return;
    }
    setPointInput({
      id: uuidv4(),
      uid: session.uid,
      placeholderContent: `new ${singularize(region).toLowerCase()}`,
      region,
    });
  }

  /*
    this function saves the point to this region
    useState hook
   */
  function handlePointInputSubmit(e) {
    const { id, content, uid } = e;
    if (content === '') {
      setPointInput(null);
      return;
    }
    setSession({
      ...session,
      points: [
        ...session.points,
        {
          id,
          uid,
          content,
          region,
        },
      ],
    });
    setPointInput(null);
  }

  /*
    there is a requirement so save on blur
    that is currently not the case here
  */
  function handlePointInputBlur(e) {
    e.preventDefault();
    e.stopPropagation();
    const content = e.target.value;

    if (content === '') {
      setPointInput(null);
    }
  }

  function handlePointInputCancel(e) {
    e.stopPropagation();
    setPointInput(null);
  }

  return (
    <RegionPassiveView onClick={handleClick}>
      {!isSmall && renderPoints(points)}
      {pointInput && (
        <PointInput
          id={pointInput.id}
          uid={pointInput.uid}
          region={pointInput.region}
          placeholderContent={pointInput.placeholderContent}
          onPointInputBlur={handlePointInputBlur}
          handleCancel={handlePointInputCancel}
          onPointInputSubmit={handlePointInputSubmit}
        />
      )}
    </RegionPassiveView>
  );
};

RegionPassive.defaultProps = {
  pointInput: null,
};

RegionPassive.propTypes = {
  points: PropTypes.array.isRequired,
  region: PropTypes.string.isRequired,
  pointInput: PropTypes.object,
  setPointInput: PropTypes.func.isRequired,
  isSmall: PropTypes.bool.isRequired,
};

const RegionPassiveView = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 12px;
`;

export default RegionPassive;
