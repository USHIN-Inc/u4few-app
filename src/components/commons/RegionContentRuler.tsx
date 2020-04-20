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

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

interface PortalProps {
  callback: ({error, value}: {error: null | string, value?: number }) => void;
  regionActive: string;
  points: { id: string, content: string }[];
}

export default function RegionContentRuler({ callback, regionActive, points }: PortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if (portalRef.current) {
      const contentHeight = portalRef.current.clientHeight;
      callback({ error: null, value: contentHeight });
    }
  }, [regionActive])

  const rootEl = document.getElementById('app');

  if(!rootEl) {
    return callback({ error: 'root element not found' });
  }

  return ReactDOM.createPortal(
    <PortalView ref={portalRef} id="portal">
        <List>
          {points.map(point => (
            <div key={point.id}>
              {point.content}
            </div>
          ))}
        </List>
    </PortalView>,
    rootEl
  );
}

const List = styled.ul`
  width: '30vw';
  color: white;
  >div {
    height: 3.2rem;
  }
`;

const PortalView = styled.div`
  z-index: 1;
  position: absolute;
  top: 5rem;
  left: 5rem;
`;
