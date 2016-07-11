import { observable } from 'mobx';

class GameStore {
  @observable character = {
    position: [-100, -100],
    angle: 0
  };
  setPosition(position) {
    this.character.position = position;
  }
  setAngle(angle) {
    this.character.angle = angle;
  }
}

export default new GameStore();