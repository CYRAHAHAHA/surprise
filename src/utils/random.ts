export const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const pick = <T,>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];
