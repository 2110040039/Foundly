import React, { useState, useEffect } from 'react';
import '../styles/ClaimModal.css';

const ClaimModal = ({ itemId, requesterId: initialRequesterId, onClose }) => {
  const [requesterId, setRequesterId] = useState(initialRequesterId || '');
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialRequesterId) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.userId) {
        setRequesterId(user.userId);
      }
    } else {
      setRequesterId(initialRequesterId);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.employeeId) setEmployeeId(user.employeeId);
    if (user?.name) setName(user.name);
  }, [initialRequesterId]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const base64Photo = await convertToBase64(photoFile);

      const claimData = {
        requesterId,
        employeeId,
        name,
        photo: base64Photo,
        description,
        itemId,
      };

      const response = await fetch('http://localhost:8080/api/transactions/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      if (!response.ok) throw new Error('Failed to submit claim');

      alert('Claim submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="claim-modal-overlay">
      <div className="claim-modal">
        <h2>Claim Found Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item ID:
            <input type="text" value={itemId} disabled readOnly />
          </label>

          <label>
            Requester ID:
            <input type="text" value={requesterId} disabled readOnly />
          </label>

          <label>
            Employee ID:
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </label>

          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Upload Proof Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              required
            />
          </label>

          <div className="claim-modal-buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Claim'}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
