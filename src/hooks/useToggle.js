import { useState } from "react";

export default function useToggle(popupWrapper, checkCase) {
  const [isShown, setIsShown] = useState(false);

  function showOptions() {
    if (checkCase) {
      console.log("eventlistener added", popupWrapper);
    }

    setIsShown(true);
    document.body.addEventListener("click", closePopupConditionally);
  }

  function hideOptions() {
    if (checkCase) {
      console.log("event listener removed", popupWrapper);
    }

    setIsShown(false);
    document.body.removeEventListener("click", closePopupConditionally);
  }

  function toggleOptions(stateParam) {
    if (checkCase) {
      console.log("toggle", popupWrapper);
    }

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
    if (checkCase) {
      console.log("conditional check", popupWrapper);
      console.log(popupContainer);
    }

    if (popupContainer.contains(target)) {
      return;
    }
    hideOptions();
  }

  return [isShown, toggleOptions, closePopupConditionally];
}
