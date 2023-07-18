import "./App.css";
import Inventory from "./components/Inventory";
// import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import About from "./components/about/About";

// Sources: https://github.com/ginny100/Meta-Front-End-Developer/tree/master/Course%205%20-%20React%20Basics
// Sources: https://www.youtube.com/watch?v=pfYkDwRJFNQ&list=PLqX4M0x0p9cnPwKtIT3ghqYYiqD8uludA&index=4&pp=iAQB
// Sources: https://legacy.reactjs.org/docs/thinking-in-react.html
// Sources: https://chat.openai.com/ [Asking questions for better understanding of the React concepts]
// Sources: https://youtu.be/bbkBuqC1rU4
function App() {
  return (
    <>
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Inventory />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
