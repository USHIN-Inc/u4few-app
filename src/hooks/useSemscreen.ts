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
import { useState, useEffect, useRef } from 'react';

interface Point {
  id: string;
  content: string;
  region: string;
  category?: string;
  subCategory?: string;
  uid?: string;
  username?: string;
  hat?: string;
}

type PutHatOnI = (pointId: string, hat: string) => void;

type DestroyPointI = (pointId: string) => void;

type UpdatePointI = (pointId: string, data: any) => void;

type CreatePointI = (newPoint: Point) => void;

interface SettingsI {
  textColor?: string;
  backgroundColor?: string;
  hatIndex?: number;
  hatColorIndex?: number;
}

type UpdateSettingsI = (newSettings: SettingsI) => void;

type SwitchHistoryI = (index: number) => void;

interface UseSemscreenI {
  name: string;
  id: string;
  points: Point[];
  putHatOn: PutHatOnI;
  destroyPoint: DestroyPointI;
  updatePoint: UpdatePointI;
  createPoint: CreatePointI;
  settings: SettingsI;
  updateSettings: UpdateSettingsI;
  timeTravel: {
    versions: string[];
    currentPoints: number; // TODO: rename this to something better
    switchHistory: SwitchHistoryI;
    historyLength: number;
  };
}

export default function useSemscreen(
  selectedHat: any,
  setSelectedHat: any,
  me: any
): UseSemscreenI {
  const { settings, name } = selectedHat;
  const [currentPoints, setCurrentPoints] = useState(
    selectedHat.history.length - 1
  );
  const [points, setPoints] = useState(selectedHat.history[currentPoints]);

  // update point array on history modification
  const currentHistory = useRef(selectedHat.id);
  useEffect(() => {
    if (currentHistory.current !== selectedHat.id) {
      currentHistory.current = selectedHat.id;
      setCurrentPoints(selectedHat.history.length - 1);
    }
    if (currentPoints < selectedHat.history.length) {
      setPoints(selectedHat.history[currentPoints]);
    }
  }, [selectedHat.history, currentPoints, selectedHat.id]);

  function _updatePointsArray(newPointsArray: Point[]) {
    const newHistory = selectedHat.history.map((h: Point[], i: number) => {
      if (i === currentPoints) {
        return newPointsArray;
      }
      return h;
    });
    setSelectedHat({
      ...selectedHat,
      history: newHistory,
    });
  }

  const switchHistory: SwitchHistoryI = (index: number) => {
    if (index >= selectedHat.history.length) {
      alert('error');
      return;
    }
    setCurrentPoints(index);
  };

  const putHatOn: PutHatOnI = (pointId, hat) => {
    // search for the point
    const point = points.find((p: Point) => p.id === pointId);
    // put hat on
    point.hat = hat;
    // save new changes
    _updatePointsArray([
      ...points.filter((p: Point) => p.id !== pointId),
      point,
    ]);
  };

  const createPoint: CreatePointI = newPoint => {
    const newArray = [
      ...points,
      { ...newPoint, uid: me.uid, username: me.username },
    ];
    _updatePointsArray(newArray);
  };

  const updatePoint: UpdatePointI = (pointId, data) => {
    // search point
    const point = points.find((p: Point) => p.id === pointId);
    // spread data into point to update
    const newPoint = {
      ...point,
      ...data,
    };
    // save new point
    const newPointsArray = points.map((p: Point) => {
      if (p.id === pointId) {
        return newPoint;
      }
      return p;
    });
    _updatePointsArray(newPointsArray);
  };

  const destroyPoint: DestroyPointI = pointId => {
    // filter the points array
    const newPointsArray = points.filter((p: Point) => p.id !== pointId);
    // save the new array
    _updatePointsArray(newPointsArray);
  };

  const updateSettings: UpdateSettingsI = newSettings => {
    setSelectedHat({
      ...selectedHat,
      settings: {
        ...settings,
        ...newSettings,
      },
    });
  };

  return {
    name,
    id: selectedHat.id,
    points,
    putHatOn,
    destroyPoint,
    updatePoint,
    createPoint,
    settings,
    updateSettings,
    timeTravel: {
      versions: selectedHat.versions,
      currentPoints,
      switchHistory,
      historyLength: selectedHat.history.length,
    },
  };
}

export { UseSemscreenI };
