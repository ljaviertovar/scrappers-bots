const { screenBotsito } = require("./scrapers/screen-botsito")

const app = require("express")()

const port = process.env.PORT || 3001

app.get("/get-screenshot", (_req, res) => {
  screenBotsito(res)
})

app.get("/", (_req, res) => {
  res.send("BOTSITO ONLINE")
})

app.listen(port, () => {
  console.log(`Server on port: ${port}`)
})

module.export = app