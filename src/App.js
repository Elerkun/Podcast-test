import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import PodcastDetails from "./components/Details/podcastDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
          {/* <Route path='/about' component={About} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
