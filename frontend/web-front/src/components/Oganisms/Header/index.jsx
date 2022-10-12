import React from "react";
import './index.css';
/*import styled from "styled-components";*/
import logo from '../../../img/Social_Style_Diagnosis_1.svg';
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faLine, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

// tmp_header
/*const Head = styled.header`
  width: 100%;
  height: 70px;
  background-color: #DF7919;
  position: fixed;
  z-index: 1;
`;*/

const Header = () => {
  const navigate = useNavigate();
  return (
      <header>
        <div className="logo">
          <img src={logo} alt="CheerCareer_Logo" />
        </div>
        <div className="page">
          <div onClick = {() => navigate("/")}>
            &emsp;Top&emsp;
          </div>
          <div onClick = {() => navigate("/past_result")}>
            Past Results
          </div>
          <div onClick = {() => navigate("/diagnosis")}>
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
      </header>
  );
};

export default Header;
