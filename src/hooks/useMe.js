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
import uuidV4 from 'uuid/v4';
import useLocalStorage from './useLocalStorage';
/*  me schema
    me: {
        username: string,
        setUsername: function,
        uid: string,
    }
*/
const useMe = () => {
  const [me, setMe] = useLocalStorage('me', {
    username: 'anonymous',
    setUsername: () => {},
    uid: uuidV4(),
  });

  function setUsername(newUsername) {
    // here goes any validation for the username
    if (me.username === newUsername) {
      alert('That username is already in use');
      return;
    }
    setMe({ ...me, username: newUsername });
  }

  return { username: me.username, setUsername, uid: me.uid };
};

export default useMe;
