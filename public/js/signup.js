const signup = async (name, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/signup",
      data: {
        name,
        email,
        password,
      },
    });
    window.location.href = "/login";
  } catch (err) {
    console.log(err.message);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signup(name, email, password);
});
