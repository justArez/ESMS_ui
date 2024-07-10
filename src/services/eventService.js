// import axios from "axios";

// const API_BASE_URL = "https://66598fc6de346625136cf421.mockapi.io/events";

// // Lấy tất cả các sự kiện
// export const getAllEvents = async () => {
//   try {
//     const response = await axios.get(API_BASE_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

// // Lấy sự kiện theo ID
// export const getEventById = async (eventId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/${eventId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching event with id ${eventId}:`, error);
//     throw error;
//   }
// };

// // Tạo sự kiện mới
// export const createEvent = async (event) => {
//   try {
//     const response = await axios.post(API_BASE_URL, {
//       ...event,
//       status: "CREATED",
//       createBy: "host",
//       updatedBy: "host",
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating event:", error);
//     throw error;
//   }
// };

// // Cập nhật sự kiện
// export const updateEvent = async (eventId, updateData) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/${eventId}`, {
//       ...updateData,
//       status: "TO_BE_ARRANGED",
//       createBy: "host",
//       updatedBy: "host",
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating event with id ${eventId}:`, error);
//     throw error;
//   }
// };

// // Xóa sự kiện
// export const deleteEvent = async (eventId) => {
//   try {
//     const response = await axios.delete(`${API_BASE_URL}/${eventId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting event with id ${eventId}:`, error);
//     throw error;
//   }
// };

// // Lấy danh sách vendor của sự kiện
// export const getEventVendorList = async (eventId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/${eventId}/vendors`);
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Error fetching event vendor list for event with id ${eventId}:`,
//       error
//     );
//     throw error;
//   }
// };

// // Lưu danh sách vendor của sự kiện
// export const saveEventVendorList = async (eventId, eventRegisterList) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/${eventId}/vendors`,
//       eventRegisterList
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Error saving event vendor list for event with id ${eventId}:`,
//       error
//     );
//     throw error;
//   }
// };

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
