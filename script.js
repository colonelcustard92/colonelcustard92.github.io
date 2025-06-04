document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('starry-night');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  const shootingStars = [];
  let starsVisible = true;
  let starOpacity = 1;

  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }

  function drawStars() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * starOpacity})`;
      ctx.fill();

      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta = -star.delta;
      }
    });

    shootingStars.forEach((shootingStar, index) => {
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(shootingStar.x - shootingStar.vx * 10, shootingStar.y - shootingStar.vy * 10);
      ctx.strokeStyle = `rgba(255, 255, 255, ${starOpacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      shootingStar.x += shootingStar.vx;
      shootingStar.y += shootingStar.vy;

      if (shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
        shootingStars.splice(index, 1);
      }
    });

    if (Math.random() < 0.01 && starsVisible) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        vx: Math.random() * 5 + 2,
        vy: Math.random() * 5 + 2
      });
    }

    // Fade logic
    if (!starsVisible && starOpacity > 0) {
      starOpacity -= 0.01;
    } else if (starsVisible && starOpacity < 1) {
      starOpacity += 0.01;
    }

    requestAnimationFrame(drawStars);
  }

  drawStars();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Toggle button logic
  const toggleButton = document.getElementById('toggle-stars');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      starsVisible = !starsVisible;
    });
  }
});

