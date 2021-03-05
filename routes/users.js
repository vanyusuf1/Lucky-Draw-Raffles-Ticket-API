const express = require("express");
const router = express.Router();
const User = require("../models/user");

// API for creating a new user

router.post("/", async (req, res) => {
  console.log("Create your user");
  const currentUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    luckydrawCoupons: req.body.luckydrawCoupons,
  });
  try {
    const myusers = await User.find();
    let flag = true;
    for (i = 0; i < myusers.length; i++) {
      if (myusers[i].email == currentUser.email && myusers[i].phno == currentUser.phone) {
        flag = false; //flag is false therefore user is already present
        break;
      }
    }

    if (flag) {
      //flag is true therefore user is not present
      await user.save();
      res.send({ details: user });
    } else {
      console.log("Bad Request");
    }
  } catch (err) {
    res.send(err);
  }
});

// API to fetch all users
router.get("/", async (req, res) => {
  console.log("Fetch all users.");
  try {
    const myusers = await User.find();
    res.json(myusers);
  } catch (err) {
    console.log(err);
  }
});

// API to fetch indiviual User(id)
router.get("/:id", async (req, res) => {
  console.log("Fetch indiviual user");
  try {
    const myuser = await User.findById(req.params.id).exec();
    res.json(myuser);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
