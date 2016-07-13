import p2 from 'p2';

const fixedTimeStep = 1 / 60;
const physicsToDOMScale = 100;
const CHARACTER_WIDTH = 100;
const CHARACTER_HEIGHT = 80;

const spikeBodies = [];
let animationFrame = null;

export function init(options) {
  
  let { store, dimensions, spikes, stepCallback, collisionCallback } = options;

  // CREATE WORLD
  const world = new p2.World({
    gravity : [0,-25],
    broadphase : new p2.SAPBroadphase()
  });

  // COLLISION CONSTANTS
  const CHARACTER = Math.pow(2,0),
        SPIKE =  Math.pow(2,1),
        FLOOR = Math.pow(2,2)

  // CREATE FLOOR
  const floor = new p2.Body({
    position: [0, - (dimensions.height) / physicsToDOMScale]
  });

  const floorShape = new p2.Plane();

  floorShape.collisionGroup = FLOOR;
  floorShape.collisionMask = CHARACTER | SPIKE;

  floor.addShape(floorShape);
  world.addBody(floor);

  // CREATE CHARACTER
  const center = (dimensions.width / 2) - (CHARACTER_WIDTH / 2);

  const character = new p2.Body({
    mass : 1,
    fixedRotation: true,
    position: [
      center / physicsToDOMScale,
      -(dimensions.height - (CHARACTER_HEIGHT / 2)) / physicsToDOMScale
    ],
    angle:0
  });

  const shape = new p2.Box({
    width: CHARACTER_WIDTH/ physicsToDOMScale,
    height: CHARACTER_HEIGHT / physicsToDOMScale
  });

  shape.collisionGroup = CHARACTER;
  shape.collisionMask = SPIKE | FLOOR;

  character.addShape(shape);
  world.addBody(character);

  // CREATE BACKGROUND BODY
  const background = new p2.Body({
    position: [0,0],
  });

  const backgroundShape = new p2.Box({
    height: 1,
    width: 1,
  });
  background.addShape(backgroundShape);
  world.addBody(background);

  // CREATE SPIKES
  spikes.forEach((spike, index) => {
    let spikeBody = new p2.Body({
      mass : 0,
      position: [
        (spike.left - 22) / physicsToDOMScale,
        -(dimensions.height - 22) / physicsToDOMScale
      ],
      angle:0
    });

    let spikeShape = new p2.Box({
      width: 44 / physicsToDOMScale,
      height: 44 / physicsToDOMScale
    });

    spikeShape.collisionGroup = SPIKE;
    spikeShape.collisionMask = CHARACTER | FLOOR;

    spikeBody.addShape(spikeShape);
    world.addBody(spikeBody);
    spikeBodies.push(spikeBody);
  });

  // GAME LOOP
  let lastTimeMilliSeconds;
  function update(timeMilliSeconds){
    animationFrame = requestAnimationFrame(update);
    if(lastTimeMilliSeconds){
      // GAME STEP
      const deltaTime = (timeMilliSeconds - lastTimeMilliSeconds) / 1000;
      world.step(fixedTimeStep, deltaTime, 5);

      // TRANSLATE POSITION
      const x = physicsToDOMScale * (character.interpolatedPosition[0]);
      const y = -physicsToDOMScale * (character.interpolatedPosition[1]) - (CHARACTER_HEIGHT / 2);
      const backgroundX = physicsToDOMScale * (background.interpolatedPosition[0]);
      // SET STORE POSITION
      store.setPositions([x, y], backgroundX);
      // SET BACKGROUND POSITION
    }
    lastTimeMilliSeconds = timeMilliSeconds;
  }
  // POST STEP
  world.on('postStep', stepCallback.bind(null, character, spikeBodies, background));
  // COLLISION
  world.on('impact', ({shapeA, shapeB}) => {
    // IF NOT FLOOR IMPACT
    if (shapeA.type === shapeB.type) {
      cancelAnimationFrame(animationFrame);
      collisionCallback();
    }
  });
  // BEGIN
  animationFrame = requestAnimationFrame(update);
}
