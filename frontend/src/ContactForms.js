import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';

const ContactForm = ({ contact, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_phone: '',
    social_handles: {
      linkedin: '',
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social_')) {
      const socialField = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        social_handles: {
          ...prev.social_handles,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact) {
        await contactAPI.update(contact.id, formData);
      } else {
        await contactAPI.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
      
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mobile Phone:</label>
        <input
          type="tel"
          name="mobile_phone"
          value={formData.mobile_phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="social-handles">
        <h3>Social Handles</h3>
        
        <div className="form-group">
          <label>LinkedIn:</label>
          <input
            type="url"
            name="social_linkedin"
            value={formData.social_handles.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Facebook:</label>
          <input
            type="url"
            name="social_facebook"
            value={formData.social_handles.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Twitter/X:</label>
          <input
            type="url"
            name="social_twitter"
            value={formData.social_handles.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Instagram:</label>
          <input
            type="url"
            name="social_instagram"
            value={formData.social_handles.instagram}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ContactForm;
