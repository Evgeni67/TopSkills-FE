import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrls from "../../utils/backendurls";

const initialState = {
  //TODO Implement authToken with redux-token-auth
  //https://medium.com/codingtown/react-js-authentication-using-redux-token-auth-bffd891e1148#:~:text=Create%20a%20react%20js%20project%20using%20the%20following,redux%20token%20auth%20dependency%20npm%20install%20--save%20redux-token-auth
  authToken: null,
  isLogged: false,
  isLoading: false,
  meUser: {},
};

export const login = createAsyncThunk("login/log-in", async (data) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { email, password } = data;
    const loginRes = await axios.get(
      `${backendUrls.mainUrl}${backendUrls.accounting.get.login}/${email}/${password}`,
      requestOptions
    );
    console.log(loginRes);
    return loginRes;
    //accessData is object and has properties accessToken & refreshToken
    //   const accessData = loginRes[0];
    //   const user = loginRes[1];
    //   saveTokensLocally(loginRes.data);
  } catch (err) {
    return "Opps there seems to be an error";
  }
});

export const getMe = createAsyncThunk("login/get-me", async (data) => {
  try {
    const { authToken } = data;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const meUser = await axios.get(
      `${backendUrls.mainUrl}${backendUrls.accounting.get.me}`,
      requestOptions
    );
    console.log(meUser);
    console.log("getting me...");

    return meUser;
    //accessData is object and has properties accessToken & refreshToken
    //   const accessData = loginRes[0];
    //   const user = loginRes[1];
    //   saveTokensLocally(loginRes.data);
  } catch (err) {
    return "Opps there seems to be an error";
  }
});

export const loginSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setMeUser: (state, action) => {
      state.meUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authToken = action.payload.data[0]?.accessToken;
        state.isLogged = true;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLogged = false;
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLogged = false;
        state.isLoading = false;
      });
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.meUser = action?.payload?.data;
        state.isLogged = true;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.meUser = {};
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLogged = false;
        state.isLoading = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setIsLogged } = loginSlice.actions;

export default loginSlice.reducer;
