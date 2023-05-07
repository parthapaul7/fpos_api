const express = require("express");
const router = express.Router();

const userController = require("../controller/buyer");

// GET for front page
router.get("/buyer",  userController.getUser);

router.post("/buyer",  userController.postUser);

router.get("/buyer/:id",  userController.getUserWithId);

// router.get("/doctor", check, isDoctor, homeController.getDoctor);

//route with no check 
// router.get("/patient", homeController.getPatient);

// router.get("/search", check, homeController.getSearch);


module.exports = router;