import "./Home.css";

import Button from "../Button/Button";

import heroImage from "../../assets/images/Hero-Image.png";
import circle from "../../assets/SVG/circle-1.svg";
import userGroup from "../../assets/SVG/user-group.svg";
import money from "../../assets/SVG/money-04.svg";
import repair from "../../assets/SVG/repair.svg";
import searchIcon from "../../assets/SVG/Searsh-icon.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigator = useNavigate();
  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">
          <h1 className="hero-title">
            كل أعطال <span className="blue">منزلك</span>... تُحل
            <br />
            <span className="circle-text">
              في مكان واحد
              <img src={circle} alt="" className="circle-svg" />
            </span>
          </h1>

          <p className="hero-description">
            احجز فنيًا متخصصًا في دقائق لصيانة وإصلاح جميع الأجهزة المنزلية، مع
            خدمة سريعة، أسعار واضحة، وضمان على كل عملية إصلاح.
          </p>

          <div className="hero-buttons">
            <Button text="تسجيل دخول" onClick={()=> navigator('/login')}/>
            <Button text="إنشاء حساب" variant="secondary" onClick={()=>navigator('/register')}/>
          </div>

          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">
                <img src={userGroup} alt="فنيون معتمدون" />
              </div>

              <span>فنيون معتمدون</span>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <img src={money} alt="أسعار شفافة" />
              </div>

              <span>أسعار شفافة</span>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <img src={repair} alt="ضمان على الخدمة" />
              </div>

              <span>ضمان على الخدمة</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Technician" />
        </div>
      </div>
      <div className="search-box">
        <div className="search-title">
          <h3>احجز فني الآن</h3>
          <p>اختر نوع الخدمة التي تحتاجها</p>
        </div>
        <select>
          <option>اختر نوع الجهاز</option>
        </select>
        <select>
          <option>الخدمة</option>
        </select>
        <input type="text" placeholder="الموقع" />

        <button className="search-btn">
          <img src={searchIcon} alt="" />
          <span>ابحث</span>
        </button>
      </div>
      ;
    </section>
  );
}

export default Home;
