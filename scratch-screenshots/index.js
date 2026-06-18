const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting screenshot tool...');
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  
  // Set viewport to iPhone 14 dimensions (390 x 844)
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3 // High pixel density (Retina-like)
  });
  
  const htmlPath = 'c:/Users/Mariano HOUTCHOU/OneDrive/Documents/Tableau/tableau.html';
  const fileUrl = `file://${htmlPath}`;
  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations and custom fonts to load
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const artifactDir = 'C:/Users/Mariano HOUTCHOU/.gemini/antigravity-ide/brain/dafc1bef-cb74-47a2-8da5-af337e659f8b';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  // 1. Take a screenshot of the Header + Hero section (top viewport)
  console.log('Taking screenshot of Section 1 (Header + Hero)...');
  await page.screenshot({
    path: path.join(artifactDir, 'screenshot_1_hero.png')
  });

  // Retrieve the elements
  const sections = await page.$$('section');
  const footer = await page.$('footer');

  // 2. Screenshot Classement section (second section)
  if (sections[1]) {
    console.log('Taking screenshot of Section 2 (Classement)...');
    await sections[1].evaluate(el => el.scrollIntoView());
    await new Promise(resolve => setTimeout(resolve, 800)); // wait for transitions
    await sections[1].screenshot({
      path: path.join(artifactDir, 'screenshot_2_classement.png')
    });
  }

  // 3. Screenshot Barème section (third section)
  if (sections[2]) {
    console.log('Taking screenshot of Section 3 (Barème)...');
    await sections[2].evaluate(el => el.scrollIntoView());
    await new Promise(resolve => setTimeout(resolve, 800));
    await sections[2].screenshot({
      path: path.join(artifactDir, 'screenshot_3_bareme.png')
    });
  }

  // 4. Screenshot Titres section (fourth section)
  if (sections[3]) {
    console.log('Taking screenshot of Section 4 (Titres)...');
    await sections[3].evaluate(el => el.scrollIntoView());
    await new Promise(resolve => setTimeout(resolve, 800));
    await sections[3].screenshot({
      path: path.join(artifactDir, 'screenshot_4_titres.png')
    });
  }

  // 5. Screenshot Footer
  if (footer) {
    console.log('Taking screenshot of Footer...');
    await footer.evaluate(el => el.scrollIntoView());
    await new Promise(resolve => setTimeout(resolve, 800));
    await footer.screenshot({
      path: path.join(artifactDir, 'screenshot_5_footer.png')
    });
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
})().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
