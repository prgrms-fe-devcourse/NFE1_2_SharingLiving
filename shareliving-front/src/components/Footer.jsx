import LogoImage from '../assets/images/logo.png';

const Footer = () => {
    const thisYear = new Date().getFullYear();

    return (
        <footer id="footPrimary">
            <div className="footer-social-area">
                소셜 링크
            </div>

            <div className="footer-logo-area">
                <img className="footer-logo" src={ LogoImage } alt="나누리빙 로고" />
            </div>

            <p className="footer-copyright">Copyright © { thisYear } 나누리빙 All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;