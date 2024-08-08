import React, { useState } from 'react';
import axios from 'axios';

function CreateBid() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ description: '' }]);

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
        creator: '66b3584e0a4dfe0cfd5ba789', // Use actual creator ID
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day later
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Items</label>
          {items.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder={`Item ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Bid
        </button>
      </form>
    </div>
  );
}

export default CreateBid;
