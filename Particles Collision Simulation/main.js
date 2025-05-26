const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 200;

class Particle {
  /**
   * Generates a random particle object.
   *
   * Sets random properties for:
   *   - x: x position between 0 and canvas width
   *   - y: y position between 0 and canvas height
   *   - vx: random x velocity component between -3 and 3
   *   - vy: random y velocity component between -3 and 3
   *   - radius: random radius between 2 and 5
   *   - color: random color between 0 and 360 degrees
   */
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.radius = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  /**
   * Updates the particle's position based on its velocity.
   *
   * If the particle collides with the edge of the canvas, it reverses the
   * direction of the particle by multiplying the velocity component by -1.
   */
  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= canvas.width) {
      this.vx *= -1;
    }

    if (this.y <= 0 || this.y >= canvas.height) {
      this.vy *= -1;
    }
  }

  /**
   * Renders the particle as a filled circle on the canvas.
   *
   * Uses the particle's current position, radius, and color to draw
   * a circular shape on the canvas context.
   */

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Updates the particle's state by moving its position and redrawing it.
   *
   * This method first updates the position of the particle by invoking
   * the `move` method, which adjusts its position based on the current
   * velocity. It then calls the `draw` method to render the particle
   * at its new position on the canvas.
   */

  update() {
    this.move();
    this.draw();
  }
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

/**
 * Draws lines connecting particles closer than 100 pixels
 * to each other.
 */
const connectParticles = () => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 2;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};

/**
 * Recursively animates all particles and draws connecting lines
 * between those that are closer than 100px to each other.
 *
 * This function clears the canvas, updates the state of all particles,
 * and redrawing them at their new positions. It then calls the
 * `connectParticles` method to draw the connecting lines. Finally,
 * it schedules the next animation frame by calling `requestAnimationFrame`.
 */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }

  connectParticles();
  requestAnimationFrame(animate);
}

animate();
