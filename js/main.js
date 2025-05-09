import * as mo_MapGenerator from './map_generator.js';
import * as mo_EntiesCreator from './entites_creator.js';


const brick = mo_EntiesCreator.createEntity("brick");
const container = document.querySelector('.game-container');


container.appendChild(brick);
