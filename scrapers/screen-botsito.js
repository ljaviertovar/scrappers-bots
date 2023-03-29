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

    const cookieBtn = ".search-box__link"
    await page.waitForSelector(cookieBtn)
    await page.click(cookieBtn)



    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`
    console.log(logStatement)
    res.send(logStatement)
  } catch (e) {
    console.error(e)
    res.send(`Something went wrong while running Puppeteer: ${e}`)
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }