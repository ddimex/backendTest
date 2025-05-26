const express = require("express");
const db = require("./pkg/db/index");

const authHandler = require("./controller/authHandler");
const viewHandler = require("./controller/viewHandler");
const academy = require("./controller/academy");
const course = require("./controller/course");
const cookieParser = require("cookie-parser");
const jwt = require("express-jwt");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

db.init();

app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: [
        "/test",
        "/api/v1/signup",
        "/signup",
        "/login",
        "/api/v1/login",
        "/academies",
        /\/academies\/\w+/,
        "/welcome",
        /\/courses\/\w+/,
        "/addNewCourse",
        "/addNewAcademy",
        /\/editCourse\/\w+/,
        /\/editAcademy\/\w+/,
      ],
    })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).render("unauthorized");
  }
  next(err);
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.get("/signup", viewHandler.getSignupForm);
app.get("/login", viewHandler.getLoginForm);

app.get("/test", viewHandler.getTest);
app.get("/welcome", course.getAllCourses);

app.get("/academies", academy.getAllAcademies);
app.get("/academies/:id", academy.getOneAcademy);
app.get(
  "/addNewAcademy",
  authHandler.isAuthenticated,
  academy.getCreateAcademy
);
app.post("/addNewAcademy", academy.createAcademy);
app.get(
  "/editAcademy/:id",
  authHandler.isAuthenticated,
  academy.getEditAcademy
);
app.post(
  "/editAcademy/:id",
  authHandler.isAuthenticated,
  academy.updateAcademy
);
app.delete(
  "/academies/:id",
  authHandler.isAuthenticated,
  academy.deleteAcademy
);

app.get("/courses/:id", course.getOneCourse);
app.get("/addNewCourse", authHandler.isAuthenticated, course.getCreateCourse);
app.post("/addNewCourse", course.createCourse);
app.get("/editCourse/:id", authHandler.isAuthenticated, course.getEditCourse);
app.post("/editCourse/:id", authHandler.isAuthenticated, course.updateCourse);
app.delete("/courses/:id", authHandler.isAuthenticated, course.deleteCourse);

app.listen(10000, (err) => {
  if (err) return console.log("There is an error");
  console.log("Server started successfully on port 10000");
});
