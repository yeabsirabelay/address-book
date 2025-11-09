import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import { contactAPI } from './services/api';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContacts();
  }, [searchQuery]);

  const loadContacts = async () => {
    try {
      const response = await contactAPI.getAll(searchQuery);
      setContacts(response.data.results || response.data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingContact(null);
    loadContacts();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        loadContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📒 Address Book</h1>
        <button onClick={() => setShowForm(true)} className="add-contact-btn">
          Add New Contact
        </button>
      </header>

      <SearchBar onSearch={handleSearch} />

      <main>
        {showForm ? (
          <ContactForm
            contact={editingContact}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingContact(null);
            }}s
          />
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(contact) => {
              setEditingContact(contact);
              setShowForm(true);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;