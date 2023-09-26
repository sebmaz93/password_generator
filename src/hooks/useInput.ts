import { FormEvent, useState } from "react";

const useInput = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const {
      type,
      checked,
      value: inputValue,
      name,
    } = e.target as HTMLInputElement;

    setValue((prevState) => {
      if (type === "checkbox") {
        // If trying to uncheck the current checkbox
        if (!checked) {
          // Count how many checkboxes are currently checked
          const checkedCount = Object.values(prevState).filter(
            (val) => val === true
          ).length;

          // If this is the only checkbox that's checked, prevent unchecking
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (checkedCount === 1 && prevState[name] === true) {
            return prevState;
          }
        }
        return {
          ...prevState,
          [name]: checked,
        };
      } else {
        return {
          ...prevState,
          [name]: inputValue,
        };
      }
    });
  };

  return [value, handleChange] as const;
};

export default useInput;
