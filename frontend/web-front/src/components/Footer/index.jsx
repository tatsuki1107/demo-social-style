import React from "react";
import './index.css'
import logo from '../../img/logo-transparent-cheercareer-white-all.svg';

const Footer = () => {
  return (
    <footer>
		<div className="Cheerlogo">
			<a href="https://cheercareer.jp/?key=6a7db5e4ab924505134940f7b8b0f81ehttps://cheercareer.jp/%3Fkey%3D6a7db5e4ab924505134940f7b8b0f81e?key=6a7db5e4ab924505134940f7b8b0f81e&gclid=CjwKCAjwvNaYBhA3EiwACgndgi5tNtJmPA85IpD-TgKVZW4yHYchxeFObmwE97qUsIYnevK0EZkY7xoCf8QQAvD_BwE" target="_blank">
				<img src={logo} alt="CheerCareer_Logo" />
			</a>
		</div>
		<p>Copyright© Cheer Inc. All Rights Reserved.</p>
	</footer>
  );
};

export default Footer;