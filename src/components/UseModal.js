import { useState } from "react";

const UseModal = () => {
  const [addBmShowing, setIsShowing] = useState(false);
  const [updateBmShowing, setUpdateBmShowing] = useState(false);

  function toggle() {
    setIsShowing(!addBmShowing);
  }

  function taggle() {
    setUpdateBmShowing(!updateBmShowing);
  }

  return {
    addBmShowing,
    updateBmShowing,
    toggle,
    taggle
  };
};

export default UseModal;
