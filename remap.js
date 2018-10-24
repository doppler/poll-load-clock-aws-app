const parse = require("date-fns/parse");

module.exports = data => {
  let tm1_enabled,
    tm1_load,
    tm1_timer,
    tm1_backgroundColor,
    tm1_foregroundColor;
  let tm2_enabled,
    tm2_load,
    tm2_timer,
    tm2_backgroundColor,
    tm2_foregroundColor;
  let tm3_enabled,
    tm3_load,
    tm3_timer,
    tm3_backgroundColor,
    tm3_foregroundColor;
  let tm4_enabled,
    tm4_load,
    tm4_timer,
    tm4_backgroundColor,
    tm4_foregroundColor;
  /* eslint-disable */
  let lastLoadName, lastLoadTime;
  let windDir, currentWind;
  let g1, g5, g10, g20;
  let h5, h10, h20, h1;
  let lastUpdate;
  let temp, humidity, heatindex, raininches, windDirString;
  /* eslint-enable */
  let tm1_slots, tm2_slots, tm3_slots, tm4_slots;
  let rest; //eslint-disable-line
  [
    tm1_enabled,
    tm1_load,
    tm1_timer,
    tm1_backgroundColor,
    tm1_foregroundColor,
    tm2_enabled,
    tm2_load,
    tm2_timer,
    tm2_backgroundColor,
    tm2_foregroundColor,
    tm3_enabled,
    tm3_load,
    tm3_timer,
    tm3_backgroundColor,
    tm3_foregroundColor,
    tm4_enabled,
    tm4_load,
    tm4_timer,
    tm4_backgroundColor,
    tm4_foregroundColor,
    lastLoadName,
    lastLoadTime,
    windDir,
    currentWind,
    g1,
    g5,
    g10,
    g20,
    h5,
    h10,
    h20,
    h1,
    lastUpdate,
    temp,
    humidity,
    heatindex,
    raininches,
    windDirString,
    tm1_slots,
    tm2_slots,
    tm3_slots,
    tm4_slots,
    ...rest
  ] = data;

  const loadsFlownToday = lastLoadName;

  const winds = {
    direction: Math.floor(windDir),
    speed: Math.floor(currentWind),
    high_5min: Math.floor(h5),
    high_10min: Math.floor(h10),
    high_20min: Math.floor(h20)
  };

  const weather = {
    temp,
    heatindex,
    windDirString
  };

  const timers = [
    {
      enabled: tm1_enabled.toLowerCase() === "true",
      load: tm1_load,
      time: tm1_timer,
      slots: tm1_slots,
      backgroundColor: tm1_backgroundColor,
      foregroundColor: tm1_foregroundColor
    },
    {
      enabled: tm2_enabled.toLowerCase() === "true",
      load: tm2_load,
      time: tm2_timer,
      slots: tm2_slots,
      backgroundColor: tm2_backgroundColor,
      foregroundColor: tm2_foregroundColor
    },
    {
      enabled: tm3_enabled.toLowerCase() === "true",
      load: tm3_load,
      time: tm3_timer,
      slots: tm3_slots,
      backgroundColor: tm3_backgroundColor,
      foregroundColor: tm3_foregroundColor
    },
    {
      enabled: tm4_enabled.toLowerCase() === "true",
      load: tm4_load,
      time: tm4_timer,
      slots: tm4_slots,
      backgroundColor: tm4_backgroundColor,
      foregroundColor: tm4_foregroundColor
    }
  ].filter(timer => timer.enabled === true);

  const organizedData = {
    timers,
    winds,
    weather,
    loadsFlownToday: Number(loadsFlownToday),
    lastUpdate: parse(lastUpdate),
    prevWindDirections: []
  };
  return organizedData;
};
