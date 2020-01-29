import { useState } from "react";

export default function useToggle(popupWrapper) {
  const [isShown, setIsShown] = useState(false);

  function showOptions() {
    setIsShown(true);
    document.body.addEventListener("click", closePopupConditionally);
  }

  function hideOptions() {
    setIsShown(false);
    document.body.removeEventListener("click", closePopupConditionally);
  }

  function toggleOptions() {
    if (isShown) {
      hideOptions();
      return;
    }
    showOptions();
  }

  function closePopupConditionally(e) {
    const target = e.target;
    const popupContainer = document.getElementById(popupWrapper);
    if (popupContainer.contains(target)) {
      return;
    }
    hideOptions();
  }

  return [isShown, toggleOptions, closePopupConditionally];
}
