import React, { useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-red-600 text-white p-12 rounded-xl shadow-2xl max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">You did not lock in!</h1>
        <p className="text-lg">You lost a point.</p>
      </div>
    </div>
  );
};

export default Modal;
