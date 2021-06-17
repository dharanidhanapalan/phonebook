import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addContact = (newContact) => {
  return axios.post(baseUrl, newContact).then((res) => res.data);
};

const updateContact = (existingContact, contact) => {
  return axios
    .put(`${baseUrl}/${existingContact}`, contact)
    .then((res) => res.data);
};

const removeContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, addContact, removeContact, updateContact };
