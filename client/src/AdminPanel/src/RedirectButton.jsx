import React from 'react';

function RedirectButton() {
    const redirectToComposeGmail = () => {
        const emails = ['rv142519@gmail.com']; // List of email addresses
        const toParam = emails.join(','); // Join email addresses with comma
        window.location.href = `https://mail.google.com/mail/u/0/#compose?to=${toParam}`;
    };

    return (
        <button onClick={redirectToComposeGmail}>
            Compose Email
        </button>
        // redirectToComposeGmail
    );
}

export default RedirectButton;
