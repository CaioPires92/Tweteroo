import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const port = 5000

const usuario = []

const tweetsList = []

let usuarioRegistrado = false

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body

  if (!username || !avatar) {
    return res.send('Mande os dados corretos')
  }

  const newUser = { username, avatar }

  usuario.push(newUser)

  usuarioRegistrado = true

  res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body

  if (!usuarioRegistrado) {
    return res.status(403).send('UNAUTHORIZED')
  }

  if (!username || !tweet) {
    return res.send('Mande os dados Corretos')
  }

  const newTweet = { username, tweet }

  tweetsList.push(newTweet)

  res.status(201).send('OK')
})



app.get('/tweets', (req, res) => {
  const dezUltimosTweets = tweetsList.slice(-10)
  const tweets = dezUltimosTweets.map(tweet => {
    const user = usuario.find(user => user.username === tweet.username)
    return {
      username: tweet.username,
      avatar: user ? user.avatar : null,
      tweet: tweet.tweet
    }
  })
  res.send(tweets)
})

app.listen(port, () => console.log('server is running'))
