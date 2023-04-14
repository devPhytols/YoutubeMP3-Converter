// Importação de bibliotecas
const express = require('express');
const app = express();
const ytdl = require('ytdl-core');

// Definindo o express
app.use(express.urlencoded({ extended: true })); // Para lidar com dados do formulário
app.use(express.static("public")); // Define uma pasta pública para arquivos estáticos
app.set('view engine', 'ejs'); // Utiliza ejs para renderizar páginas estáticas

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rota de download secundária
app.get('/download', async (req, res) => {
    const url = req.query.resultado;
    const quality = req.query.quality || 'highest';
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const stream = ytdl(url, { format: 'mp3', filter: 'audioonly', quality: quality });
    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
    stream.pipe(res);
});
  
// Capturar rotas inválidas
app.use((req, res) => {
  res.redirect('/');
});

// Inicia o servidor express na porta
app.listen(80, () => {
  console.log('Online!');
});
