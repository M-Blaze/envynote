import { useState } from "react";

export default function useToggle(targetWrapper, targetClass) {
  const [hasShown, setHasShown] = useState(false);

  function toggleOptions(e) {
    let target = e.target;
    if (target.classList.contains(targetClass)) {
      setHasShown(!hasShown);
      return;
    }

    while (target.parentElement) {
      if (target.parentElement.classList.contains(targetWrapper)) {
        setHasShown(true);
        return;
      }
      if (target.parentElement.tagName === "BODY") {
        if (hasShown) {
          setHasShown(false);
        }
        return;
      }
      target = target.parentElement;
    }
  }

  return [hasShown, toggleOptions];
}
