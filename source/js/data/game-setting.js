const GameSetting = {
  MAX_LEVEL: 10,
  INITIAL_LIVES: 3,
  TIME_LIMIT: 30
};


const isDebugMode = () => {
  const hash = window.location.hash.replace(`#`, ``);
  return hash.toLowerCase() === `debug`;
};

export {GameSetting, isDebugMode};
