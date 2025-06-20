import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('/api/inventory').then(res => setInventory(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inventory</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Inventory;
