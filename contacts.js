const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const getId = contacts.find((el) => {
      return el.id === String(contactId);
    });
    if (!getId) {
      return null;
    }
    return getId;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const resultById = contacts.findIndex((el) => el.id === String(contactId));
    if (resultById === -1) {
      return null;
    }
    const spliceId = contacts.splice(resultById, 1);

    const contact = contacts.filter((el) => el.id !== String(contactId));
    const reWrite = JSON.stringify(contact, null, 4);
    await fs.writeFile(contactsPath, reWrite);
    return spliceId;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const data = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(data);

    const newContacts = JSON.stringify(contacts, null, 4);
    await fs.writeFile(contactsPath, newContacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
