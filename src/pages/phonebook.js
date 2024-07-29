// pages/index.js

import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');

    const handleSaveContact = () => {
        // Generate a VCard content
        const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phoneNumber}
EMAIL:${email}
ADR:${address}
URL:${website}
END:VCARD`;

        // Create a Blob with the VCard content
        const blob = new Blob([vCardContent], { type: 'text/vcard' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name}.vcf`;

        // Trigger a click on the link to initiate the download
        link.click();
    };

    return (
        <div>
            <h1>Save Contact</h1>
            <form>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <br />
                <label>
                    Website:
                    <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleSaveContact}>
                    Save to Phone Book
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
