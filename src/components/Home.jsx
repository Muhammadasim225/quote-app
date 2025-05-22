import React from "react";
import { useQuery } from "@apollo/client";
import { get_all_quote } from "../gqloperations/queries";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(get_all_quote);

  if (loading) {
    return (
      <div className="center-align" style={{ marginTop: "10%" }}>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
        <h5 className="grey-text text-darken-2" style={{ marginTop: "20px" }}>Loading quotes...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container center-align red-text text-darken-2" style={{ marginTop: "10%" }}>
        <i className="material-icons large">error</i>
        <h5>Something went wrong. Please try again later.</h5>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h4 className="center-align grey-text text-darken-3">📜 Inspirational Quotes</h4>
      <div className="divider" style={{ margin: "20px 0" }}></div>
      
      {data.quotes.map((kk) => (
        <div className="card z-depth-2" key={kk._id} style={{ marginBottom: "25px" }}>
          <div className="card-content">
            <blockquote>
              <h6 className="blue-grey-text text-darken-3" style={{ fontStyle: "italic" }}>
                “{kk.name}”
              </h6>
              <Link to={`/profile/${kk.by._id}`}>
                <p className="right-align blue-text text-darken-2" style={{ fontWeight: 500 }}>
                  — {kk.by.firstname}
                </p>
              </Link>
            </blockquote>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
