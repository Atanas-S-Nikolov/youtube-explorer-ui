import { useEffect } from "react";

const useOutsideClick = (ref, callback, ...excludedRefs) => {
  const handleClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
        excludedRefs.forEach(r => {
            if (!r.current.contains(event.target)) {
                callback();
            }
        })
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;