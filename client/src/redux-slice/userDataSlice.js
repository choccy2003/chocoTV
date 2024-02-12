import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    userImageIconResourcePath: '',
    uploadedVideos: [],
    userId: '',
    subscriberCount: 0,
    subscribedChannels: 0,
    subscribedChannelIds: [],
    likedVideos: [],
  },
  reducers: {
    setUserData: (state, action) => {
      const {
        userName,
        email,
        password,
        phoneNumber,
        userImageIconResourcePath,
        uploadedVideos,
        userId,
        subscriberCount,
        subscribedChannels,
        subscribedChannelIds,
        likedVideos,
      } = action.payload;

      state.userName = userName || state.userName;
      state.email = email || state.email;
      state.password = password || state.password;
      state.phoneNumber = phoneNumber || state.phoneNumber;
      state.userImageIconResourcePath = userImageIconResourcePath || state.userImageIconResourcePath;
      state.uploadedVideos = uploadedVideos || state.uploadedVideos;
      state.userId = userId || state.userId;
      state.subscriberCount = subscriberCount || state.subscriberCount;
      state.subscribedChannels = subscribedChannels || state.subscribedChannels;
      state.subscribedChannelIds = subscribedChannelIds || state.subscribedChannelIds;
      state.likedVideos = likedVideos || state.likedVideos;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;