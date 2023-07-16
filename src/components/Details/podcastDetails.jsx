import { useEffect, useState } from "react";
import {
  getListOfEpisode,
  getPodcastDetailService,
} from "../../service/service";
import { useLocation, useNavigate } from "react-router-dom";
import { convertMsToTime } from "./utils";
import PodcastDetailsCard from "./podcastDetailCards/podcastDetailCard";

const PodcastDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [podcastDetails, setPodcastDetails] = useState([]);
  const [listOfEpisode, setListOfEpisode] = useState([]);

  const getPodcastDetail = () => {
    getPodcastDetailService(location.state.podcast.id.attributes["im:id"]).then(
      (response, reject) => {
        if (response) {
          setPodcastDetails(JSON.parse(response.contents));
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    getPodcastDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (podcastDetails?.results?.length) {
      setLoading(true);
      getListOfEpisode(location.state.podcast.id.attributes["im:id"]).then(
        (response, reject) => {
          if (response) {
            setListOfEpisode(JSON.parse(response.contents));
            setLoading(false);
          }
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastDetails]);
  return (
    <>
      {loading ? (
        <div className="spinner-border p-5" role="status">
          <span className="sr-only" />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="d-flex flex-row">
            <div className="p-5 mx-auto w-75">
              <PodcastDetailsCard podcastDetails={podcastDetails} podcast={location.state.podcast}/>
            </div>
            <div className="p-5 mx-auto w-75">
              {listOfEpisode.results && (
                <>
                  <div className="p-5 mx-auto w-75">
                    <nav className="navbar navbar-light bg-light">
                      <span className="navbar-brand mb-0 h1">{`${"Episodes:"} ${
                        listOfEpisode.results.length
                      }`}</span>
                    </nav>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfEpisode.results &&
                        listOfEpisode.results.map((episode, index) => (
                          <tr key={index}>
                            <td
                              onClick={() =>
                                navigate(
                                  `/podcast/${
                                    location.state.podcast.id.attributes[
                                      "im:id"
                                    ]
                                  }/episode/${episode.trackName.replaceAll(
                                    " ",
                                    "-"
                                  )}`,
                                  {
                                    state: { episode, podcastDetails, podcast: location.state.podcast},

                                  }
                                )
                              }
                            >
                              {episode.trackName}
                            </td>
                            <td>
                              {new Date(episode.releaseDate).toLocaleString()}
                            </td>
                            <td>{convertMsToTime(episode.trackTimeMillis)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PodcastDetails;
