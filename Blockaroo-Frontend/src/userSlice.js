import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "Unnamed",
        Bio: "There's nothing to show.",
        avaUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        themeColor: "#ff9051"
    },
    reducers:{
        update:(state, action) => {
            state.name = action.payload.name;
            state.Bio = action.payload.Bio;   
            state.avaUrl = action.payload.avaUrl;  
            state.themeColor = action.payload.themeColor;
        }
    }

})

export const {update} = userSlice.actions;
export default userSlice.reducer;