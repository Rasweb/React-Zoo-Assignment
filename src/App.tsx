import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Animal } from "./components/Animal";
import { Animals } from "./components/Animals";
import { ErrorPage } from "./components/ErrorPage";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import "./App.css";

function App() {
  return (
    // <HashRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/animals/" element={<Animals />}></Route>
          <Route path="/animals/:id" element={<Animal />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // {/* </HashRouter> */}
  );
}

export default App;
