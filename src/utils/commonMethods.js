export const observeWindow = (popup, onClose) => {
  const intervalId = setInterval(() => {
    if (popup.closed) {
      clearInterval(intervalId);
      onClose();
    }
  }, 100);
};

export const popupWindow = (url, title, w = 400, h = 500) => {
  var left = window.screen.width / 2 - w / 2;
  var top = window.screen.height / 2 - h / 2;
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  );
};
