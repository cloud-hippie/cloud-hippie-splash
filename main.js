const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let stars = [];
let shards = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Star objects
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    opacity: Math.random(),
  });
}

// Shard objects
for (let i = 0; i < 30; i++) {
  shards.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: 30 + Math.random() * 70,
    angle: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random(),
    color: `rgba(${Math.random()*50}, 0, ${100 + Math.random()*155}, 0.4)`
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fill();
  }

  // Move and draw shards
  for (let shard of shards) {
    ctx.save();
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.angle);
    ctx.fillStyle = shard.color;
    ctx.fillRect(0, 0, shard.length, 2);
    ctx.restore();

    shard.x += Math.cos(shard.angle) * shard.speed;
    shard.y += Math.sin(shard.angle) * shard.speed;

    // Reset if off screen
    if (
      shard.x < -100 || shard.x > canvas.width + 100 ||
      shard.y < -100 || shard.y > canvas.height + 100
    ) {
      shard.x = Math.random() * canvas.width;
      shard.y = Math.random() * canvas.height;
    }
  }

  requestAnimationFrame(draw);
}

draw();