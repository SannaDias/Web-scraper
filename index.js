const pup = require('puppeteer');

const url = "https://www.mercadolivre.com.br";
const searchFor = "mais vendidos bestseller";

let c = 1;
const list = [];


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

        const links = await page.$$eval('.ui-search-item__group > a' , el => el.map(link => link.href));
        
        
       
        //iterar sobre os itens
        for(const link of links){
            console.log("pagina", c);
            await page.goto(link);
            await page.waitForSelector('.ui-pdp-title'); // mostra apenas a parte da pagina que queremos carregar 

            const title = await page.$eval('.ui-pdp-title', Element => Element.innerText);
            const price = await page.$eval('.andes-money-amount__fraction', element => element.innerText);

            const seller = await page.evaluate(() => {
                const el = document.querySelector('.andes-tooltip__trigger');
                if(!el) return null
                return el.innerText;
            })

            //mostrando os elemntos dentro de um obj para leitura
            const obj ={};
            obj.title = title;
            obj.price = price;
            (seller ? obj.seller = seller : '');
            obj.link = link;

            list.push(obj);

            console.log(list);


            c++
        }
       
        // await page.waitForTimeout(2000);
        await browser.close();
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
})();
