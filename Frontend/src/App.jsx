// import React, { useEffect, useState } from "react";


// const App = () => {
//   const [itemCd, setItemCd] = useState("");
//   const [itemNm, setItemNm] = useState("");
//   const [data, setData] = useState([]);
//   const [selectedItemCd, setSelectedItemCd] = useState(null);

//   // SHOW DATA
//   const fetchData = () => {
//     fetch("http://localhost:8081/item_dtl_mst")
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => console.log(err));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // INSERT
//   const handleSubmit = () => {
//     if (!itemCd || !itemNm) {
//       alert("Enter Item Code and Item Name");
//       return;
//     }

//     fetch("http://localhost:8081/item_dtl_mst", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         item_cd: itemCd,
//         item_nm: itemNm
//       })
//     })
//       .then(() => {
//         fetchData();
//         clearForm();
//       })
//       .catch(err => console.log(err));
//   };

//   // DELETE
//   const handleDelete = () => {
//     if (!selectedItemCd) {
//       alert("Please select a record to delete");
//       return;
//     }

//     fetch(`http://localhost:8081/item_dtl_mst/${selectedItemCd}`, {
//       method: "DELETE"
//     })
//       .then(() => {
//         fetchData();
//         clearForm();
//       })
//       .catch(err => console.log(err));
//   };

//   const clearForm = () => {
//     setItemCd("");
//     setItemNm("");
//     setSelectedItemCd(null);
//   };

//   // ROW CLICK
//   const handleRowClick = (row) => {
//     setItemCd(row.item_cd);
//     setItemNm(row.item_nm);
//     setSelectedItemCd(row.item_cd);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Item Master</h2>

//       <input
//         type="text"
//         placeholder="Item Code"
//         value={itemCd}
//         readOnly={selectedItemCd !== null}   // 🔒 UNEDITABLE
//         onChange={(e) => setItemCd(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Item Name"
//         value={itemNm}
//         onChange={(e) => setItemNm(e.target.value)}
//       />

//       <button onClick={handleSubmit}>Submit</button>
//       <button onClick={fetchData}>Show</button>
//       <button onClick={handleDelete}>Delete</button>

//       <table border="1" style={{ marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>Item Code</th>
//             <th>Item Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr
//               key={row.item_cd}
//               onClick={() => handleRowClick(row)}
//               style={{
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedItemCd === row.item_cd ? "#ccc" : ""
//               }}
//             >
//               <td>{row.item_cd}</td>
//               <td>{row.item_nm}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;



import React, { useEffect, useState } from "react";

const App = () => {
  const [itemCd, setItemCd] = useState("");
  const [itemNm, setItemNm] = useState("");
  const [data, setData] = useState([]);
  const [selectedItemCd, setSelectedItemCd] = useState(null);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8081/item_dtl_mst");
      const result = await res.json();

      // safety check (important)
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ INSERT
  const handleSubmit = async () => {
  if (!itemCd || !itemNm) {
    alert("Enter Item Code and Item Name");
    return;
  }

  try {
    const res = await fetch("http://localhost:8081/item_dtl_mst", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        item_cd: itemCd,
        item_nm: itemNm
      })
    });

    const result = await res.json();
    console.log(result);

    alert("✅ Saved Successfully");  // 👈 ADD THIS

    fetchData();
    clearForm();
  } catch (err) {
    console.log("Insert Error:", err);
  }
};

  // ✅ DELETE
  const handleDelete = async () => {
    if (!selectedItemCd) {
      alert("Please select a record to delete");
      return;
    }

    try {
      await fetch(
        `http://localhost:8081/item_dtl_mst/${selectedItemCd}`,
        {
          method: "DELETE"
        }
      );

      fetchData();
      clearForm();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // ✅ CLEAR FORM
  const clearForm = () => {
    setItemCd("");
    setItemNm("");
    setSelectedItemCd(null);
  };

  // ✅ ROW CLICK
  const handleRowClick = (row) => {
    setItemCd(row.item_cd);
    setItemNm(row.item_nm);
    setSelectedItemCd(row.item_cd);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Item Master</h2>

      <input
        type="text"
        placeholder="Item Code"
        value={itemCd}
        readOnly={selectedItemCd !== null}
        onChange={(e) => setItemCd(e.target.value)}
      />

      <input
        type="text"
        placeholder="Item Name"
        value={itemNm}
        onChange={(e) => setItemNm(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={fetchData}>Show</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={clearForm}>Clear</button>

      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="2">No Data Found</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.item_cd || index}
                onClick={() => handleRowClick(row)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedItemCd === row.item_cd ? "#ccc" : ""
                }}
              >
                <td>{row.item_cd}</td>
                <td>{row.item_nm}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;