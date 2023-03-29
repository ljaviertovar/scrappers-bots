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
    headless: true
  })
  try {
    const page = await browser.newPage()
    console.log("GOTO")

    await page.goto('https://hiring.amazon.ca/app#/jobSearch', { waitUntil: 'load', timeout: 0 })

    console.log("IN PAGE")
    const cookieBtnEl = "#stencil-modal-body > div > div > div > div > div:nth-child(2) > button"

    await page.waitForSelector(cookieBtnEl)
    console.log("BTN")
    const cookieBtn = await page.$(cookieBtnEl)
    console.log(cookieBtn)
    if (cookieBtn) {
      console.log("CLICK")
      await cookieBtn.click()
    }




    // Print the full title

    console.log("TERMINO")
    res.send("SCREEN")
  } catch (e) {
    console.error(e)
    res.send(`SCREE-BOT ERROR: ${e}`)
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }