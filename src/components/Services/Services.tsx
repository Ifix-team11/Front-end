import "./Services.css";
import { services } from "./servicesData";
import handIcon from "../../assets/SVG/hand-pointing-down-01.svg";
const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <img src={handIcon} alt="Hand Icon" className="services-icon" />

          <h2 className="services-title">
            خدما<span>تنا</span>
          </h2>
        </div>

        <p className="services-subtitle">
          نقدم مجموعة واسعة من خدمات الصيانة والإصلاح
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />

              <div className="service-overlay"></div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
