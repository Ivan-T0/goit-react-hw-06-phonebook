import cl from './ContactForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { nanoid } from "nanoid";
import {addContact}  from '../../redux/contactsSlise'

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const handleButton = (e) => {
      e.preventDefault();
      const event = e.currentTarget;
      const name = event.elements.name.value;
      const number = event.elements.number.value

      if (name && number) {
        const isContactExists = contacts.some((contact) => contact.name.toLowerCase() === name.trim().toLowerCase());

        if (isContactExists) {
          alert(`Контакт с именем "${name}" уже существует в телефонной книге.`);
          event.reset()
        } else {
          const newContact = {
          id: nanoid(),
          name: name.trim(),
          number: number.trim(),
        };
          dispatch(addContact(newContact));
          event.reset();
         
        }
      } else {
        alert("Заповніть будь ласка всі поля.");
      }
    };
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        
      />

      <label htmlFor="number">Phone</label>
      <input
        
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        
      />
      <button className={cl.text__Button} type="button" onClick={handleButton}>
        Add contact
      </button>
    </div>
  );
};

export default ContactForm;

