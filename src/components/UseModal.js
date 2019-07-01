import { useState } from "react";

const UseModal = () => {
  const [addBmShowing, setIsShowing] = useState(false);
  const [updateBmShowing, setUpdateBmShowing] = useState(false);

  function addToggler() {
    setIsShowing(!addBmShowing);
  }

  function updateToggler() {
    setUpdateBmShowing(!updateBmShowing);
  }

  return {
    addBmShowing,
    updateBmShowing,
    addToggler,
    updateToggler
  };
};

export default UseModal;
