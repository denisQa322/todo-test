import { useCallback } from "react";

function useCleanLocalStorage(
  setTodos: React.Dispatch<React.SetStateAction<any[]>>
) {
  return useCallback(() => {
    localStorage.clear();
    setTodos([]);
  }, []);
}

export default useCleanLocalStorage;
