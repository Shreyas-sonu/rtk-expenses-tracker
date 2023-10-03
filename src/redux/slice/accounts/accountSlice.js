import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";

//initialState
const initialState = {
  account: {},
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};
