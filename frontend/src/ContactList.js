import React from 'react';

const ContactList = ({ contacts, onEdit, onDelete, onView }) => {
  return (
    <div className="contact-list">
      <h2>Contacts ({contacts.length})</h2>
      
      {contacts.map(contact => (
        <div key={contact.id} className="contact-card">
          <div className="contact-info">
            <h3>{contact.full_name}</h3>
            <p>📧 {contact.email}</p>
            <p>📱 {contact.mobile_phone}</p>
            
            <div className="social-links">
              {contact.social_handles.linkedin && (
                <a href={contact.social_handles.linkedin} target="_blank" rel="noopener noreferrer">
                  💼 LinkedIn
                </a>
              )}
              {contact.social_handles.facebook && (
                <a href={contact.social_handles.facebook} target="_blank" rel="noopener noreferrer">
                  📘 Facebook
                </a>
              )}
              {contact.social_handles.twitter && (
                <a href={contact.social_handles.twitter} target="_blank" rel="noopener noreferrer">
                  🐦 Twitter/X
                </a>
              )}
              {contact.social_handles.instagram && (
                <a href={contact.social_handles.instagram} target="_blank" rel="noopener noreferrer">
                  📷 Instagram
                </a>
              )}
            </div>
          </div>
          
          <div className="contact-actions">
            <button onClick={() => onView(contact)}>View</button>
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)} className="delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;