// import React from 'react';
// import { X } from 'lucide-react';
// import '../styles/FilterPopup.css'; // Use separate file for clarity

// export function FilterPopup({ isOpen, onClose, onApplyFilters }) {
//   if (!isOpen) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container">
//         <button onClick={onClose} className="close-button">
//           <X className="close-icon" />
//         </button>

//         <h3 className="popup-title">Filter Reports</h3>

//         <div className="popup-content">
//           <div className="form-group">
//             <label className="form-label">Category</label>
//             <select className="form-select">
//               <option value="">All Categories</option>
//               <option value="electronics">Electronics</option>
//               <option value="accessories">Accessories</option>
//               <option value="documents">Documents</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Location</label>
//             <select className="form-select">
//               <option value="">All Locations</option>
//               <option value="library">Library</option>
//               <option value="cafeteria">Cafeteria</option>
//               <option value="gym">Gym</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Date Found</label>
//             <input type="date" className="form-input" />
//           </div>

//           <button
//             onClick={() => {
//               onApplyFilters({});
//               onClose();
//             }}
//             className="apply-button"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
