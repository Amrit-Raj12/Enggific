import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BASE_URL } from '@/constants';
import useFetchData from './utils/useFetchData';

const WhatsAppIcon = () => {

    const apiUrl = `${BASE_URL}/user/get/socialMediaLinks`;

    const { data, loading, error } = useFetchData(apiUrl);

    console.log("data www", data)

    const phoneNumber = data?.links[0].whatsappNumber ? data?.links[0].whatsappNumber :'1234567890'; 
    const message = 'Hello! I would like to chat with you.';

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 hover:animate-pulse animate-bounce">
            <button 
                onClick={handleClick} 
                className="text-white rounded-full shadow-lg transition-all"
                aria-label="Chat on WhatsApp"
            >
                {/* <MessageCircle size={24} /> */}
                <img src='/whatsapp_1.svg' alt='whatsapp' className='w-[54px] h-[54px]' />
            </button>
        </div>
    );
};

export default WhatsAppIcon;
