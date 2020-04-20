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
import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import DataContext from '../../context/DataContext';
import Point from '../Point';
import UiContext from '../../context/UiContext';
import RegionContentRuler from '../commons/RegionContentRuler';

const RegionPassive = ({
  points,
  region,
}: {
  points: any[];
  region: string;
}) => {
  // const containerRef = useRef(null);

  const {
    regionActive,
    handlePortal,
    contentFits,
    containerRef,
  } = useRegionPassive({
    region,
    points,
  })!;

  return (
    <RegionPassiveView ref={containerRef}>
      <RegionContentRuler
        callback={handlePortal}
        points={points}
        regionActive={regionActive}
      />
      {contentFits === 'fits' && (
        <ul style={{ width: '100%' }}>
          {points.map(point => (
            <Point point={point} regionName={region} key={point.id} />
          ))}
        </ul>
      )}
      {contentFits === 'overflow' && points.length > 0 && (
        <div>{`${points.length} points, click to expand`}</div>
      )}
    </RegionPassiveView>
  );
};

RegionPassive.propTypes = {
  points: PropTypes.array.isRequired,
  region: PropTypes.string.isRequired,
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
`;

export default RegionPassive;

/* 
  ##### useRegionPassive ####
*/
const useRegionPassive = ({
  region,
  points,
}: {
  region: string;
  points: any[];
}) => {
  const {
    semscreen: { createPoint },
  } = useContext(DataContext)!;
  const {
    rim: {
      state: { regionActive },
    },
  } = useContext(UiContext)!;

  const [preHeight, setPreHeight] = useState<number | null>(null);
  const [contentFits, setContentFits] = useState('loading');
  const containerRef = useRef(null);

  useEffect(() => {
    setContentFits('loading');

    // helper function declaration
    function handlePointCreation() {
      if (
        regionActive === region &&
        points.length === 0 &&
        contentFits !== 'loading'
      ) {
        const id = uuidv4();
        createPoint({
          id,
          content: '',
          region,
        });
        setTimeout(() => {
          const el = document.getElementById(id)
            ?.nextSibling! as HTMLTextAreaElement;
          el.focus();
        }, 100);
      }
    }

    const timerId = setTimeout(() => {
      if (preHeight) {
        const el = containerRef.current! as HTMLDivElement;
        const containerHeigt = el.clientHeight;
        if (preHeight! >= containerHeigt - 32) {
          setContentFits('overflow');
        } else {
          setContentFits('fits');
        }
      }
      handlePointCreation();
    }, 900);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionActive, preHeight]);

  function handlePortal(result: { error?: string; value: number }) {
    if (result.error) {
      console.error(result.error);
      return;
    }
    setPreHeight(result.value);
  }

  const thisActive = regionActive === region;
  return {
    thisActive,
    contentFits,
    regionActive,
    handlePortal,
    containerRef,
  };
};
