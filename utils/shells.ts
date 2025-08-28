export function randomizeShellTopPosition() {
  const randomTop = Math.floor(Math.random() * 100) + 1;
  return `${randomTop}%`;
}

export function randomizeShellLeftPosition() {
  const randomLeft = Math.floor(Math.random() * 100) + 1;
  return `${randomLeft}%`;
}

export function randomizeShellRotate() {
  const randomRotate = Math.floor(Math.random() * 360) + 1;
  return `${randomRotate}deg`;
}

export function randomizeShell() {
  const randomShell = Math.floor(Math.random() * 6) + 1;
  return `/shells/shell${randomShell}.png`;
}
