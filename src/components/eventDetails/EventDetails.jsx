import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getEventById } from "../../services/eventService";
import "./EventDetails.scss";

const EventDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [activeTab, setActiveTab] = useState("details");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!event) {
      const fetchEventDetails = async () => {
        try {
          const eventData = await getEventById(id);
          setEvent(eventData);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [id, event]);

  if (!event) {
    return <div className="flex-center">Event not found</div>;
  }

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="event-details-page">
      <div className="header w-full flex justify-start">
        <Link to="/home" className="back-button">
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>{" "}
      <div className="tab-content">
        {activeTab === "details" && (
          <div>
            {" "}
            <div className="details-tab">
              <div className="event-image-container">
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="event-image"
                />
              </div>
              <div className="event-details-container">
                <h1 className="event-title">{event.eventName}</h1>
                <div className="event-dates">
                  <p>
                    Ngày bắt đầu: <span>{event.startDate}</span>
                  </p>
                  <p>
                    Ngày kết thúc: <span>{event.endDate || "N/A"}</span>
                  </p>
                </div>
                <div className="event-description">
                  <h2>Thông tin sự kiện</h2>
                  <p>{event.description}</p>
                  <h2>Chi tiết sự kiện</h2>
                  <p>{event.details?.information}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "register" && (
          <div className="register-tab">
            <h2>Thông tin đăng ký</h2>
            {!isRegistered ? (
              <button className="register-button" onClick={handleRegister}>
                Đăng ký
              </button>
            ) : (
              <button className="create-order-button">TẠO ĐƠN HÀNG</button>
            )}
          </div>
        )}
      </div>
      <div className="tabs-section">
        <div className="tab-bar">
          <button
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Thông tin chi tiết
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Thông tin đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
