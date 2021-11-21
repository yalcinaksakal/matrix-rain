import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "three";
const NUM_OF_DROPS = 400 * 150;
const velocity = [];
let rainDrops;
export const rain = () => {
  if (!rainDrops) return;
  for (let i = 0; i < NUM_OF_DROPS; i++) {
    if (rainDrops[i * 3 + 1] < 0) {
      velocity[i] = -Math.random() / 5;
      rainDrops[i * 3 + 1] = 60;
    } else {
      velocity[i] -= 0.005;
      rainDrops[i * 3 + 1] += velocity[i];
    }
  }
};

const createRain = () => {
  const rainGeo = new BufferGeometry();
  const drops = [];
  for (let i = 0; i < NUM_OF_DROPS; i++) {
    drops.push(
      Math.random() * 400 - 200,
      Math.random() * 60,
      Math.random() * 150 - 25
    );
    velocity.push(0);
  }

  rainGeo.setAttribute("position", new Float32BufferAttribute(drops, 3));
  rainDrops = rainGeo.attributes.position.array;
  const rainMaterial = new PointsMaterial({
    color: 0xaaaaaa,
    size: 0.05,
    transparent: true,
    opacity: 0.3,
  });

  return new Points(rainGeo, rainMaterial);
};
export default createRain;
