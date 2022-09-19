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
      state.settings = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions

export default settingsSlice.reducer