const PodcastDetailsCard = ( { podcastDetails, podcast }) => {

    return (
        <div className="p-5 mx-auto w-75">
        {podcastDetails.results && (
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={podcastDetails.results[0].artworkUrl600}
              alt="Card Detail"
            />
            <div className="card-body">
              <h5 className="card-title">
                {podcastDetails.results[0].artistName}
              </h5>
              <p className="card-text">
                {`${"Description"}: ${
                  podcast.summary.label
                }`}
              </p>
            </div>
          </div>
        )}
      </div>
    )
};

export default PodcastDetailsCard;