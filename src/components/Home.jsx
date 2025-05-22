import React from "react";
import { useQuery } from "@apollo/client";
import { get_all_quote } from "../gqloperations/queries";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(get_all_quote);

  if (loading) {
    return (
      <div className="center-align" style={{ marginTop: "12%" }}>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-pink-only">
            <div className="circle-clipper left"><div className="circle"></div></div>
            <div className="gap-patch"><div className="circle"></div></div>
            <div className="circle-clipper right"><div className="circle"></div></div>
          </div>
        </div>
        <h5 className="grey-text text-darken-1" style={{ marginTop: "25px" }}>Loading quotes...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container center-align red-text text-darken-2" style={{ marginTop: "12%" }}>
        <i className="material-icons large pulse">error_outline</i>
        <h5 className="grey-text text-darken-3">Something went wrong. Please try again later.</h5>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h4 className="center-align deep-purple-text text-darken-3">📜 Inspirational Quotes</h4>
      <div className="divider" style={{ margin: "20px 0" }}></div>

      <div className="row">
        {data.quotes.map((quote) => (
          <div key={quote._id} className="col s12 m6 l4">
            <div className="card z-depth-2 hoverable animated fadeIn" style={{ transition: "all 0.3s ease-in-out", marginBottom: "20px" }}>
              <div className="card-content">
                <blockquote>
                  <h6 className="blue-grey-text text-darken-3" style={{ fontStyle: "italic", fontSize: "1rem" }}>
                    “{quote.name}”
                  </h6>
                  <Link to={`/profile/${quote.by._id}`}>
                    <p className="right-align pink-text text-darken-1" style={{ fontWeight: 500, marginTop: "10px" }}>
                      — {quote.by.firstname}
                    </p>
                  </Link>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
