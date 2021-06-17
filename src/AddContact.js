import React from "react";

const AddContact = ({
  contactName,
  contactNumber,
  handleChangeName,
  handleChangeNumber,
  addContact,
}) => {
  return (
    <form>
      <br />
      <label>Name : </label>
      <input value={contactName} onChange={(e) => handleChangeName(e)} />
      <br />
      <label>Number : </label>
      <input value={contactNumber} onChange={(e) => handleChangeNumber(e)} />
      <br />
      <input type="button" value="Add" onClick={(e) => addContact(e)} />
    </form>
  );
};

export default AddContact;
