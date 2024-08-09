import React, { useState } from 'react';
import axios from 'axios';

function CreateBid() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ description: '' }]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddItem = () => {
    setItems([...items, { description: '' }]);
  };

  const handleItemChange = (index, event) => {
    const newItems = [...items];
    newItems[index].description = event.target.value;
    setItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bids', {
        title,
        items,
        startTime,
        endTime,
        creator: "66b3584e0a4dfe0cfd5ba789"  
      });
      console.log('Bid created:', response.data);
      alert('Bid created successfully');
    } catch (error) {
      console.error('Error creating bid:', error);
      alert('Error creating bid');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a New Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Item {index + 1}:</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={item.description}
              onChange={(event) => handleItemChange(index, event)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Another Item
        </button>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700">Start Time:</label>
          <input
            type="datetime-local"
            className="border rounded w-full py-2 px-3"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time:</label>
          <input
            type="datetime-local"
            className="border rounded w-full py-2 px-3"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Create Bid
        </button>
      </form>
    </div>
  );
}

export default CreateBid;
