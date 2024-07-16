import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./Card.scss";
import { getAllEvents } from "../../services/eventService";

const CardList = ({ onEditEvent, formatDate }) => {
  const [events, setEvents] = useState([]);
  const [visibleCards, setVisibleCards] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const loadMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  const handleCardClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div>
      <div className="card-list">
        {events.slice(0, visibleCards).map((item) => (
          <div
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick(item)}
          >
            <Card
              event={item}
              image={item.image}
              title={item.eventName}
              description={item.description}
              startdate={formatDate(item.startDate)}
              onEdit={onEditEvent}
            />
          </div>
        ))}
      </div>
      <div className="clearfix"></div>
      {visibleCards < events.length && (
        <button className="btn-load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CardList;
