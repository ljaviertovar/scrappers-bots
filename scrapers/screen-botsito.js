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
    console.log("GOTO")

    await page.goto('https://hiring.amazon.ca/app#/jobSearch')

    const cookieBtn = "#stencil-modal-body > div > div > div > div > div:nth-child(2) > button"
    await page.waitForSelector(cookieBtn)
    console.log("CLICK")
    await page.click(cookieBtn)



    // Print the full title

    console.log("TERMINO")
    res.send(logStatement)
  } catch (e) {
    console.error(e)
    res.send(`Something went wrong while running Puppeteer: ${e}`)
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }