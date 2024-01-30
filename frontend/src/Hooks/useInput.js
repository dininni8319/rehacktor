import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  // useState state is an hook that handle simple state, 
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
