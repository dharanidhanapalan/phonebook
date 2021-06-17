import React from "react";

const Contact = ({ contact, deleteContact }) => {
  // console.log(contact);
  return (
    <>
      <li>
        <p>
          {contact.name} {contact.number}
        </p>
        <input type="button" value="delete" onClick={deleteContact} />
      </li>
    </>
  );
};

export default Contact;
