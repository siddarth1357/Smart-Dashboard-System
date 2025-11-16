import React, { useState } from 'react';
import { products } from '../data/mockData';

const Products = () => {
  const [productList, setProductList] = useState(products);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sales: 0
  });

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: productList.length + 1,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    setProductList([...productList, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', price: '', stock: '', sales: 0 });
  };

  const deleteProduct = (id) => {
    setProductList(productList.filter(product => product.id !== id));
  };

  const getStockStatus = (stock) => {
    if (stock > 50) return { status: 'In Stock', color: '#4caf50' };
    if (stock > 10) return { status: 'Low Stock', color: '#ff9800' };
    return { status: 'Out of Stock', color: '#f44336' };
  };

  return (
    <div className="products">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Product Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid var(--border)',
            borderRadius: '5px'
          }}
        />
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <tr key={product.id}>
                  <td style={{ fontWeight: '500' }}>{product.name}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2'
                    }}>
                      {product.category}
                    </span>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.sales}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: stockStatus.color + '20',
                      color: stockStatus.color
                    }}>
                      {stockStatus.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Home">Home</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 500px;
          max-width: 90vw;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .modal-header button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Products;