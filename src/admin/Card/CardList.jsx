
import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Card.scss"; // Import the CSS file for styling
import { getAllEvents } from "../../services/eventService"; // Ensure you have this function in your eventService

const CardList = ({ onEditEvent, formatDate }) => {
  const [events, setEvents] = useState([]);
  const [visibleCards, setVisibleCards] = useState(6);

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

  return (
    <div>
      <div className="card-list">
        {events.slice(0, visibleCards).map((item) => (
          <div key={item.id} style={{ cursor: "pointer" }}>
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
