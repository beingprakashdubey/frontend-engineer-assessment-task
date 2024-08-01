"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../redux/emailSlice";
import type { AppDispatch } from "../redux/store"; 

const AddEmail: React.FC = () => {
    const [to, setTo] = useState<string>('');
    const [status, setStatus] = useState(true);
    const [from, setFrom] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const emailDispatch = () => {
        dispatch(addEmail({ to, from, subject, message, status  }));
    };

    return (
        <>
            <h1>Compose Email</h1>
            <input
                type="text"
                placeholder="TO"
                onChange={(e) => setTo(e.target.value)}
                value={to}
            />
            <input
                type="text"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
            />
            <textarea
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button type="button" onClick={emailDispatch}>
                Add Email
            </button>
        </>
    );
};

export default AddEmail;
