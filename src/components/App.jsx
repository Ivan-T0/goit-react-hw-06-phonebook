import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ContactForm from './ContactForm/ContactForm';
import ContactList from "./ContactList/ContactList";
import Filter from './Filter/Filter';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  name: '',
  number: ''
};

const App = () => {
  const [contacts, setContacts] = useState(INITIAL_STATE.contacts);
  const [filter, setFilter] = useState(INITIAL_STATE.filter);
  const [name, setName] = useState(INITIAL_STATE.name);
  const [number, setNumber] = useState(INITIAL_STATE.number);

  useEffect(() => {
    const contactsLS = localStorage.getItem("contacts");
      const parsedContact = JSON.parse(contactsLS);
      setContacts(parsedContact || []);
  },[])

    
  useEffect(() => {
    if (localStorage.getItem("contacts") !== JSON.stringify(contacts) ||
        localStorage.getItem("filter") !== filter) {
      console.log("componentDidUpdate");
      localStorage.setItem("contacts", JSON.stringify(contacts));
      localStorage.setItem("filter", filter);
    }
  }, [contacts, filter]);

   

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (name && number) {
      const isContactExists = contacts.some((contact) => contact.name.toLowerCase() === name.trim().toLowerCase());

      if (isContactExists) {
        alert(`Контакт с именем "${name}" уже существует в телефонной книге.`);
      } else {
        const newContact = {
          id: nanoid(),
          name: name.trim(),
          number: number.trim(),
        };
        setContacts((prevContacts) => [...prevContacts, newContact]);
        setName("");
        setNumber("");
      }
    }
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <form>
      <ContactForm
        name={name}
        handleInput={handleInput}
        number={number}
        handleButton={handleButton}
      />
      <Filter
        value={filter}
        onChange={changeFilter}
      />
      <ContactList
        contacts={filteredContacts}
        handleDelete={handleDelete}
      />
    </form>
  );
}

export default App;