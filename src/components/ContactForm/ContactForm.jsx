import cl from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlise';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (name && number) {
      const isContactExists = contacts.some(
        (contact) => contact.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (isContactExists) {
        alert(`Контакт с именем "${name}" уже существует в телефонной книге.`);
        form.reset();
      } else {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        dispatch(addContact(newContact));
        form.reset();
      }
    } else {
      alert('Заповніть будь ласка всі поля.');
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label >Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label >Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={cl.text__Button} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

