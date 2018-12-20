// @param {frame} object, frame to resize into
// @param {given} object, given img to resize
// $result new object with changed img sizes

export default (frame, given) => {
  const [base, heep] = Object.entries(given)
    .sort((current, next) => next.pop() - current.pop())
    .map((it) => it.shift());

  const scale = Math.min(frame[base] / given[base], frame[heep] / given[heep]);

  return {[base]: Math.floor(given[base] * scale), [heep]: Math.floor(given[heep] * scale)};
};
