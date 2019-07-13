import React from "react";
import { connect } from "react-redux";
import Auth from "./Auth";
import Footer from "./Footer";
// import Link from "next/link";
import "../styles/Landing.css";
import grid from "../../static/img/grid.png";
import list from "../../static/img/list.png";
// import resp from "../../static/img/resp.png";

function Index() {
  // if (account.loggedIn === true) {
  //   Router.push("/start");
  // }

  return (
    <div>
      <div className="section">
        <div className="github">
          <a href="https://github.com/GlowSquid/startpim">
            <img
              width="149"
              height="149"
              className="attachment-full size-full"
              src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149"
              alt="Fork me on Github"
              target="_blank"
              rel="noopener noreferrer"
              data-recalc-dims="1"
            />
          </a>
        </div>
        <h1 className="brand">
          Start<span>PIM</span>
        </h1>
        <p className="brand__tag">Free & secure online bookmarker!</p>
        <div className="auth-card">
          <Auth />
        </div>
        {/* <div className="card"> */}
        <div id="card-1">
          <img src={grid} alt="" />
          {/* <p>Grid-View</p> */}
        </div>
        <div id="card-2">
          <img src={list} alt="" />
          {/* <p>List-View</p> */}
        </div>
        {/* <div id="card-3">
          <img src={resp} alt="" />
        </div> */}
        {/* </div> */}
      </div>
      <div className="section-2">{/* <div className="about">Hoho</div> */}</div>
      <Footer />
    </div>
  );
}

export default connect()(Index);
