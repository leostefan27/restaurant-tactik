import LayoutComponent from "./components/LayoutComponent";
import { CartContext } from "./contexts/CartContext";
import Router from "./Router";

function App() {
  return (
    <>
      <Router />
      <LayoutComponent />
    </>
  );
}

export default App;
