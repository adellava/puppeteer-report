
const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/print', async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.medium.com')
  const buffer = await page.pdf({ format: 'A4' })
  await browser.close()
  res.type('application/pdf')
  res.send(buffer)
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})