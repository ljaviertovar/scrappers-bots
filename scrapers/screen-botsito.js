const puppeteer = require("puppeteer")
require("dotenv").config()

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

    await page.goto('https://hiring.amazon.ca/app#/jobSearch')

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 })


    res.send("WTF")
  } catch (e) {
    console.error(e)
    res.send(`Something went wrong while running Puppeteer: ${e}`)
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }