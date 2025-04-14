// import React, { useState } from "react";
// import "../styles/ReportItem.css";

// const ReportItem = () => {
//   const [itemType, setItemType] = useState("Found");
//   const [handoverOption, setHandoverOption] = useState("keep");
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleToggleItemType = () => {
//     setItemType((prev) => (prev === "Found" ? "Lost" : "Found"));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setUploadedFiles((prev) => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="report-container">
//       <div className="report-box">
//         <h2 className="report-title">Report Item</h2>

//         {/* Row 1: Toggle + Location */}
//         <div className="form-row">
//           <button
//             type="button"
//             className={`toggle-btn ${itemType === "Found" ? "found" : "lost"}`}
//             onClick={handleToggleItemType}
//           >
//             {itemType}
//           </button>
//           <select className="input-field">
//             <option>Select location</option>
//             <option>Location 1</option>
//             <option>Location 2</option>
//             <option>Location 3</option>
//           </select>
//         </div>

//         {/* Row 2: User ID and Name (optional) */}
//         <div className="form-row">
//           <input type="text" placeholder="Enter user ID" className="input-field" />
//           <input type="text" placeholder="Enter name (optional)" className="input-field" />
//         </div>

//         {/* Row 3: Category and Item Name */}
//         <div className="form-row">
//           <select className="input-field">
//             <option>Select category</option>
//             <option>Electronics</option>
//             <option>Clothing</option>
//             <option>Documents</option>
//           </select>
//           <input type="text" placeholder="Enter item name" className="input-field" />
//         </div>

//         {/* Description */}
//         <textarea placeholder="Enter description" className="description-field"></textarea>

//         {/* Date and Time */}
//         <div className="form-row">
//           <input type="date" className="input-field" />
//           <input type="time" className="input-field" />
//         </div>

//         {/* Upload Media */}
//         <div className="upload-box">
//           <label htmlFor="file-upload">⬆ Upload media</label>
//           <input
//             id="file-upload"
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//         </div>

//         {/* Uploaded Files Preview */}
//         <div className="uploaded-files">
//           {uploadedFiles.map((file, index) => (
//             <div className="file-tag" key={index}>
//               <span>{file.name}</span>
//               <button onClick={() => removeFile(index)}>×</button>
//             </div>
//           ))}
//         </div>

//         <hr className="section-divider" />

//         {/* Found Item Extra Fields */}
//         {itemType === "Found" && (
//           <>
//             <div className="handover-options">
//               <label className={`radio-option ${handoverOption === "keep" ? "active" : ""}`}>
//                 <input
//                   type="radio"
//                   name="handover"
//                   value="keep"
//                   checked={handoverOption === "keep"}
//                   onChange={() => setHandoverOption("keep")}
//                 />
//                 Keep it with me
//               </label>

//               <label className={`radio-option ${handoverOption === "security" ? "active" : ""}`}>
//                 <input
//                   type="radio"
//                   name="handover"
//                   value="security"
//                   checked={handoverOption === "security"}
//                   onChange={() => setHandoverOption("security")}
//                 />
//                 Handover to security
//               </label>
//             </div>

//             {handoverOption === "keep" && (
//               <input
//                 type="text"
//                 placeholder="Enter pickup message"
//                 className="input-field full-width"
//               />
//             )}

//             {handoverOption === "security" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter security ID"
//                   className="input-field full-width"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter security name"
//                   className="input-field full-width"
//                 />
//               </>
//             )}
//           </>
//         )}

//         {/* Buttons */}
//         <div className="form-buttons">
//           <button className="cancel-btn">Cancel</button>
//           <button className="submit-btn">Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportItem;
import React, { useState } from "react";
import "../styles/ReportItem.css";

const categoryMap = {
  Electronics: 1,
  Clothing: 2,
  Documents: 3,
};

const ReportItem = () => {
  const [itemType, setItemType] = useState("Found");
  const [handoverOption, setHandoverOption] = useState("keep");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    location: "",
    categoryId: "",
    itemName: "",
    description: "",
    date: "",
    time: "",
    pickupMessage: "",
    securityId: "",
    securityName: "",
  });

  const handleToggleItemType = () => {
    setItemType((prev) => (prev === "Found" ? "Lost" : "Found"));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const dateTime = `${formData.date} ${formData.time}`;
    const payload = {
      userId: parseInt(formData.userId),
      name: formData.name,
      location: formData.location,
      categoryId: parseInt(formData.categoryId),
      itemName: formData.itemName,
      description: formData.description,
      dateLostOrFound: dateTime,
      imageUrl: uploadedFiles.length ? uploadedFiles[0].name : "",
      handoverToSecurity: itemType === "Found" && handoverOption === "security",
      pickupMessage: itemType === "Found" && handoverOption === "keep" ? formData.pickupMessage : null,
      securityId: itemType === "Found" && handoverOption === "security" ? formData.securityId : null,
      securityName: itemType === "Found" && handoverOption === "security" ? formData.securityName : null,
    };

    const endpoint = itemType === "Found" ? "/api/items/found" : "/api/items/lost";

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Item reported successfully!");
      } else {
        alert("Failed to report item.");
      }
    } catch (error) {
      console.error("Error reporting item:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="report-container">
      <div className="report-box">
        <h2 className="report-title">Report Item</h2>

        {/* Row 1: Toggle + Location */}
        <div className="form-row">
          <button
            type="button"
            className={`toggle-btn ${itemType === "Found" ? "found" : "lost"}`}
            onClick={handleToggleItemType}
          >
            {itemType}
          </button>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input-field"
          >
            <option>Select location</option>
            <option>Location 1</option>
            <option>Location 2</option>
            <option>Location 3</option>
          </select>
        </div>

        {/* Row 2: User ID and Name */}
        <div className="form-row">
          <input
            type="text"
            name="userId"
            placeholder="Enter user ID"
            value={formData.userId}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="name"
            placeholder="Enter name (optional)"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        {/* Row 3: Category and Item Name */}
        <div className="form-row">
          <select
            name="categoryId"
            className="input-field"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categoryId: categoryMap[e.target.value],
              }))
            }
          >
            <option>Select category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Documents</option>
          </select>
          <input
            type="text"
            name="itemName"
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleInputChange}
          className="description-field"
        ></textarea>

        {/* Date and Time */}
        <div className="form-row">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        {/* Upload Media */}
        <div className="upload-box">
          <label htmlFor="file-upload">⬆ Upload media</label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Uploaded Files Preview */}
        <div className="uploaded-files">
          {uploadedFiles.map((file, index) => (
            <div className="file-tag" key={index}>
              <span>{file.name}</span>
              <button onClick={() => removeFile(index)}>×</button>
            </div>
          ))}
        </div>

        <hr className="section-divider" />

        {/* Found Item Extra Fields */}
        {itemType === "Found" && (
          <>
            <div className="handover-options">
              <label className={`radio-option ${handoverOption === "keep" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="handover"
                  value="keep"
                  checked={handoverOption === "keep"}
                  onChange={() => setHandoverOption("keep")}
                />
                Keep it with me
              </label>

              <label className={`radio-option ${handoverOption === "security" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="handover"
                  value="security"
                  checked={handoverOption === "security"}
                  onChange={() => setHandoverOption("security")}
                />
                Handover to security
              </label>
            </div>

            {handoverOption === "keep" && (
              <input
                type="text"
                name="pickupMessage"
                placeholder="Enter pickup message"
                value={formData.pickupMessage}
                onChange={handleInputChange}
                className="input-field full-width"
              />
            )}

            {handoverOption === "security" && (
              <>
                <input
                  type="text"
                  name="securityId"
                  placeholder="Enter security ID"
                  value={formData.securityId}
                  onChange={handleInputChange}
                  className="input-field full-width"
                />
                <input
                  type="text"
                  name="securityName"
                  placeholder="Enter security name"
                  value={formData.securityName}
                  onChange={handleInputChange}
                  className="input-field full-width"
                />
              </>
            )}
          </>
        )}

        {/* Buttons */}
        <div className="form-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
