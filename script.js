
const range = n => [...Array(n)].map((v, k) => k);
const random = ({ min, max }) => Math.floor(Math.random() * (1 + max - min)) + min;
const randomArray = arr => arr[random({ min: 0, max: arr.length - 1 })];

const HALF_SQRT3 = Math.sqrt(3) / 2;

class Triangle {
  constructor({ position, color, size, speed }) {
    this.color = color;
    this.size = size / 768 * Math.max(canvas.width, canvas.height);
    this.speed = speed;
    this.position = position;
  }

  update() {
    this.position.y -= this.speed;

    if (this.position.y < -this.size * HALF_SQRT3) {
      this.position.x = random({ min: 0, max: canvas.width });

      this.position.y = canvas.height + this.size * HALF_SQRT3;
    }
  }

  render(ctx) {
    const { x, y } = this.position;
    const ySize = this.size * HALF_SQRT3;

    ctx.beginPath();
    ctx.moveTo(x - this.size, y + ySize);
    ctx.lineTo(x + this.size, y + ySize);
    ctx.lineTo(x, y - ySize);
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();
  }}


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const config = {
  background: '#fff',

  palette: [
  '#a3a3a3',
  '#c2c2c2',
  '#8c8c8c',
  '#616161',
  '#6e6e6e',
  '#f2f2f2',
  '#d4d4d4'],


  size: {
    min: 40,
    max: 70 },


  speed: {
    min: 3,
    max: 5 },


  triangles: 250 };


const triangles = [];

range(config.triangles).forEach(i => {
  const size = random(config.size);
  const speed = random(config.speed);
  const color = randomArray(config.palette);
  const position = {
    x: random({ min: 0, max: window.innerWidth }),
    y: random({ min: 0, max: window.innerHeight }) };


  triangles.push(new Triangle({
    position, color, size, speed }));

});

const render = () => {
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  triangles.forEach(v => v.render(ctx));

  requestAnimationFrame(render);
};

const update = () => {
  triangles.forEach(v => v.update());

  setTimeout(update, 30);
};

render();
update();
