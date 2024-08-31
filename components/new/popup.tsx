import React from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Yakin ingin keluar akun?</h2>
                <p className="text-sm text-gray-600 mb-6">Kamu harus login kembali nanti</p>
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 rounded-lg px-6 py-2 hover:bg-gray-400 transition-colors"
                    >
                        Gak jadi deh
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-purple-600 text-white rounded-lg px-6 py-2 hover:bg-purple-700 transition-colors"
                    >
                        Ya, keluar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;