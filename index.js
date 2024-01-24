const axios = require ('axios');
const cheerio = require ('cheerio');
const express = require ('express');
const { link } = require('fs');
const app = express()

const url = 'https://carlosdiazgirol.github.io/dashboard/'

//Librería AXIOS
app.get('/', (req, res) => {

    //Llamamos a axios
    axios.get(url).then((response) => {

        if(response.status === 200) {

            const html = response.data

            //Llamamos a cheerio
            const $ = cheerio.load(html)

            const pageTitle = $('title').text()

            //Método "each" de cheerio para recorrer enlances o imágenes
            const links = []
            const imgs = []

            $('a').each((index, element) => {
                const link = $(element).attr('href');
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img);
            })
            
            res.send(`
            <h1>${pageTitle}</h1>

            <h2>Enlaces</h2>
            <ul>
            ${links.map(link => `<li><a href="${url}${link}" target="_blank">${link}</a></li>`).join('')}
            </ul>

            <h2>Imágenes</h2>
            <ul>
            ${imgs.map(img => `<li><a href="${url}${img}" target="_blank">${img}</a></li>`).join('')}
            </ul>
            `)

            console.log(links);
            console.log(imgs);
        }
    })
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000')
})