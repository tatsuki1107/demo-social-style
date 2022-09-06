import React from "react";
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faLine, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import logo from '../../img/logo-transparent-cheercareer-white-all.svg';

const Footer = () => {
  return (
    <footer>
		<div className="Footer_info">
			<div className="Cheerlogo">
				<a href="https://cheercareer.jp/?key=6a7db5e4ab924505134940f7b8b0f81ehttps://cheercareer.jp/%3Fkey%3D6a7db5e4ab924505134940f7b8b0f81e?key=6a7db5e4ab924505134940f7b8b0f81e&gclid=CjwKCAjwvNaYBhA3EiwACgndgi5tNtJmPA85IpD-TgKVZW4yHYchxeFObmwE97qUsIYnevK0EZkY7xoCf8QQAvD_BwE" target="_blank">
					<img src={logo} alt="CheerCareer_Logo" />
				</a>
			</div>
			<div className="icon">
				<a href="https://www.facebook.com/cheercareer.jp" target="_blank" className="icon_content">
					<FontAwesomeIcon icon={faFacebook} />
				</a>
				<a href="https://twitter.com/cheer_career" target="_blank" className="icon_content">
					<FontAwesomeIcon icon={faTwitter} />
				</a>
				<a href="https://lin.ee/noVzheP" target="_blank" className="icon_content">
					<FontAwesomeIcon icon={faLine}/>
				</a>
				<a href="https://www.instagram.com/cheer_career/" target="_blank" className="icon_content">
					<FontAwesomeIcon icon={faInstagram}/>
				</a>
				<a href="https://www.youtube.com/channel/UC8b3YGTUXCjtW3OwAjXTx9A/"  target="_blank" className="icon_content">
					<FontAwesomeIcon icon={faYoutube}/>
				</a>
			</div>
		</div>

		<p>Copyright© Cheer Inc. All Rights Reserved.</p>
	</footer>
  );
};

export default Footer;