import { useEffect, useState } from "react";
import { logMovies } from "../../service/service";

const Home = () => {
  const [podacastList, setPodcastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textFilter, setText] = useState('');
  const getPodcastlist  = () => {
    logMovies().then((response, reject) => {
        if (response) {
          setPodcastList(JSON.parse(response.contents).feed.entry);
          setLoading(false);
        }
      });
  }
  useEffect(() => {
    getPodcastlist();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (textFilter) {
        const dataFiltered = podacastList.filter((podcast) => podcast["im:artist"].label.includes(textFilter)
          || podcast["im:name"].label.includes(textFilter));
        setPodcastList(dataFiltered ?? getPodcastlist());
        setLoading(false);
    }
    if(!textFilter) {
        setPodcastList(getPodcastlist());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilter])
  return (
    <>
      {loading ? (
        <div className="spinner-border p-5 mx-auto" role="status">
          <span className="sr-only p-5" />
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
                    <div className="col-3 h-50" key={index}>
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
              ) : <div>NOT FOUND</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
