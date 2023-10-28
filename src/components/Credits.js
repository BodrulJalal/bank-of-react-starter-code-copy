/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Credits = (props) => {
  const { credits, accountBalance } = props;
  const [formData, setFormData] = useState({ description: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = formData;
    if (description && amount) {
      const newCredit = {
        id: credits.length + 1, // Generate a unique ID (assuming IDs are sequential integers)
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
      };

      // Call the addCredit function passed as a prop from app.js to update the credits array
      props.addCredit(newCredit);

      // Clear the form fields after adding the new credit
      setFormData({ description: '', amount: '' });
    }
  };

  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>({credit.id}) {credit.amount.toFixed(2)} {credit.description} {date} </li>
    });
  }

  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br/>
        <label htmlFor="description">Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <br/>
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <br />
      <p>Account Balance: ${accountBalance.toFixed(2)}</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;