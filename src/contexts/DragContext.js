import { createContext } from 'react';

const DragContext = createContext({
  dragPoint: null,
  setDragPoint: () => {},
  region: '',
  setRegion: () => {},
});

export default DragContext;
