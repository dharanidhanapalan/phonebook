import { useEffect, useState } from "react";

import contactService from "./services/contactService";

import Filter from "./Filter";
import Contact from "./Contact";
import AddContact from "./AddContact";
import Notification from "./Notification";

const App = () => {
  const [contacts, updateContacts] = useState([]);
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const contactsToShow =
    filterValue.length > 0
      ? contacts.filter((n) => n.name.includes(filterValue))
      : contacts;

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then((res) => {
        updateContacts(res);
      })
      .catch((err) => console.log("Error Occured"));
  }, []);

  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };

  // ADD NEW CONTACT
  const addContact = (e) => {
    e.preventDefault();
    const newContact = {
      name: name,
      number: number,
    };
    if (checkDuplicateContact(newContact)) {
      console.log(newContact);
      contactService
        .addContact(newContact)
        .then((res) => updateContacts(contacts.concat(res)))
        .then(setNotificationMessage("User Added Successfully"))
        .then(
          setTimeout(() => {
            setNotificationMessage("");
          }, 5000)
        );
    }
    setname("");
    setnumber("");
  };

  // DELETE CONTACT
  const deleteContact = (c) => {
    if (window.confirm(`Are you sure you want to delete ${c.name}?`)) {
      contactService
        .removeContact(c.id)
        .then(updateContacts(contacts.filter((contact) => contact.id !== c.id)))
        .then(setNotificationMessage("User Added Successfully"))
        .then(
          setTimeout(() => {
            setNotificationMessage("");
          }, 5000)
        )
        .catch((err) => {
          setNotificationMessage("Error has occured");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        });
    }
  };

  const checkDuplicateContact = (contact) => {
    let existingContact = contacts.find((c) => c.name === contact.name);
    if (existingContact) {
      if (
        window.confirm(
          `${existingContact.name} already exists, do you want to updat his number?`
        )
      )
        contactService
          .updateContact(existingContact.id, contact)
          .then((res) =>
            updateContacts(
              contacts.map((c) => (c.id !== existingContact.id ? c : res))
            )
          );
      return false;
    } else {
      return true;
    }
  };

  const handleChangeName = (e) => {
    setname(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setnumber(e.target.value);
  };

  return (
    <div className="App">
      <Notification message={notificationMessage} type="success" />
      <h3>Phonebook</h3>

      <Filter
        filterValue={filterValue}
        handleChangeFilter={handleChangeFilter}
      />
      <AddContact
        name={name}
        number={number}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        addContact={addContact}
      />
      <h5>Contact List:</h5>
      <ol>
        {contactsToShow.map((c) => (
          <Contact
            key={c.id}
            contact={c}
            deleteContact={() => deleteContact(c)}
          />
        ))}
      </ol>
    </div>
  );
};

export default App;
