const puppeteer = require('puppeteer');

async function main(event) {
  // Launch a headless browser
  const browser = await puppeteer.launch({ executablePath: await puppeteer.executablePath(),headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Quora.com
    await page.goto('https://www.quora.com');

    // Fill in the login credentials
    await page.type('#email', 'hainahoo@gmail.com');
    await page.waitForTimeout(3000);
    
    await page.type('#password', '?!p4Bvw5@Pq!hMr');
    await page.waitForTimeout(3000);

    // Click the login button
    await page.click('button[tabindex="4"]');
    await page.waitForTimeout(6000);
    // Wait for the login to complete (you might need to adjust this)
    await page.waitForSelector('button[aria-label="Add question"]');
    await page.waitForTimeout(10000);

    await page.click('button[aria-label="Add question"]');
    console.log('Add question button clicked!');
    await page.waitForTimeout(10000);
    
 // Use XPath to locate the tab element by its text content
 const tabElement = await page.$x('//div[contains(text(), "Create Post")]');

 if (tabElement.length > 0) {
   // Click the first matching element
   await tabElement[0].click();
   console.log('Clicked on the "Create Post" tab.');
 } else {
   console.error('Tab with text "Create Post" not found.');
 }



    await page.waitForTimeout(10000);
     // Select the div with class "content" and add text to its innerHTML
    await page.evaluate(() => {
      const contentDiv = document.querySelector('div.content');
      if (contentDiv) {
        contentDiv.innerHTML = event.contentHTML;
      }
    });
    console.log('Added text to "content" div successfully.');
    await page.waitForTimeout(10000);
    // Perform any additional actions and submit the post

 

    // Use page.evaluate to execute JavaScript in the context of the page
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button'); // Select all buttons
    for (const button of buttons) {
    if (button) {
      const innerTextElement = button.querySelector('.q-text .qu-whiteSpace--nowrap');
      if (innerTextElement) {
        const innerText = innerTextElement.textContent.trim();
        if (innerText === 'Post') {
          
          button.click(); // Click the button with inner text "Post"
          console.log('Clicked "Post" button successfully.');
          break;
        }
      }
    }
    }
  });

     
    // Wait for a while to make sure the content is posted
    await page.waitForTimeout(10000); // Adjust the timeout as needed

    console.log('Content posted successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

main();