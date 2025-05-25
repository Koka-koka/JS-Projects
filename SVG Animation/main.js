const svg = document.querySelector("svg");

const NUM_SEGMENTS = 20;
const spacing = 10;
const segments = [];

let t = 0;

// Draw Circles
for (let i = 0; i < NUM_SEGMENTS; i++) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("r", 8);
  circle.setAttribute("fill", `hsl(${(i * 360) / NUM_SEGMENTS}, 50%, 50%)`);
  svg.appendChild(circle);

  segments.push({ el: circle, x: 300, y: 100 });
}

/**
 * Animates a sequence of SVG circles to follow a snake-like movement.
 *
 * The `animate` function adjusts the positions of the SVG circle elements
 * stored in the `segments` array to create a continuous movement resembling
 * a snake. The head of the snake follows a sinusoidal path, while the
 * remaining segments follow the segment ahead, maintaining a constant spacing.
 *
 * The animation is achieved by recursively calling `requestAnimationFrame`.
 */

const animate = () => {
  t += 0.05;

  const headX = 100 + t * 40;
  const headY = 100 + Math.sin(t) * 40;

  segments[0].x = headX;
  segments[0].y = headY;

  // Adjusting the positions of the remaining segments
  for (let i = 1; i < segments.length; i++) {
    const prevSegment = segments[i - 1];
    const segment = segments[i];

    const angle = Math.atan2(
      prevSegment.y - segment.y,
      prevSegment.x - segment.x
    );

    segment.x = prevSegment.x - Math.cos(angle) * spacing;
    segment.y = prevSegment.y - Math.sin(angle) * spacing;
  }

  // Updating the positions of the SVG circle elements
  segments.forEach((segment) => {
    segment.el.setAttribute("cx", segment.x);
    segment.el.setAttribute("cy", segment.y);
  });

  if (t > 10) {
    t = 0;
  }

  requestAnimationFrame(animate);
};

animate();
