# Lucky Draw Raffles Ticket API
A service which allows users to get Lucky Draw Raffle tickets and use one lucky draw raffle ticket to participate in a lucky draw game.

## Objectives:
- Design an API which allows users to get the raffle tickets. This API can be
consumed in a lot of ways like We can call this API after the user has placed
an Order.
- Design an API which shows the next Lucky Draw Event timing & the
corresponding reward. For example - Lucky Draw can run everyday at 8AM.
Reward on say 10th Feb is Phone, 11th Feb is Washing Machine etc
- Design an API which allows users to participate in the game. Once a user
has participated with a raffle ticket, she shouldn’t be able to participate
again in the same event.
- Design an API which lists all the winners of all the events in the last one
week.
- Compute the winner for the event and announce the winner.

## Implementation
- Added starter pack configurations for node.js environment. Installed necessary *packages* including mongoose, express, dotenv, and rest you can find it in [package.json](https://github.com/vanyusuf1/Lucky-Draw-Raffles-Ticket-API/blob/main/package.json)
`
- Built `models`, `routes` for the `user` and `raffles` elements
- Logic implementation is under [routes](https://github.com/vanyusuf1/Lucky-Draw-Raffles-Ticket-API/tree/main/routes) directory

## Run the application
- *`git clone https://github.com/vanyusuf1/Lucky-Draw-Raffles-Ticket-API.git`*
- *`npm install`*
- *`npm run dev`*
- *`connect your database(here mongodb).`*