// src/components/Modal.tsx

import React, { useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-600 text-white p-8 rounded-md shadow-lg">
        <h1 className="text-xl font-bold">You did not lock in! You lost a point</h1>
      </div>
    </div>
  );
};

export default Modal;
