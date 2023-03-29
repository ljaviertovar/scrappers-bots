const puppeteer = require("puppeteer")

const screenBotsito = async (res) => {



  console.log("--BOTSITO WORKING--")


  const browser = await puppeteer.launch()

  try {

    const page = await browser.newPage()

    await page.goto('https://hiring.amazon.ca/app#/jobSearch')

    await page.waitForSelector("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    const cookieBtn = await page.$("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    if (cookieBtn) {
      console.log("--BOTSITOBTN--")

      await cookieBtn.click()
    }

    console.log("--BOTSITO CLIC--")


    // await new Promise(r => setTimeout(r, 1000))
    console.log("--BOTSITO ESPERO--")

    await page.screenshot({ path: 'jobs.jpg', fullPage: true })
    console.log("--BOTSITO SCREEN--")

    await browser.close()
    console.log("--BOTSITO FINISHED--")

    res.status(200).json({ status: "OK", screen: "READY" })

  } catch (error) {

    console.log("--BOTSITO FALLEN--")
    console.log(error)

    res.status(500).json({ status: "FAIL", error })

  } finally {
    await browser.close()
  }

}

module.exports = { screenBotsito }