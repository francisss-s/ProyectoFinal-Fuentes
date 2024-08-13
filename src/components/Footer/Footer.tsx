import './Footer.css';

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-title">Mercadito</p>
                <div className="footer-social">
                    <ul className="footer-social-list">
                        <li className="footer-social-item"><a href="#" className="footer-social-link">Facebook</a></li>
                        <li className="footer-social-item"><a href="#" className="footer-social-link">Instagram</a></li>
                        <li className="footer-social-item"><a href="#" className="footer-social-link">Twitter</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
