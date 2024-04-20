const pup = require('puppeteer');

const url = "https://www.mercadolivre.com.br";
const searchFor = "Mais vendidos";

(async () => {
    try {
        const browser = await pup.launch({headless: false}); // iniciar o nosso navegador
        const page = await browser.newPage(); 
        console.log("iniciei");
        //redireciona pra url que definimos
        await page.goto(url);
        console.log("fui para a url");
       
        await page.waitForSelector('#cb1-edit'); // função para esperar primeiro digitar e depois pesquisar 

        await page.type("#cb1-edit", searchFor);

        await Promise.all([
            page.waitForNavigation(),
            page.click('.nav-search-btn')
        ]);

        const produtos = await page.$$eval('.ui-search-result__image > a' , el => el.map(link => link.href));
        console.log(produtos);
       
         // await browser.close();
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
})();
