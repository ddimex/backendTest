exports.getTest = (req, res) => {
  try {
    res.render("test");
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.getLoginForm = (req, res) => {
  try {
    res.status(200).render("login", {
      title: "Login form",
    });
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.getSignupForm = (req, res) => {
  try {
    res.status(200).render("signup", {
      title: "Signup form",
    });
  } catch (err) {
    res.status(500).send("error");
  }
};
