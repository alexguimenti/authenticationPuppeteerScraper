const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const cheerio = require("cheerio");

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false }); //true para nao mostrar browser
    const page = await browser.newPage();
    await page.goto("https://accounts.craigslist.org/login");
    await page.type("input#inputEmailHandle", credentials.email, {
      delay: 20
    });
    await page.type("input#inputPassword", credentials.pass, { delay: 20 });
    await page.click("button#login");
    await page.waitForNavigation();
    await page.goto(
      "https://accounts.craigslist.org/login/home?show_tab=billing"
    );
    const content = await page.content();
    const $ = await cheerio.load(content);
    const info = $("body > article > section > fieldset > b").text();
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

main();
