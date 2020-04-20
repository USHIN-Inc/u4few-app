/* eslint-disable */
import uuidv4 from 'uuid/v4';
import useLocalStorage from './useLocalStorage';
import { initialAppStateV2 } from '../constants/initialState';

interface HatI {
  name: string;
  id: string;
  settings: {
    textColor: string;
    backgroundColor: string;
    hatIndex: number;
    hatColorIndex: number;
  };
  versions: string[];
  history: {
    id: string;
    content: string;
    region: string;
    uid: string;
  }[][];
}

type ChangeHatIconI = (
  id: string,
  hatIndex: number,
  hatColorIndex: number
) => void;

type SwitchSelectedHatI = (id: string) => void;

type CreateHatI = (name: string) => void;

type DestroyHatI = (id: string) => void;

interface UseHatsI {
  hats: HatI[];
  createHat: CreateHatI;
  destroyHat: DestroyHatI;
  selectedHat: HatI;
  setSelectedHat: (hat: HatI) => void;
  switchSelectedHat: SwitchSelectedHatI;
  changeHatIcon: ChangeHatIconI;
}

// NOTE: the selected hat is not on the schema

export default function useHats(): UseHatsI {
  const [hats, setHats] = useLocalStorage('hats', [...initialAppStateV2.hats]);
  const [selectedHat, setSelectedHat] = useLocalStorage('selectedHat', hats[0]);

  const changeHatIcon: ChangeHatIconI = (id, hatIndex, hatColorIndex) => {
    setHats(
      hats.map((h: HatI) => {
        if (h.id === id) {
          return {
            ...h,
            settings: {
              ...h.settings,
              hatIndex,
              hatColorIndex,
            },
          };
        }
        return h;
      })
    );
  };

  const switchSelectedHat: SwitchSelectedHatI = id => {
    const newHat = hats.find((h: HatI) => h.id === id);
    if (!newHat) {
      alert('something went wrong while switching hats');
      return;
    }
    // if at least one point on screen
    if (newHat.history[newHat.history.length - 1].length > 0) {
      //  Add new empty points array to history
      newHat.history.push([]);
      // Add date to versions array
      newHat.versions.push(new Date());
    }
    // save current selected hat state to hats state
    setHats(
      hats.map((h: HatI) => {
        if (h.id === selectedHat.id) {
          return selectedHat;
        }
        return h;
      })
    );
    // setSlected hat to new selected hat
    setSelectedHat(newHat);
  };

  const createHat: CreateHatI = name => {
    // filter to check name is not in use
    const inUse = hats.find((h: HatI) => h.name === name);
    if (inUse) {
      alert('that hat name is already in use');
      return;
    }
    // create a new hat
    const newHat = {
      name,
      id: uuidv4(),
      settings: {
        textColor: '#111',
        backgroundColor: '#eee',
        hatIndex: 0,
        hatColorIndex: 0,
      },
      versions: [new Date()],
      history: [[]],
    };
    setHats([...hats, newHat]);
  };

  const destroyHat: DestroyHatI = id => {
    setHats(hats.filter((h: HatI) => h.id !== id));
  };

  return {
    hats,
    createHat,
    destroyHat,
    selectedHat,
    setSelectedHat,
    switchSelectedHat,
    changeHatIcon,
  };
}

export { UseHatsI, HatI };
