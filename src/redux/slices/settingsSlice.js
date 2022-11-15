import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  private_account: 0,
  dark_theme: 0,
  invite_to_groups: 1,
  always_offline: 0
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.private_account = action.payload.private_account
      state.dark_theme = action.payload.dark_theme
      state.invite_to_groups = action.payload.invite_to_groups
      state.always_offline = action.payload.always_offline
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions

export default settingsSlice.reducer