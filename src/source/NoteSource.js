import * as notes from './Notes';

let sounds = {};

for (let i = 0; i < Object.keys(notes).length; i++) {
  sounds[Object.keys(notes)[i]] = Object.values(notes)[i];
}

export default sounds;
