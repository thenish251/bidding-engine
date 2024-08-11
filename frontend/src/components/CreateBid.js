import React, { useState } from 'react';
import axios from 'axios';

const CreateBid = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ description: '' }]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [creator, setCreator] = useState(''); 
  
  const handleAddItem = () => {
    setItems([...items, { description: '' }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/bids', { title, items, startTime, endTime, creator });
      alert('Bid created successfully');
    } catch (error) {
      console.error('Error creating bid:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl mb-4">Create Bid</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Bid Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          className="border p-2 mb-4 w-full"
          placeholder="Item Description"
          value={item.description}
          onChange={(e) => {
            const newItems = [...items];
            newItems[index].description = e.target.value;
            setItems(newItems);
          }}
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={handleAddItem}
      >
        Add Item
      </button>
      <input
        type="datetime-local"
        className="border p-2 mb-4 w-full"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border p-2 mb-4 w-full"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        Create Bid
      </button>
    </div>
  );
};

export default CreateBid;
