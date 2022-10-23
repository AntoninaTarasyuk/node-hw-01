const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.table(parsedData);
    return parsedData;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const contactById = parsedData.find(contact => contact.id === contactId);
    console.table(contactById);
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const contactById = parsedData.find(contact => contact.id === contactId);
    if(!contactById) {return null}
    const newData = parsedData.filter(contact => contact.id !== contactId);
    console.table(newData);
    fs.writeFile(contactsPath, JSON.stringify(newData));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const id = uuidv4();
    parsedData.push({ id, name, email, phone });
    console.table(parsedData);
    fs.writeFile(contactsPath, JSON.stringify(parsedData));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}