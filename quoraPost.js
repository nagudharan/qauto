const puppeteer = require("puppeteer");
require("dotenv").config();

const quoraPost = async (req, res) => {
  const { contentHTML } = req.body;
  console.log(contentHTML);

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
  });
  try {
    const page = await browser.newPage();
    const cookiesString = process.env.QUORA_SessionCookie;
    const cookiesArray = JSON.parse(cookiesString);
    for (const cookie of cookiesArray) {
      await page.setCookie(cookie);
    }
    // Navigate to Quora.com
    await page.goto("https://www.quora.com");

    // Fill in the login credentials
    // ... (your login code)

    await page.waitForTimeout(6000);

    // Wait for the login to complete
    await page.waitForSelector('button[aria-label="Add question"]');
    await page.waitForTimeout(15000);

    await page.click('button[aria-label="Add question"]');
    console.log("Add question button clicked!");

    await page.waitForTimeout(15000);

    // Use XPath to locate the tab element by its text content
    const tabElement = await page.$x('//div[contains(text(), "Create Post")]');

    if (tabElement.length > 0) {
      // Click the first matching element
      await tabElement[0].click();
      console.log('Clicked on the "Create Post" tab.');
    } else {
      console.error('Tab with text "Create Post" not found.');
    }

    await page.waitForTimeout(15000);

    // Set the contentHTML in the browser context
    await page.evaluate((contentHTML) => {
      const contentDiv = document.querySelector('div.content');
      if (contentDiv) {
        contentDiv.innerHTML = contentHTML;
      }
    }, contentHTML);

    console.log('Added text to "content" div successfully.');

    await page.waitForTimeout(15000);

    // Perform any additional actions and submit the post

    // Use page.evaluate to execute JavaScript in the context of the page
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button) {
          const innerTextElement = button.querySelector('.q-text .qu-whiteSpace--nowrap');
          if (innerTextElement) {
            const innerText = innerTextElement.textContent.trim();
            if (innerText === 'Post') {
              button.click();
              console.log('Clicked "Post" button successfully.');
              break;
            }
          }
        }
      }
    });

    // Wait for a while to make sure the content is posted
    await page.waitForTimeout(15000);
    console.log('Content posted successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
};

module.exports = { quoraPost };
