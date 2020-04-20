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
import uuidv4 from 'uuid/v4';
import useLocalStorage from './useLocalStorage';

interface AgendaItemI {
  id: string;
  text: string;
}

type DestroyAgendaItemI = (id: string) => void;

type CreateAgendaItemI = (text: string) => void;

interface UseAgendaI {
  agendaItems: AgendaItemI[];
  createAgendaItem: CreateAgendaItemI;
  destroyAgendaItem: DestroyAgendaItemI;
}

export default function useAgenda(): UseAgendaI {
  const [agendaItems, setAgendaItems] = useLocalStorage('agendaItems', [
    { id: '1', text: 'Add an Item' },
  ]);

  const createAgendaItem: CreateAgendaItemI = text => {
    setAgendaItems([
      ...agendaItems,
      {
        id: uuidv4(),
        text,
      },
    ]);
  };

  const destroyAgendaItem: DestroyAgendaItemI = id => {
    const newItems = agendaItems.filter((item: AgendaItemI) => item.id !== id);
    setAgendaItems(newItems);
  };

  const agenda = {
    agendaItems,
    createAgendaItem,
    destroyAgendaItem,
  };

  return agenda;
}

export { AgendaItemI, UseAgendaI, DestroyAgendaItemI, CreateAgendaItemI };
