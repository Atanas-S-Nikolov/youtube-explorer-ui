import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelId: "",
    channelName: "",
    channelLink: "",
    channelNameError: "",
    isLinkBtnDisabled: true,
    gridDisplayStatus: "none",
    subscribersCount: "",
    viewsCount: "",
    videosCount: "",
    videos: []
}

export const channelDataSlice = createSlice({
    name: "channelData",
    initialState,
    reducers: {
        getChannelInformation: (state, action) => {
            const payload = action.payload;
            state.channelLink = payload.channelLink;
            state.subscribersCount = payload.subscribersCount;
            state.viewsCount = payload.viewsCount;
            state.videosCount = payload.videosCount;
            state.gridDisplayStatus = "inline";
            state.videos = [];
        },
        addVideos: (state, action) => {
            state.videos = action.payload;
        },
        changeChannelName: (state, action) => {
            const payload = action.payload;

            if (payload.isChannelNameValid) {
                state.channelNameError = "";
            }

            state.channelName = action.payload.channelName;
        },
        updateChannelId: (state, action) => {
            state.channelId = action.payload;
        },
        updateErrorStatus: (state, action) => {
            const payload = action.payload;
            state.channelNameError = payload.channelNameError;
            state.isLinkBtnDisabled = payload.isLinkBtnDisabled;
        },
        resetState: (state) => {
            state.channelId = initialState.channelId;
            state.channelName = initialState.channelName;
            state.channelLink = initialState.channelLink;
            state.channelNameError = initialState.channelNameError;
            state.isLinkBtnDisabled = initialState.isLinkBtnDisabled;
            state.gridDisplayStatus = initialState.gridDisplayStatus;
            state.subscribersCount = initialState.subscribersCount;
            state.viewsCount = initialState.viewsCount;
            state.videosCount = initialState.videosCount;
            state.videos = initialState.videos;
        }
    }
});

export const { getChannelInformation, addVideos, changeChannelName, updateChannelId, updateErrorStatus, resetState } = channelDataSlice.actions;
export default channelDataSlice.reducer;
