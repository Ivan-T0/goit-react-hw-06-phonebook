import cl from '../ContactForm/ContactForm.module.css'
import PropTypes from 'prop-types';
const ContactList = ({ contacts, handleDelete }) => {
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}, {contact.number}
            <button className={cl.text__Button} type="button" onClick={() => handleDelete(contact.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
    handleDelete: PropTypes.func,
    
}