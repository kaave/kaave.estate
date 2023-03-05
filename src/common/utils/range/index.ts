export function range(end: number): number[] {
  return [...rangeFactory(end)];
}

function* rangeFactory(end: number): Generator<number, void, unknown> {
  for (let i = 0; i < end; i += 1) {
    yield i;
  }
}
