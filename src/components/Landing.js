import React from "react";
import { connect } from "react-redux";
import Auth from "./Auth";
import Footer from "./Footer";
// import Link from "next/link";
import "../styles/Landing.css";
import grid from "../../static/img/grid.png";
import list from "../../static/img/list.png";
import resp from "../../static/img/resp.png";

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
        <div className="border">
          <h1 className="brand">
            Start<span>PIM</span>
          </h1>
          <p className="brand__tag">Free & secure online bookmarker!</p>
          <div className="auth-card">
            <Auth />
          </div>
          <div className="bullets">
            <p>* Automatically fetch page title & icons</p>
            <p>* Switch between list- or grid-mode</p>
            <p>* Login from any device on any OS</p>
            <p>* No advertisement, no bullshit</p>
            <p>* Delete your account and all bookmarks any time</p>
            <p>* Completely free and open source</p>
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="border">
          <div className="screenshots">
            <h3>Screenshots</h3>
          </div>
          <div className="cards">
            <div className="cards__left">
              <div id="card-1">
                <p>Grid-View</p>
                <img src={grid} alt="" />
              </div>
              <div id="card-2">
                <p>List-View</p>
                <img src={list} alt="" />
              </div>
            </div>
            <div className="cards__right">
              <div id="card-3">
                <p>Mobile View</p>
                <img src={resp} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect()(Index);
