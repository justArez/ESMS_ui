import axios from "axios";

const API_BASE_URL = "https://668e540abf9912d4c92dcd67.mockapi.io/events";

// Fetch all events
export const getAllEvents = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Fetch event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw error;
  }
};

// Create a new event
export const createEvent = async (event) => {
  try {
    const response = await axios.post(API_BASE_URL, event);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Update an event
export const updateEvent = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating event with id ${id}:`, error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    throw error;
  }
};

// Fetch event vendor list
export const getEventVendorList = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}/vendors`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching event vendor list for event with id ${id}:`,
      error
    );
    throw error;
  }
};

// Save event vendor list
export const saveEventVendorList = async (id, eventRegisterList) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${id}/vendors`,
      eventRegisterList
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error saving event vendor list for event with id ${id}:`,
      error
    );
    throw error;
  }
};
