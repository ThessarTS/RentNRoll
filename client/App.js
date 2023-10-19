import { useEffect, useState } from "react";
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Splash />;
  }
  return <Home />;
}
