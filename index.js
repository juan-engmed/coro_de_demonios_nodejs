const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Definindo o EJS
app.set('view engine', 'ejs');

//Adicionando arquivos estáticos (css, js de frontend, img) -> pasta: public é o padrão
app.use(express.static('public'));

//Configuração Body Parser 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROTAS DA APLICAÇÃO
app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})


//Recebendo dados do formulário 
app.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    res.send(` Titulo: ${titulo} e Descricao ${descricao}`)
})



//Iniciando Servidor
app.listen(8081, ()=>{
    console.log('Servidor Rodando')
});



/* app.get('/', (req,res)=>{

    let nome ='Juan';
    let lang ='JavaScript';    

    res.render('index',{
        nome: nome,
        lang: lang,
        empresa: 'Frogs Tech',
        inscritos: 8000,

        produtos: [
            {nome: 'Leite', preco: 5},
            {nome: "Lombo", preco: 20}
        ]
    })
}); */