const express = require('express')
const router = express.Router()
const axios = require('axios')
const Game = require('../models/Game')

const baseUrl = 'https://lichess.org/api/challenge'
const boardUrl = 'https://lichess.org/api/board'

router.post("/move", (req, res) => {
    console.log("in test move")
    Game.find({gameId: req.body.gameId})
    .then(resp => {
        axios.post(
            `https://lichess.org/api/board/game/${req.body.gameId}/move/${req.body.move}`,
            "",
            {
            headers: {
                Authorization: `Bearer ${req.body.token}`,
            },
            }
        ).then(response => {
            console.log("move is valid", response)
            Game.findOneAndUpdate({gameId: req.body.gameId}, {movesList: [...resp.movedList, req.body.move]})
            .then(res2 => console.log(res2))
            .catch(err => console.log(err))
            res.send("valid")
        })
        .catch(err => res.status(400).send(err))
    })
})

router.post("/getGameState", (req, res) => {
    Game.find({gameId: req.body.gameId})
    .then(resp => {
        res.send({moves: resp.movesList, status: resp.status})
    })
    .catch(err => res.status(400).send(err))
})

router.post("/status", (req, res) => {
    console.log("body", req.body)
    console.log("gaemId", req.body.gameId)

    Game.findOne({gameId: req.body.gameId})
    .then(response => {
        res.send({status: response.status})
       console.log("response", response)        
    })
    .catch(err => console.log(err))
})

module.exports = router