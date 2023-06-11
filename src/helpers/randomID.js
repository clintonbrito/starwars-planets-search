function randomID() {
  const THIRTY_TWO = 32;
  const SIXTEEN = 16;
  return String(
    Date.now().toString(THIRTY_TWO) + Math.random().toString(SIXTEEN),
  ).replace(/\./g, '');
}

export default randomID;
