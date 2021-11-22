import getLetter from "./matrixLetter";

const stepsize = 4,
  plane = -100;

export const numOfLetters = 25;
export const getRandomLoc = () => [
  (Math.random() * window.innerWidth) / 2 - window.innerWidth / 4,
  Math.random() * 150 + 50,
  Math.random() * 400 - 150,
];

class Matrix {
  fallStep = 0;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.letters = this.getLetters();
  }
  getLetters = () => {
    const letters = [];
    for (let i = 0; i < numOfLetters; i++)
      letters.unshift(
        getLetter(this.x, this.y, this.z, ((i + 1) * 2) / numOfLetters)
      );
    return letters;
  };

  move = () => {
    // if (this.fallStep > changeLetterinSteps) {
    //   this.letters = this.getLetters();
    //   this.fallStep = 0;
    // }
    this.fallStep++;
    let y;

    this.letters.forEach(letter => {
      y = letter.material.opacity - 0.1;
      if (y < 0) y = 1;
      letter.material.opacity = y;
      y = letter.position.y - stepsize;
      letter.position.set(this.x, y, this.z);
      if (y < plane) letter.visible = false;
      else if (y < 150) letter.visible = true;
    });
    return y > plane;
  };
  setXZ = (a = 0, c = 0) => {
    let y = getRandomLoc();
    this.x = a ? a : y[0];
    this.z = c ? c : y[2];
    y = y[1];
    this.letters.forEach((letter, i) => {
      letter.position.set(this.x, y + 30 * (i + 1) * 0.06, this.z);
    });
  };
}
export default Matrix;
