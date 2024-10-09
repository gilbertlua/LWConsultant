import React, { useEffect, useState } from 'react';

const TableList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState(null);

  const handleKeyChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Item/GetItems');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Items Table</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope='col'>Item ID</th>
            <th scope='col'>Description</th>
            <th scope='col'>Pasal</th>
            <th scope='col'>PDF URL</th>
            <th scope='col'>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.description}</td>
              <td>{item.pasal}</td>
              <td >
                <a href={item.urlPDF} target="_blank" rel="noopener noreferrer">
                  {<>File PDF</>}
                </a>
              </td>
              <td>
                {item.keywords.length > 0 ? item.keywords.join(', ') : 'None'}
                
                <br/>

                <div className='keyadder'>
                    <input
                        type="text"
                        className="form-control"
                        id="keyword"
                        name="keyword"
                        onChange={handleKeyChange}
                        placeholder="Tambah Keyword"
                        required
                    />
                    <button className='btn btn-primary'>Add</button>
                </div>
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
