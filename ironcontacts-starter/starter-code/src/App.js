import React, { Component } from 'react';
import contacts from './contacts.json';
import './App.css';
import ContactList from './ContactList';
import SearchField from './SearchField'

class App extends Component {
  // initial state
  state = {
    contacts: contacts.slice(0, 5),
    // this state is for the search
    query: ''
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => {
        return contact.id !== contactId;
      })
    });
  };

  addContact = () => {
    const random = contacts[Math.floor(Math.random() * contacts.length)];

    // checking if in this.state.contacts we already have the random contact
    if (this.state.contacts.find(contact => contact.id === random.id)) {
      // checking if we have not yet added all the contacts
      if (this.state.contacts.length < contacts.length) {
        this.addContact();
      }
      return;
    }
    this.setState({
      contacts: [random, ...this.state.contacts]
    });
  };

  sortByName = () => {
    const sorted = [...this.state.contacts];
    sorted.sort((a, b) => a.name.localeCompare(b.name));

    this.setState({
      contacts: sorted
    });
  };

  sortByPopularity = () => {
    const sorted = this.state.contacts.slice();
    sorted.sort((a, b) => b.popularity - a.popularity);

    this.setState({
      contacts: sorted
    });
  };

  setQuery = query => {
    this.setState({
      query: query
    })
  }

  render() {
    return (
      <div className='App'>

        <h1>IronContacts</h1>

        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
      
        <SearchField
          // query is connected with the value
          query={this.state.query}
          setQuery={this.setQuery}
        />
      {/* ContactList Component */}
        <ContactList
          contacts={this.state.contacts}
          query={this.state.query}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;