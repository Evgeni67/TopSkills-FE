const backendUrls = {
  mainUrl: "http://localhost:9999",

  accounting: {
    get: {
      login: "/account/login",
      me: "/account/getMe",
    },
    post: {
      register: `/account/register`,
    },
    put: {
      addToFavourites: (movieId) => `/account/addToFavourites/${movieId}`,
      addNote: (movieId) => `/account/addNote/${movieId}`,
    },
    delete: {
      note: `/account/deleteNote`,
    },
  },
};
export default backendUrls;
