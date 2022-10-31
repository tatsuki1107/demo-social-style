import React from "react";
import './index.css';
/*import styled from "styled-components";*/
import logo from '../../../img/Social_Style_Diagnosis_1.svg';
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faLine, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="CheerCareer_Logo" />
      </div>
      <div className="page">
        {location.pathname === "/" ?
          <div className="border" onClick={() => navigate("/")}>
            &emsp;Top&emsp;
          </div>
          :
          <div onClick={() => navigate("/")}>
            &emsp;Top&emsp;
          </div>
        }
        {location.pathname === "/past_result" ?
          <div className="border" onClick={() => navigate("/past_result")}>
            Past Results
          </div>
          :
          <div onClick={() => navigate("/past_result")}>
            Past Results
          </div>
        }
        <div onClick={() => navigate("/", window.scroll(0, 850))}>
          Information
        </div>
      </div>
      <div className="hIcon">
        <a href="https://www.facebook.com/cheercareer.jp" target="_blank" className="icon_content">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com/cheer_career" target="_blank" className="icon_content">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://lin.ee/noVzheP" target="_blank" className="icon_content">
          <FontAwesomeIcon icon={faLine} />
        </a>
        <a href="https://www.instagram.com/cheer_career/" target="_blank" className="icon_content">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com/channel/UC8b3YGTUXCjtW3OwAjXTx9A/" target="_blank" className="icon_content">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <div className="CheerCareer">
          CheerCareer
        </div>
      </div>
      <div className="hamburger-menu">
        <input type="checkbox" id="menu-btn-check" />
        <label htmlFor="menu-btn-check" className="menu-btn"><span></span></label>
        <div className="menu-content">
          <ul>
            <li>
              <a onClick={() => navigate("/")}>
                &emsp;Top&emsp;
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/past_result")}>
                Past Results
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/", window.scroll(0, 850))}>
                Information
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/cheercareer.jp" target="_blank" className="icon_content">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/cheer_career" target="_blank" className="icon_content">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://lin.ee/noVzheP" target="_blank" className="icon_content">
                <FontAwesomeIcon icon={faLine} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/cheer_career/" target="_blank" className="icon_content">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UC8b3YGTUXCjtW3OwAjXTx9A/" target="_blank" className="icon_content">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <div className="CheerCareer">
              CheerCareer
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
