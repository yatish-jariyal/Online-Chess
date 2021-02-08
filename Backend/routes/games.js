const express = require('express')
const router = express.Router()
const axios = require('axios')
const Game = require('../models/Game')

const baseUrl = 'https://lichess.org/api/challenge'
const boardUrl = 'https://lichess.org/api/board'

router.post("/move", (req, res) => {
    Game.findOne({ gameId: req.body.gameId })
        .then(resp => {
            axios.post(
                `https://lichess.org/api/board/game/${req.body.gameId}/move/${req.body.move}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${req.body.token}`,
                    },
                }
            ).then(response => {
                Game.findOneAndUpdate({ gameId: req.body.gameId }, { movesList: [...resp.movesList, req.body.move] })
                    .then(res2 => res.send("valid"))
                    .catch(err => console.log("err1", err))

            })
                .catch(err => {
                    console.log("err", err)
                    res.status(400).send(err)
                })
        })
        
})

router.post("/getGameState", (req, res) => {
    Game.findOne({ gameId: req.body.gameId })
        .then(resp => {
            console.log("resp", resp)
            res.send({ moves: resp.movesList, status: resp.status })
        })
        .catch(err => res.status(400).send(err))
})

router.post("/status", (req, res) => {
    Game.findOne({ gameId: req.body.gameId })
        .then(response => {
            res.send({ status: response.status })
        })
        .catch(err => console.log(err))
})

router.get("/getGameStatus/:gameId", (req, res) => {
    axios
        .get(`https://lichess.org/api/board/game/stream/${req.params.gameId}`, {
            headers: {
                Authorization: `Bearer ${token1}`,
            },
        })
        .then((resp) => {
            if (resp.data.state && resp.data.state.status) {
                Game.findOne({ gameId: req.params.gameId })
                    .then((game) => {
                        game.status = res.data.state.status
                        game.winner = res.data.state.winner
                        game.save()
                        .then(() => {
                            res.send({status: game.status, winner: game.winner})
                        })
                    })
            }
        })
        .catch((err) => console.log(err));
})

module.exports = router