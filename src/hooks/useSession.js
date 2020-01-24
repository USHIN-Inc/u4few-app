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

import useLocalStorage from './useLocalStorage';
import initialAppState from '../constants/initialState';

export default function useSession() {
  const [session, setSession] = useLocalStorage(
    'session',
    initialAppState.workSpaces[0]
  );

  const {
    me: { points },
  } = session;

  function _updatePointsArray(newPointsArray) {
    setSession({
      ...session,
      me: {
        ...session.me,
        points: newPointsArray,
      },
    });
  }

  function updateUserSettings(textColor, backgroundColor, username) {
    setSession({
      ...setSession,
      me: {
        ...session.me,
        username,
        rimColor: {
          text: textColor,
          background: backgroundColor,
        },
      },
    });
  }

  function putHatOn(pointId, hat) {
    // search for the point
    const point = session.me.points.find(p => p.id === pointId);
    // put hat on
    point.hat = hat;
    // save to array
    const newArray = [...points.filter(p => p.id !== pointId), point];
    // update session
    _updatePointsArray(newArray);
  }

  function createPoint(newPoint) {
    const newArray = [...points, newPoint];
    _updatePointsArray(newArray);
  }

  function updatePoint(pointId, data) {
    // search point
    const point = points.find(p => p.id === pointId);
    // spread data into point to update
    const newPoint = {
      ...point,
      ...data,
    };
    // save new point
    const newPointsArray = points.map(p => {
      if (p.id === pointId) {
        return newPoint;
      }
      return p;
    });
    _updatePointsArray(newPointsArray);
  }

  function destroyPoint(pointId) {
    // filter the points array
    const newPointsArray = points.filter(p => p.id !== pointId);
    // save the new array
    _updatePointsArray(newPointsArray);
  }

  return {
    session,
    setSession,
    me: session.me,
    putHatOn,
    updateUserSettings,
    updatePoint,
    destroyPoint,
    createPoint,
  };
}
