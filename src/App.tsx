import { useEffect } from "react";

const App = () => {
  const localStorage = window.localStorage;
  const pathname = window.location.pathname;

  useEffect(() => {
    const removeLocalStorage = () => {
      localStorage.removeItem("name");
      localStorage.removeItem("birth");
    };
    window.addEventListener("beforeunload", removeLocalStorage);
  }, []);

  useEffect(() => {
    if (pathname === "/") return;
    if (!localStorage.getItem("name") || !localStorage.getItem("birth")) {
      window.location.replace("/");
    }
  }, []);

  return <></>;
};
export default App;
