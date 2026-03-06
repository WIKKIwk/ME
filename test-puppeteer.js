import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('response', response => {
        if (!response.ok() && response.url().includes('logo.png')) {
            console.log('HTTP ERROR (Logo):', response.status(), response.url());
        }
    });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const imgLogoSrc = await page.evaluate(() => {
        const logo = document.querySelector('.staggered-menu-header img');
        return logo ? logo.src : 'No Logo Found';
    });
    console.log('Logo Rendered Src:', imgLogoSrc);
    await browser.close();
})();
