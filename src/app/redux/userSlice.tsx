// userSlice.ts
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    name: string;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
            const data: User = {
                id: nanoid(),
                email: action.payload.email,
                name: action.payload.name,
            };
            state.users.push(data);
        }
    }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
