const handleLogoutOperations = () => {
  window.localStorage.removeItem("isLogedIn");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("expiration");
  console.log("Logout clicked");
};

export default handleLogoutOperations;
