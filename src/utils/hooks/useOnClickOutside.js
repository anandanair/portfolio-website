import { useEffect } from "react";

export default function useOnClickOutside(ref, handler, open) {
  useEffect(() => {
    let listener;
    if (!open) {
      listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
    return () => {
      if (listener) {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    };
  }, [ref, handler, open]);
}
