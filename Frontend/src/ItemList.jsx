import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch("http://localhost:8081/item_dtl_mst")
      .then(res => res.json())
      .then(data => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (item_cd) => {
    if (!window.confirm("Delete this item?")) return;

    fetch(`http://localhost:8081/item_dtl_mst/${item_cd}`, {
      method: "DELETE"
    }).then(fetchData);
  };

  return (
    <div className="ios-container">
      <h1 className="ios-title">Item List</h1>

      <div className="ios-card">
        <table className="ios-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.item_cd}>
                <td>{row.item_cd}</td>
                <td>{row.item_nm}</td>
                <td>
                  <button
                    className="ios-btn danger"
                    onClick={() => handleDelete(row.item_cd)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="ios-btn secondary full" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ItemList;