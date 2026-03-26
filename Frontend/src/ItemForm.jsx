import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemForm = () => {
  const [itemCd, setItemCd] = useState("");
  const [itemNm, setItemNm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!itemCd || !itemNm) {
      alert("Enter Item Code and Name");
      return;
    }

    fetch("http://localhost:8081/item_dtl_mst", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_cd: itemCd, item_nm: itemNm })
    }).then(() => {
      setItemCd("");
      setItemNm("");
    });
  };

  return (
    <div className="ios-container">
      <h1 className="ios-title">Item Master</h1>

      <div className="ios-card">
        <input
          className="ios-input"
          placeholder="Item Code"
          value={itemCd}
          onChange={e => setItemCd(e.target.value)}
        />

        <input
          className="ios-input"
          placeholder="Item Name"
          value={itemNm}
          onChange={e => setItemNm(e.target.value)}
        />

        <div className="ios-btn-group">
          <button className="ios-btn primary" onClick={handleSubmit}>
            Submit
          </button>

          <button className="ios-btn secondary" onClick={() => navigate("/list")}>
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;