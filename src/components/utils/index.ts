export const detectTouchDevice = (): boolean => {
  const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', 'i');

  return devices.test(navigator.userAgent);
};
