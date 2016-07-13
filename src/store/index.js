import { observable } from 'mobx';

class GameStore {
  
  @observable character = {
    position: [-100, -100],
    angle: 0
  };

  @observable backgroundX = 0;

  setPositions(position, backgroundX) {
    this.character.position = position;
    this.backgroundX = backgroundX;
  }

}

export default GameStore;
