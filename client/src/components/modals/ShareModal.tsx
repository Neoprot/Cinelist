import React from 'react';

interface ShareModalProps {
    isOpen: boolean;
    shareableLink: string;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, shareableLink, onClose }) => {
    if (!isOpen) return null;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shareableLink);
        onClose();
    };

    const handleShareWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareableLink)}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-md shadow-md text-center"
                onClick={(e) => e.stopPropagation()}
            >
                

                <h2 className="text-xl font-bold mb-4 text-black">Share your favorites</h2>
                <div className="text-green-500 text-3xl mb-4">✔️</div>
                <p className="text-gray-700 mb-4">Copy the link or share it via WhatsApp:</p>

                <div className="flex justify-between mb-4 gap-x-4   	">
                    <button
                        onClick={handleCopyToClipboard}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Copy to clipboard
                    </button>
                    <button
                        onClick={handleShareWhatsApp}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Share via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
