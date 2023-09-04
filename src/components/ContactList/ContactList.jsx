
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlise';
import { getContacts, getFilter } from 'redux/selectors';
import cl from '../ContactForm/ContactForm.module.css'

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
   <div>
            <ul>
        {filteredContacts.map((contact) => (
          <li  key={contact.id}>
            {contact.name}: <br />
            {contact.number}
            <button
              className={cl.text__Button}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
        </div>
  );
};

export default ContactList;

