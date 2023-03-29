const puppeteer = require("puppeteer")
require("dotenv").config()

const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const screenBotsito = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  })
  try {
    const page = await browser.newPage()

    await page.goto('https://hiring.amazon.ca/app#/jobSearch', { waitUntil: "load", timeout: 0 })

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 })
    await page.screenshot({ path: 'jobs.jpg', fullPage: true })

    const imageJobs = await cloudinary.uploader
      .upload("jobs.jpg")

    res.send(imageJobs.secure_url)
  } catch (e) {
    console.error(e)
    res.send(`Something went wrong while running Puppeteer: ${e}`)
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }