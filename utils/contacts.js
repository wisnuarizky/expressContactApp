const fs = require('fs');

// membuat folder data jika blm ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika blm ada
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// membaca isi file contacts.json
const loadContact = () => {
  const filebuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(filebuffer);

  return contacts;
};
//

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  return contact;
};
//

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};
//

// menambahkan contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};
//

// cek duplikat nama
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};
//

// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContact = contacts.filter((contact) => contact.nama !== nama);

  saveContacts(filteredContact);
};
//

// ubah contact
const updateContacts = (contactBaru) => {
  const contacts = loadContact();

  // hilangkan contact lama yang namanya sama dengan oldNama
  const filteredContact = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  // hapus oldNama, soalnya mau di push ke contacts.json
  delete contactBaru.oldNama;
  filteredContact.push(contactBaru);
  saveContacts(filteredContact);
};
//

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts };
