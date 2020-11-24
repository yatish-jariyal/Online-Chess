const express = require('express')
const router = express.Router()
const axios = require('axios')
const Game = require('../models/Game')

const baseUrl = 'https://lichess.org/api/challenge'
const boardUrl = 'https://lichess.org/api/board'

router.post("/newGame", (req, res) => {
    console.log("body", req.body)
    console.log("opponent", req.body.opponent)

    axios.post(`${baseUrl}/${req.body.opponent}`, null,  {
        headers: {
            Authorization: `Bearer ${req.body.token}`,
            "content-type": "application/x-www-form-urlencoded",
        }
    })
    .then(response => {
        const data = response.data
        console.log("response", response.data)
        const newGame = new Game({
            gameId: data.challenge.id,
            url: data.challenge.url,
            status: data.challenge.status,
            challenger: {
                id: data.challenge.challenger.id
            },
            receiver: {
                id: data.challenge.destUser.id
            },
            
        })

        const responseData = {gameId: data.challenge.id}
        console.log("response data", responseData)
        Game.deleteMany({})
        .then(resp => {
            newGame.save()
            .then(resp => res.send(responseData))
            .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
        
    })
    .catch(err => console.log(err))
})

router.post("/accept", (req, res) => {
    console.log("body", req.body)
    console.log("challengeId", req.body.gameId)
    console.log("token", req.body.token)

    axios.post(`${baseUrl}/${req.body.gameId}/accept`, null,  {
        headers: {
            Authorization: `Bearer ${req.body.token}`,
            "content-type": "application/x-www-form-urlencoded",
        }
    })
    .then(async resp => {console.log("accept challenge response", resp.data)
       res.send(resp.data)
       Game.findOneAndUpdate({gameId: req.body.gameId}, {status: "started"})
       .then(res2 => {
           console.log("response find", res2)
       })
       .catch(err => console.log(err))
})
})



module.exports = router