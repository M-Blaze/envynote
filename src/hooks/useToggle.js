import { useState, useEffect } from "react";

export default function useToggle(popupWrapper, popupTogglerClass) {
  const [isShown, setIsShown] = useState(false);
  function showOptions() {
    setIsShown(true);
    document.body.addEventListener("click", closePopupConditionally, false);
  }

  function hideOptions() {
    setIsShown(false);
    document.body.removeEventListener("click", closePopupConditionally, false);
  }

  function toggleOptions(stateParam) {
    if (isShown || stateParam === "hide") {
      hideOptions();
      return;
    }
    if (!isShown || stateParam === "show") {
      showOptions();
      return;
    }
  }

  function closePopupConditionally(e) {
    const target = e.target;
    const popupContainer = document.getElementById(popupWrapper);
    if (!popupContainer.contains(target)) {
      hideOptions();
      return;
    }
  }
  useEffect(() => {
    return function cleanUp() {
      document.body.click();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isShown, toggleOptions, closePopupConditionally];
}
