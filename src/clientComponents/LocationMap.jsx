import React from 'react';

const LocationMap = () => {
    return (
        <div className='mb-[30px]'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5854987624554!2d78.47466047480196!3d17.390984103389135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97865b0f6f8b%3A0x2eac3b68b49a1e8b!2sUnity%20House%2C%20Abids%2C%20Hyderabad%2C%20Telangana%20500001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Unity House, Abids, Hyderabad Location"
            ></iframe>
        </div>
    );
}

export default LocationMap;
