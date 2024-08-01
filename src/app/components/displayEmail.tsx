"use client";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store"; 

const DisplayEmail: React.FC = () => {
    const emailData = useSelector((state: RootState) => state.emailData.emails);

    return (
        <>
            <h2>All Emails</h2>
            <ul>
                {emailData.length > 0 ? 
                    emailData.map((item, index) => (
                        <li key={index}>{item.subject}</li>
                    )) : 
                    <li>No emails found</li>
                }
            </ul>
        </>
    );
};

export default DisplayEmail;
