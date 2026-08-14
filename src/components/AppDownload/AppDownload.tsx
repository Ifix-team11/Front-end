import "./AppDownload.css";

import huaweiIcon from "../../assets/SVG/Vector.svg";
import googleIcon from "../../assets/SVG/Google Play logo.svg";
import appleIcon from "../../assets/SVG/Apple logo.svg";

export default function AppDownload() {
  return (
    <section className="app-download">
      <div className="app-download-box">
        {/* Content */}
        <div className="app-download-content">
          <h2>حمّل تطبيق IFIX</h2>

          <p>احجز الخدمات بسهولة من تطبيقنا المتوفر على Android و iOS</p>

          {/* Store Badges */}
          <div className="app-download-badges">
            <a
              href="#app-gallery"
              className="app-download-badge app-download-gallery"
            >
              <span className="app-download-huawei-icon">
                <img src={huaweiIcon} alt="Huawei AppGallery" />
              </span>

              <span>
                <small>EXPLORE IT ON</small>
                <strong>AppGallery</strong>
              </span>
            </a>

            <a
              href="#google-play"
              className="app-download-badge app-download-google"
            >
              <span className="app-download-play-icon">
                <img src={googleIcon} alt="Google Play" />
              </span>

              <span>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </a>

            <a
              href="#app-store"
              className="app-download-badge app-download-apple"
            >
              <span className="app-download-apple-icon">
                <img src={appleIcon} alt="App Store" />
              </span>

              <span>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
          </div>
        </div>

        {/* Phone Mockups */}
        <div className="app-download-phone-preview" aria-hidden="true">
          <div className="app-download-phone app-download-phone-one" />
          <div className="app-download-phone app-download-phone-two" />
        </div>
      </div>
    </section>
  );
}
