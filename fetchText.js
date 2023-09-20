const axios = require('axios');
const cheerio = require('cheerio');

const fetchText = async (req, res) => {
  try {
const {url}=req.body;

    // Make an HTTP GET request to the provided URL
    const response = await axios.get(url);

    // Load the HTML content of the page using cheerio
    const $ = cheerio.load(response.data);

    // Check if there is an <article> tag
    if ($('article').length > 0) {
      // Extract and return text from the <article> tag
      const articleText = $('article').text();
      res.status(200).json(articleText);
    }
else{
    // Check if there is a CSS class containing "article"
    const articleClass = $('[class*="article"]');
    if (articleClass.length > 0) {
      // Extract and return text from the element with the "article" class
      const articleText = articleClass.text();
      res.status(200).json(articleText);
    }
else{
    // Check if there is a CSS ID containing "article"
    const articleId = $('[id*="article"]');
    if (articleId.length > 0) {
      // Extract and return text from the element with the "article" ID
      const articleText = articleId.text();
      res.status(200).json(articleText);
    }
else{
    // If none of the above is found, extract text from the <body> tag
    const articleText = $('body').text();
    res.status(200).json(articleText);
}
}
}
  } catch (error) {
    console.error('Error fetching or parsing the article:', error);
    res.status(200).json("");
  }
}
module.exports = { fetchText };