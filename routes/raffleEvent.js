const express = require("express");
const router = express.Router();
const RaffleEvent = require("../models/raffle");
const User = require("../models/user");

// API to create RaffleEvent
router.post("/", async (req, res) => {
  let date = Date.parse(req.body.date);
  if (!date) {
    console.log("Enter date in proper format YYYY-MM-DD");
  }
  const myevent = new RaffleEvent({
    date: req.body.date,
    reward: req.body.reward,
    participants: req.body.participants,
    winner: req.body.winner,
  });

  try {
    await myevent.save();
    res.send({ raffle_details: myevent });
  } catch (err) {
    console.log(err);
  }
});

// API to fetch all events
router.get("/", async (req, res) => {
    try {
      const events = await RaffleEvent.find();
      res.send(events);
    } catch (err) {
      console.log(err)
    }
});

// API to fetch event by their id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const event = await RaffleEvent.findById(req.params.id);
    res.send(event);
  } catch (err) {
    console.log(err);
  }
});

// API to declare the winner
router.put("/:id/declareWinner", async (req, res) => {
  try {
    let upcomingEvent = await RaffleEvent.findById(req.params.id);
    if (upcomingEvent) {
      let participants = upcomingEvent.participants;
      if (participants.length > 0) {
        const winner = participants[Math.floor(Math.random() * participants.length)];
        upcomingEvent.winner = winner;
        // Save winner
        await upcomingEvent.save();
        res.send(await User.findById(winner));
      } else {
        console.log("No participants present");
      }
    } else {
      console.log("No event present");
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
