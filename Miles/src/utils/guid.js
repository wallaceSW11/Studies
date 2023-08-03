import { v4 as uuidv4 } from 'uuid';

function newGuid() {
  return uuidv4();
}

export {
  newGuid
}