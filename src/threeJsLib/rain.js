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
    if (rainDrops[i * 3 + 1] < -100) {
      velocity[i] = -Math.random();
      rainDrops[i * 3 + 1] = 130 + Math.random() * 20;
    } else {
      velocity[i] -= 0.01;
      rainDrops[i * 3 + 1] += velocity[i];
    }
    rainDrops[i * 3] -= 0.2;
    if (rainDrops[i * 3] < -window.innerWidth / 4)
      rainDrops[i * 3] = window.innerWidth / 4;
  }
};

const createRain = () => {
  const rainGeo = new BufferGeometry();
  const drops = [];
  let y;
  for (let i = 0; i < NUM_OF_DROPS; i++) {
    y = Math.random() * 250 - 100;
    drops.push(
      (Math.random() * window.innerWidth) / 2 - window.innerWidth / 4,
      y,
      Math.random() * 400 - 150
    );
    velocity.push((150 - y) * -0.05);
  }

  rainGeo.setAttribute("position", new Float32BufferAttribute(drops, 3));
  rainDrops = rainGeo.attributes.position.array;
  const rainMaterial = new PointsMaterial({
    color: "whitesmoke",
    size: 0.05,
    transparent: true,
    opacity: 0.3,
  });

  return new Points(rainGeo, rainMaterial);
};
export default createRain;
