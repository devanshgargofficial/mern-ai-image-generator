import starryai from '@api/starryai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Authenticate with the API key
const apiKey = process.env.STARRYAI_API_KEY;
starryai.auth(apiKey);

// Function to test the API
const testStarryAI = async () => {
  try {
    const response = await starryai.new_creation_creations__post({
      prompt: 'A beautiful sunset over the mountains',
      negativePrompt: '',
      model: 'lyra',
      aspectRatio: 'square',
      highResolution: false,
      images: 1,
      seed: 0,
      steps: 20,
      initialImageUrl: '',
      initialImageEncoded: '',
      initialImageMode: 'color',
      initialImageStrength: 0
    });
    console.log('response is',response);
    starryai.get_creation_creations__creation_id__get({creation_id: '107663'})
  .then(({ data }) => console.log('Data is',data))
  .catch(err => console.error(err));

    // const imageUrl = response.data.images[0].url; // Get the image URL
    // const imagePath = path.join(__dirname, 'generated_image.png');

    // // Download the image and save it locally
    // const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    // fs.writeFileSync(imagePath, imageResponse.data);
    // console.log(`Image saved to ${imagePath}`);
  } catch (error) {
    console.error('Error is:', error);
  }
};

// Call the function to test the API
testStarryAI();