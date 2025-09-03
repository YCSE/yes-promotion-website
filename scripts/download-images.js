const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  // Student images
  { url: 'http://localhost:3845/assets/28cea47f21378c8fbb3818abf923098943012b80.png', filename: 'student1.png' },
  { url: 'http://localhost:3845/assets/9fcd616ca67ad32c829e5e5879e5da07e0dd5f66.png', filename: 'student2.png' },
  { url: 'http://localhost:3845/assets/c7e1f82e4c09f1e0e37ed2e008b5f5cbfbb3f50f.png', filename: 'student3.png' },
  { url: 'http://localhost:3845/assets/71e8c7faa2e66f2f4b8e1f8bb3f92b967c0d9c81.png', filename: 'student4.png' },
  { url: 'http://localhost:3845/assets/2fbb916b97eb8bb1ac0c2a35b96e690af7aad48d.png', filename: 'student5.png' },
  { url: 'http://localhost:3845/assets/ab6b13f8094fa1fa14b0e2e0b7f37b99e8e8de1e.png', filename: 'student6.png' },
  { url: 'http://localhost:3845/assets/6f088e96e08c6ad977f0ebde009c64cf1baa8f24.png', filename: 'student7.png' },
  { url: 'http://localhost:3845/assets/b06a88e20f3bb088c5e4e4f03a56c17ea0f0dcb2.png', filename: 'student8.png' },
  { url: 'http://localhost:3845/assets/cf11e0e956dcfa2fc4ac982bc9a96b0c3ba7c7e2.png', filename: 'student9.png' },
  { url: 'http://localhost:3845/assets/ac387e0c99cf0e977e9f7d1797b7b69c0581b62b.png', filename: 'student10.png' },
  // Teacher images
  { url: 'http://localhost:3845/assets/36ab02028711e75cd6b929084948827567f85787.png', filename: 'teacher1.png' },
  { url: 'http://localhost:3845/assets/e7c81f088fdc087a73c9db6f89e78d87dc7c8798.png', filename: 'teacher2.png' },
  { url: 'http://localhost:3845/assets/39b5b656c087bdd4c09c0e5fba4ebccce91c3233.png', filename: 'teacher3.png' },
  { url: 'http://localhost:3845/assets/97a1fb9ae5e91cb03f8b42e8f7f7e088a8e0dcb2.png', filename: 'teacher4.png' },
  { url: 'http://localhost:3845/assets/dc787e7b973a9098dc972b9b7d8a50b1e087ebff.png', filename: 'teacher5.png' },
  { url: 'http://localhost:3845/assets/86cd98d098ff1fc84deac088c9b9ec890b87f887.png', filename: 'teacher6.png' },
  { url: 'http://localhost:3845/assets/48a9089dc1779f86fbf1d978a89cc7e80d1c0879.png', filename: 'teacher7.png' },
  { url: 'http://localhost:3845/assets/98708accd089e79c81e080f087da9e089c87987f.png', filename: 'teacher8.png' },
  { url: 'http://localhost:3845/assets/39b5b656c087bdd4c09c0e5fba4ebccce91c3233.png', filename: 'teacher9.png' },
  { url: 'http://localhost:3845/assets/dc787e7b973a9098dc972b9b7d8a50b1e087ebff.png', filename: 'teacher10.png' }
];

// Download function
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : require('http');
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async
      console.error(`Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
}

// Download all images
async function downloadAll() {
  for (const img of images) {
    const filepath = path.join(__dirname, '../public/images/hero', img.filename);
    try {
      await downloadImage(img.url, filepath);
    } catch (error) {
      console.log(`Skipping ${img.filename} - unable to download from Figma`);
    }
  }
  console.log('Download process completed');
}

downloadAll();