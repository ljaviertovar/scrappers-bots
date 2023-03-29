const puppeteer = require("puppeteer")
require("dotenv").config()

const screenBotsito = async (res) => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: true,
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
    // headless: process.env.NODE_ENV === "production" ? true : false
  })
  try {
    const page = await browser.newPage()

    await page.goto("https://developer.chrome.com/")

    await page.screenshot({ path: 'jobs.jpg', fullPage: true })
    console.log("--BOTSITO SCREEN--")

    res.status(200).json({ "screen": "" })
  } catch (e) {
    console.log(e)
    res.status(200).json({ "error": e })

  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }