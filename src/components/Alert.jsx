// components/Alert.jsx
import React,{useContext} from 'react';
import { X } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';

export default function Alert({ isOpen, onClose, onConfirm, message }) {
    const {darkMode}=useContext(ThemeContext)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div
        className={`p-6 rounded-xl shadow-xl w-full max-w-md relative transition-all duration-200 ${
          darkMode ? 'bg-black/80 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 hover:text-red-500 transition ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600'
          }`}
        >
          <X />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">Confirm Deleteion:</h2>

        {/* Message */}
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-sm border ${
              darkMode
                ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
