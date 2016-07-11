import p2 from 'p2';
import store from '../store';

const fixedTimeStep = 1 / 60;
const physicsToDOMScale = 100;

export function init(dimensions, stepCallback) {
  // create world
  const world = new p2.World({
    gravity : [0,-10],
    broadphase : new p2.SAPBroadphase()
  });

  // create floor
  const floor = new p2.Body({
    position: [0, - (dimensions.height) / physicsToDOMScale]
  });
  floor.addShape(new p2.Plane());
  world.addBody(floor);

  // create character
  const center = (dimensions.width / 2) - (100 / 2);
  const character = new p2.Body({
    mass : 1,
    position: [
      center / physicsToDOMScale,
      0
    ],
    angle:0
  });
  const shape = new p2.Box({
    width: 100/ physicsToDOMScale,
    height: 100 / physicsToDOMScale
  });
  character.addShape(shape);
  world.addBody(character);

  // The loop
  let lastTimeMilliSeconds;
  function update(timeMilliSeconds){
    requestAnimationFrame(update);
    if(lastTimeMilliSeconds){
      const deltaTime = (timeMilliSeconds - lastTimeMilliSeconds) / 1000;
      world.step(fixedTimeStep, deltaTime, 5);
      const x = physicsToDOMScale * (character.interpolatedPosition[0]);
      const y = -physicsToDOMScale * (character.interpolatedPosition[1]) - 50;
      store.setPosition([x, y]);
      store.setAngle(character.interpolatedAngle * 57.2957795);
    }
    lastTimeMilliSeconds = timeMilliSeconds;
  }

  world.on('postStep', stepCallback.bind(null, character));

  requestAnimationFrame(update);
}

