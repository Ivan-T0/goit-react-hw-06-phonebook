import cl from './ContactForm.module.css'
import PropTypes from 'prop-types';
const ContactForm = ({ name, handleInput, number, handleButton }) => {
return(<div>
          <label htmlFor="name">Name</label>
  <input
   
            onChange={handleInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
          />

          <label htmlFor="number">Phone</label>
          <input
            onChange={handleInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
  />
  <button className={cl.text__Button} type="button" onClick={handleButton}>
          Add contact
          </button>
        </div>)
}

export default ContactForm

ContactForm.propTypes = {
  handleButton: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  name: PropTypes.string,
  number: PropTypes.string
}