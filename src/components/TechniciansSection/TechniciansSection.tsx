import "./TechniciansSection.css";
import handIcon from "../../assets/SVG/hand-pointing-down-01.svg";
import { technicians } from "./techniciansData";
import { NavLink } from "react-router-dom";

const TechniciansSection = () => {
  return (
    <section className="technicians-section py-5" dir="rtl">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="section-title">
            <img src={handIcon} alt="Hand Icon" className="heading-icon" />
            فنيون محترفون يمكنك الاعتماد عليهم
          </h2>

          <p className="section-subtitle">
            جميع الفنيين مدربون ومعتمدون لضمان أفضل جودة
          </p>

          <div className="role-switch">
            <NavLink
              to="/technicians"
              className={({ isActive }) => (isActive ? "active-btn" : "")}
            >
              فنيون
            </NavLink>

            <NavLink
              to="/companies"
              className={({ isActive }) => (isActive ? "active-btn" : "")}
            >
              شركات
            </NavLink>
          </div>
        </div>

        {/* Cards */}

        <div className="row g-4">
          {technicians.map((technician) => (
            <div key={technician.id} className="col-lg-4 col-md-6">
              <div className="card technician-card">
                <div className="card-body">
                  {/* Top */}

                  <div className="card-top">
                    <div className="technician-profile">
                      <img
                        src={technician.photo}
                        alt={technician.name}
                        className="technician-photo"
                      />

                      <div className="technician-info">
                        <h5>{technician.name}</h5>

                        <p className="specialty">{technician.specialty}</p>

                        <small>{technician.repairs}</small>
                      </div>
                    </div>
                    <div className="rating">
                      <span>{technician.rating}</span>
                      <span className="star">★</span>
                    </div>
                  </div>

                  {/* Bottom */}

                  <div className="card-bottom">
                    <div className="price">
                      يبدأ من
                      <span>{technician.price}</span>
                      جنيه
                    </div>

                    <button type="button" className="btn details-btn">
                      تفاصيل الفني
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechniciansSection;
