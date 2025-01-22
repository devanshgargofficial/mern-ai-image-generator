import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
// console.log(FREEPIK_API_KEY);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });


  router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-freepik-api-key': FREEPIK_API_KEY},
        body: JSON.stringify({ prompt: prompt })
      };
      
     // https://api.freepik.com/v1/ai/text-to-image
     try {
      const aiResponse = await fetch('https://api.freepik.com/v1/ai/text-to-image', options)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          });
  
      // Ensure the response structure is as expected
      if (!aiResponse || !aiResponse.data || !aiResponse.data.length) {
          throw new Error('Invalid API response: Missing data array');
      }
  
      // Get the first base64 image from the data array
      const image = aiResponse.data[0].base64;
      
    // Send the final response to the client
    res.status(200).json({ photo: image });
} catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the image' });
}

} catch (error) {
    console.error(error);
    res.status(500).send(error)
    // res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});
export default router;
