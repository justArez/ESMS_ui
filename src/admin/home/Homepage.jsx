import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Homepage.scss";
import Navbar from "../Navbar";
import SearchBar from "../Search";
import Footer from "../../components/Footer";
import Shop from "./Shop/Shop";
import CardList from "../Card/CardList";

const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://668e540abf9912d4c92dcd67.mockapi.io/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="div">
      <Navbar />
      <div className="slider-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // Auto-slide every 5 seconds
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="slide-content">
                <div className="image-container">
                  <img src={event.image} alt={event.eventName} />
                </div>
                <div className="text-container">
                  <h1 className="title">{event.eventName}</h1>
                  <p className="description">{event.description}</p>
                  <p className="description">
                    Ngày bắt đầu: <span>{event.startDate}</span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <SearchBar />
    </div>
  );
};

export default Homepage;
