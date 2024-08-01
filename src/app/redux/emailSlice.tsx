import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Email {
    id: string;
    to: string;
    from: string;
    subject: string;
    message: string;
    status: boolean;
    date: string;
}

interface EmailState {
    emails: Email[];
}

const initialState: EmailState = {
    emails: []
};

const emailSlice = createSlice({
    name: 'addEmail',
    initialState,
    reducers: {
        addEmail: (state, action: PayloadAction<{ to: string; from: string; subject: string; message: string; status: boolean }>) => {
            const data: Email = {
                id: nanoid(),
                to: action.payload.to,
                from: action.payload.from,
                subject: action.payload.subject,
                message: action.payload.message,
                status: true,
                date: new Date().toISOString()
            };
            state.emails.push(data);
        },
        addStatus: (state, action: PayloadAction<{ id: string; status: boolean }>) => {
            const { id, status } = action.payload;
            const email = state.emails.find(email => email.id === id);
            if (email) {
                email.status = status;
            }
        },
        changeStatus: (state, action: PayloadAction<{ id: string; status: boolean }>) => {
            const { id, status } = action.payload;
            const email = state.emails.find(email => email.id === id);
            if (email) {
                email.status = status;
            }
        },
    }
});

export const { addEmail, addStatus  } = emailSlice.actions;
export default emailSlice.reducer;
