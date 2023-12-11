import  { useEffect } from "react";


const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;

useEffect(() => {
  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleTimer();
    });
  });
}, []);

const resetTimer = () => {
  if (timer) clearTimeout(timer);
};

const handleTimer = () => {
  timer = setTimeout(() => {
    resetTimer();
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
    logoutAction();
  }, 1000*30*60);
};

const logoutAction = () => {
  localStorage.clear();
  window.location.pathname = "/auth";
};
  return children;
};

export default AppLogout;


