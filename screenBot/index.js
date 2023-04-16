require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
// const chatId = 5763359235 //myChat
const chatId = 1138129996

const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const { getScreen } = require('../playwright/scrapers/getScreenJob');

(async () => {
  console.log("--BOTSITO WORKING--")
  try {

    const screenshotResult = await getScreen()
    if (screenshotResult.result === "FAIL") return null

    console.log("--UPLOADING SCREENSHOT--")
    const imageJobs = await cloudinary.uploader
      .upload(screenshotResult.screenshot)
    console.log("clo result", imageJobs)
    const imagePath = imageJobs.secure_url


    console.log("--SENDING TELEGRAM--")
    bot.sendPhoto(chatId, imagePath)
      .then((message) => {
        console.log('Imagen enviada:', message.photo)
      })
      .catch((error) => {
        console.error('Error al enviar la imagen:', error)
      })

    console.log("--BOTSITO LO HA ECHO!--")

    process.exit(0)

  } catch (error) {
    console.log("--BOTSITO FALLEN--")
    console.log(error)
    process.exit(1)
  }

})()
