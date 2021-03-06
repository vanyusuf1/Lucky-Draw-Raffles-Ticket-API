const express = require("express");
const router = express.Router();
const User = require("../models/user");
const RaffleEvent = require("../models/raffle");

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

// Buy newTickets
router.put("/:id/addRaffleTickets", async (req, res) => {
  try {
    const myuser = await User.findById(req.params.id);
    myuser.luckydrawCoupons += 1;
    // Update data into database
    await myuser.save();
    res.send({ updateDetails: myuser });
  } catch (err) {
    console.log(err);
  }
});

//Api for participating
router.put("/:id/participateinRaffle", async (req, res) => {
  try {
    // Fetch user by ID
    const myuser = await User.findById(req.params.id);
    // Fetch next raffle event
    const upcomingEvent = await upcomingDrawEvents();
    console.log(upcomingEvent);
    // Checking that myuser has drawcoupons available to participate in an event
    if (myuser.luckydrawCoupons > 0) {
      // Check if myuser has already entered upcoming event
      if (!upcomingEvent.participants.includes(myuser.id)) {
        myuser.luckydrawCoupons -= 1;
        upcomingEvent.participants.push(myuser.id);
        await upcomingEvent.save();
        await myuser.save();
        res.send(myuser);
      } else {
        console.log("User cannot participate more than one time");
      }
    } else {
      console.log("Buy raffleTickets to participate");
    }
  } catch (err) {
    console.log(err);
  }
});

async function upcomingDrawEvents() {
  const raffleEvent = await RaffleEvent.find();
  let upcomingevent = null;
  let startDate = null;
  for (i = 0, raffleEvent.length; i < raffleEvent.length; i++) {
    let currevent = raffleEvent[i];
    // Check to make sure that the currevent has not already ended
    if (currevent.winner == null) {
      if (upcomingevent == null) {
        startDate = currevent.date;
        upcomingevent = currevent;
      } else {
        temp = currevent.date;
        // To find the minimum date: locates the first upcoming currevent
        if (temp < startDate) {
          startDate = temp;
          upcomingevent = currevent;
        }
      }
    }
  }
  return upcomingevent;
}

module.exports = router;
