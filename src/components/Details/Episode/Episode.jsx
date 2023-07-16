import { useLocation } from "react-router-dom";
import PodcastDetailsCard from "../podcastDetailCards/podcastDetailCard";

const Episode = () => {
  const location = useLocation();

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-row">
          <PodcastDetailsCard
            podcastDetails={location.state.podcastDetails}
            podcast={location.state.podcast}
          />
          <div className="p-5 mx-auto w-75">
            <div className="card" style={{ width: "50rem", height: "35rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  {location.state.episode.trackName}
                </h5>
                <p className="card-text">
                  {location.state.episode.description}
                </p>
                <div className="embed-responsive embed-responsive-21by9">
                  <iframe style={{ width: "50rem" }} className="embed-responsive-item" src={location.state.episode.episodeUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Episode;
