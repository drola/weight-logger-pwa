export function weightsRange(weights: number[]): [number, number] {
  let weightMin = 0.0;
  let weightMax = 0.0;
  if (weights.length > 0) {
    weightMin = Math.min(...weights);
    weightMax = Math.max(...weights);
  }

  const minWeightSpan = 2;
  const weightSpanPadding = Math.max(
    0,
    minWeightSpan - (weightMax - weightMin)
  );
  weightMin -= weightSpanPadding / 2;
  weightMax += weightSpanPadding / 2;

  return [weightMin, weightMax];
}
