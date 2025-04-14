import React, { useEffect, useState } from 'react';
import '../styles/HandoverModal.css';

export function HandoverModal({ isOpen, onClose, onSubmit, itemId }) {
  const [formData, setFormData] = useState({
    itemId: '',
    requesterId: '',
    description: '',
    photo: null,
    handoverToSecurity: true,
    securityId: '',
    securityName: '',
    pickupMessage: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (itemId) {
      setFormData((prev) => ({ ...prev, itemId }));
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.userId) {
      setFormData((prev) => ({ ...prev, requesterId: user.userId }));
    }
  }, [itemId]);

  if (!isOpen) return null;

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
      const base64Photo = await convertToBase64(formData.photo);

      const payload = {
        itemId: parseInt(formData.itemId),
        requesterId: parseInt(formData.requesterId),
        description: formData.description,
        photo: base64Photo,
        handoverToSecurity: formData.handoverToSecurity,
        securityId: formData.handoverToSecurity ? formData.securityId : null,
        securityName: formData.handoverToSecurity ? formData.securityName : null,
        pickupMessage: formData.handoverToSecurity ? null : formData.pickupMessage,
      };

      const response = await fetch('http://localhost:8080/api/transactions/handover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Handover submitted:', result);
        onSubmit(result);
        resetForm();
        onClose();
      } else {
        console.error('Submission failed:', await response.text());
        alert('Error submitting handover. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      itemId: '',
      requesterId: '',
      description: '',
      photo: null,
      handoverToSecurity: true,
      securityId: '',
      securityName: '',
      pickupMessage: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Handover Form</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <label>
              Item ID
              <input type="number" value={formData.itemId} disabled />
            </label>

            <label>
              Requester ID
              <input type="number" value={formData.requesterId} disabled />
            </label>

            <label>
              Description
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </label>

            <label>
              Photo Proof
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photo: e.target.files?.[0] || null,
                  })
                }
              />
            </label>

            <div className="radio-group">
              <span>Handling Option:</span>
              <label>
                <input
                  type="radio"
                  name="handlingOption"
                  value="security"
                  checked={formData.handoverToSecurity === true}
                  onChange={() => setFormData({ ...formData, handoverToSecurity: true })}
                />
                Handover to security
              </label>
              <label>
                <input
                  type="radio"
                  name="handlingOption"
                  value="self"
                  checked={formData.handoverToSecurity === false}
                  onChange={() => setFormData({ ...formData, handoverToSecurity: false })}
                />
                Keep it with me
              </label>
            </div>

            {formData.handoverToSecurity ? (
              <>
                <label>
                  Security ID
                  <input
                    type="text"
                    required
                    value={formData.securityId}
                    onChange={(e) => setFormData({ ...formData, securityId: e.target.value })}
                  />
                </label>

                <label>
                  Security Name
                  <input
                    type="text"
                    required
                    value={formData.securityName}
                    onChange={(e) => setFormData({ ...formData, securityName: e.target.value })}
                  />
                </label>
              </>
            ) : (
              <label>
                Pickup Message
                <textarea
                  required
                  rows={3}
                  value={formData.pickupMessage}
                  onChange={(e) => setFormData({ ...formData, pickupMessage: e.target.value })}
                />
              </label>
            )}

            <div className="modal-footer">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cancel-btn"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
