import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const socialLinks = [
    {
      icon: "fab fa-github",
      url: "https://github.com/muzhiwa",
      label: "GitHub",
    },
    {
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/in/muzhda-wafa-b78582321",
      label: "LinkedIn",
    },
    {
      icon: "fab fa-instagram",
      url: "https://www.instagram.com/muzhdawafa?igsh=d3htbHc5azY1azM4",
      label: "Instagram",
    },
    {
      icon: "fas fa-envelope",
      url: "mailto:contact@muzhdawafa27@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer-content fade-in">
        <h2>Get in Touch With Us!</h2>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Muzhda Wafa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
