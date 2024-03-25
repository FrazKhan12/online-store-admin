export const ENV = {
  serverURL: process.env.REACT_APP_SERVER_URL,
  // encryptedAdminData: function (data) {
  //   if (data?.data) {
  //     localStorage.setItem("adminInfo", JSON.stringify(data?.data));
  //     localStorage.setItem("adminRole", JSON.stringify(data?.data?.role));
  //   }
  // },
  logOut: function () {
    localStorage.removeItem("token");
  },
};
