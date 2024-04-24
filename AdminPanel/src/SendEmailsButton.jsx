import React, { useState } from 'react';
import axios from 'axios';
import './sendEmail.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendEmailsButton() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleClick = async () => {
    try {
      await axios
        .post('http://localhost:3000/sendmailtoallusers', { subject, body })
        .then((res) => {
          toast.success('Emails sent successfully!');
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log('Error in sending mail to all users:', err.message);
          toast.error('Error sending emails. Please try again.');
        });
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Error sending emails. Please try again.');
    }
  };

  return (
    <div className="email-container">
    <h2>Send Email to Students</h2>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="input-field"
      />
      <textarea

        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="input-field"
      ></textarea>
      <button onClick={handleClick} className="send-email-button">
        Send Emails to All Users
      </button>
      <ToastContainer />
    </div>
  );
}

export default SendEmailsButton;