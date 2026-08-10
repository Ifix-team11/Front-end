import "./Footer.css";

import logo from "../../assets/SVG/image 8.svg";

import phoneIcon from "../../assets/images/Frame-Phone.png";
import locationIcon from "../../assets/images/Frame-Location.png";
import emailIcon from "../../assets/images/Frame-Email.png";

import whatsappIcon from "../../assets/SVG/logos_whatsapp-icon.svg";
import instagramIcon from "../../assets/SVG/skill-icons_instagram.svg";
import xIcon from "../../assets/SVG/bi_twitter-x.svg";
import tiktokIcon from "../../assets/SVG/arcticons_ticktock-video-wallpaper.svg";

export default function Footer() {
  return (
    <footer className="footer" dir="rtl">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <img className="footer-logo" src={logo} alt="IFIX" />

          <p>
            نقدم خدمات صيانة احترافية للأجهزة المنزلية من خلال فنيين معتمدين، مع
            تجربة حجز سهلة وسريعة.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-column footer-explore">
          <h3>استكشف</h3>

          <nav>
            <a href="/">الرئيسية</a>
            <a href="/store">المتجر</a>
            <a href="/technicians">الفنيين</a>
            <a href="/partners">كن شريكنا</a>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>تواصل معنا</h3>

          <div className="contact-item">
            <span className="contact-icon">
              <img src={locationIcon} alt="" />
            </span>

            <span>شارع الجلالة</span>
          </div>

          <div className="contact-item">
            <span className="contact-icon">
              <img src={emailIcon} alt="" />
            </span>

            <span>info@gmail.com</span>
          </div>

          <div className="contact-item">
            <span className="contact-icon">
              <img src={phoneIcon} alt="" />
            </span>

            <span>+8923212</span>
          </div>
        </div>

        {/* Social */}
        <div className="footer-column footer-social">
          <h3>تابعنا</h3>

          <div className="social-links">
            <a href="#" aria-label="WhatsApp">
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>

            <a href="#" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" />
            </a>

            <a href="#" aria-label="X">
              <img src={xIcon} alt="X" />
            </a>

            <a href="#" aria-label="TikTok">
              <img src={tiktokIcon} alt="TikTok" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
