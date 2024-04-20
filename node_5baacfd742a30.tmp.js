const pup = require('puppeteer');

const url = "https://www.amazon.com.br/ref=nav_logo";
const searchFor = "Mais vendidos";

(async () => {
    try {
        const browser = await pup.launch({
            headless: true // Define o navegador para ser executado em modo headless
        });
        console.log("iniciei");
        //redireciona pra url que definimos
        await page.goto(url);
        console.log("fui para a url");
        await browser.close();
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
})();
