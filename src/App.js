import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import PodcastDetails from "./components/Details/podcastDetails";
import Episode from "./components/Details/Episode/Episode";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
