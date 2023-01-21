const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contactsOperations = require("./contacts.js");

// console.log(contactsOperations.list);

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

// const { program } = require("commander");
// const readLine = require("readline");
// const fs = require("fs/promisess")
// program.option(
//     " -a, --action <type>",
//     " -i,--id <contact id>",
//     " -n, --name <contact name>",
// )
// program.parse(process.argv);
// const option = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  console.log("action //",action);
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      if (!contact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      break;

    case "add":
      const newContacts = await contactsOperations.addContact(name, email, phone);
      console.table(newContacts);
      break;

    case "remove":
      const editContacts = await contactsOperations.removeContact(id);
      console.log(editContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


invokeAction(argv);
