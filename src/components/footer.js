import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"
 
import './css/footer.css';

function footer() {
    return (
        <footer>
        <div className="footer-content">
            <h3>JumpTech</h3>
            <p>JumpTech, association of young intellectuals with complementary skills in the world of technology.</p>
            <div className="socials">
                <li><a href="http://twitter.com/JumpTech12"><FontAwesomeIcon className="fa-icon" icon={faTwitter} /></a></li>
                <li><a href="http://www.facebook.com/profile.php?id=100082493706293"><FontAwesomeIcon className="fa-icon" icon={faFacebook} /></a></li>
                <li><a href="https://www.instagram.com/jumptech9/"><FontAwesomeIcon className="fa-icon" icon={faInstagram} /></a></li>
                <li><a href="http://www.github.com/Jumptech1"><FontAwesomeIcon className="fa-icon"  icon={faGithub} /></a></li>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy;2022 JumpTech.</p>
        </div>
    </footer>
    );
}

export default footer;