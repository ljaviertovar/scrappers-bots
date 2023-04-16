const { chromium } = require('playwright')

const path = require('path')

const { getTimestampAsKey } = require('../../utils')

const rootPath = path.resolve(__dirname, '../../')

const url = 'https://hiring.amazon.ca/app#/jobSearch'

const getScreen = async () => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    console.log("--GO TO PAGE--")
    await page.goto(url, { waitUntil: "networkidle0", timeout: 1200000 })

    console.log("--WAITING BTN--")
    await page.waitForSelector("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    const cookieBtn = await page.$("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    if (cookieBtn) {
      console.log("--CLICK BTN--")
      await cookieBtn.click()
    }

    await new Promise(r => setTimeout(r, 2000))

    console.log("--SCREENSHOT--")
    const screenshot = `${path.normalize(rootPath)}/archives/screenshots/getScreenJob/${getTimestampAsKey()}.jpg`
    await page.screenshot({ path: screenshot, fullPage: true })
    await browser.close()

    return { result: "OK", screenshot }

  } catch (error) {
    console.log("--BOTSITO FALLEN--")
    console.log(error)
    await browser.close()
    return { result: "FAIL", screenshot: null, error }
  }
}

module.exports = { getScreen }

getScreen()