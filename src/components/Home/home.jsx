import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPodcastListService } from "../../service/service";

const Home = () => {
  const navigate = useNavigate();

  const [podacastList, setPodcastList] = useState([]);
  const [oldPodcastList, setOldPodcastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textFilter, setText] = useState("");
  const getPodcastlist = () => {
    getPodcastListService().then((response, reject) => {
      if (response) {
        setPodcastList(JSON.parse(response.contents).feed.entry);
        setOldPodcastList(JSON.parse(response.contents).feed.entry);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    getPodcastlist();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (textFilter) {
      const dataFiltered = oldPodcastList.filter(
        (podcast) =>
          podcast["im:artist"].label.includes(textFilter) ||
          podcast["im:name"].label.includes(textFilter)
      );
      setPodcastList(dataFiltered ?? getPodcastlist());
      setLoading(false);
    }
    if (!textFilter) {
      setPodcastList(getPodcastlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilter]);
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
              <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Podcaster</span>
              </nav>
              <form className="form-inline d-flex flex-row-reverse">
                <input
                  className="form-control mr-sm-2 w-25"
                  type="Filter Podcast"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              {Boolean(podacastList?.length) ? (
                <div className="d-flex row p-5">
                  {podacastList.map((podcast, index) => (
                    <div
                      className="col-3 h-50"
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() =>
                        navigate(`/podcast/${podcast.id.attributes["im:id"]}`, {
                          state: { podcast },
                        })
                      }
                    >
                      <div className="card mt-5" style={{ width: "12rem" }}>
                        <img
                          className="rounded-circle"
                          src={podcast["im:image"][2].label}
                          alt="Card"
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {podcast["im:name"].label}
                          </h5>
                          <p className="card-text">
                            {`${"Author"}${podcast["im:artist"].label}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>NOT FOUND</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
