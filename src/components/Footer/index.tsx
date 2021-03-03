import React from 'react';
import logoSrc from '../../assets/rs_school_js.svg';
import './index.scss';

const Footer = () => (
  <div className="footer">
    <a className="logo" href="https://rs.school/react/"><img src={logoSrc} alt="Rs School logo" /></a>
    <a className="github" href="https://github.com/enthusiast17">@enthusiast17, 2020</a>
  </div>
);

export default Footer;
