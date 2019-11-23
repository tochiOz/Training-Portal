var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middleware/adminAuth");
const isUser = require("../middleware/userAuth");
const admin_controller = require("../controllers/Admin");
const user_controller = require("../controllers/User");

/* GET Static Pages. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "KodeHauz Training Portal" });
});
router.get("/KodeHauz_Hub", function(req, res, next) {
  res.render("kodehauzHub", { title: "KodeHauz Training Portal" });
});
router.get("/login", function(req, res, next) {
  res.render("dashboardLogin", { title: "KodeHauz Training Portal" });
});
router.get("/signUp", function(req, res, next) {
  res.render("dashboardSignUp", { title: "KodeHauz Training Portal" });
});
router.get("/trainer", function(req, res, next) {
  res.render("trainer", { title: "KodeHauz Training Portal" });
});
router.get("/trainings", function(req, res, next) {
  res.render("trainings", { title: "KodeHauz Training Portal" });
});
router.get("/internship", function(req, res, next) {
  res.render("internship", { title: "KodeHauz Training Portal" });
});

//get profile form
router.get("/training_registration", user_controller.get_formDetails);

//get profile for paystack
router.get("/activation", isUser, user_controller.get_trainee_paystack);

//get trainee Profile
router.get("/trainee-profile", isUser, user_controller.get_trainee_profile);

/* GET admin pages. */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "Admin Login" });
});

//GET PROFILE FORM
router.get("/admin/view/profile", isUser, admin_controller.view_user_profile);

//GET admin Trainees
router.get("/dashboard-trainees", isAdmin, user_controller.get_trainings);

//GET admin Interns
router.get("/dashboard-interns", isAdmin, user_controller.get_interns);

//GET admin Hub users
router.get("/dashboard-hub", isAdmin, user_controller.get_hub);

//GET admin Traine the Trainer
router.get("/dashboard-trainer", isAdmin, user_controller.get_trainer);

//get admin categories
router.get("/admin-departments", isAdmin, admin_controller.get_categories);

//get admin interest-areas
router.get(
  "/admin-interest-areas",
  isAdmin,
  admin_controller.get_interest_area
);

//get admin skill levels
router.get("/admin-skill-levels", isAdmin, admin_controller.get_Skills);

router.get("/admin-dashboard", isAdmin, function(req, res, next) {
  res.render("dashboard", { title: "KodeHauz Training Portal" });
});

router.get("/dashboard-sign-up", function(req, res, next) {
  res.render("dashboardSignUp", { title: "Admin Dashboard Sign Up" });
});

module.exports = router;
