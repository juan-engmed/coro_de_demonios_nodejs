const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

//DATABASE
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão DB com sucesso")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Definindo o EJS
app.set('view engine', 'ejs');

//Adicionando arquivos estáticos (css, js de frontend, img) -> pasta: public é o padrão
app.use(express.static('public'));

//Configuração Body Parser 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ==== ROTAS DA APLICAÇÃO ====
app.get('/', (req,res)=>{

    //Metodo para buscar tudo no banco
    Pergunta.findAll({ raw: true, order:[['id','DESC' ]]
    }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    });
    
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})


//Recebendo dados do formulário 
app.post('/salvarpergunta',(req,res)=>{

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    //Método para salvar na tabela
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/');
    }).catch(()=>{
        res.send('Dados não salvos');
    })
});

app.get('/pergunta/:id', (req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where: {id : id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render('pergunta',{
                pergunta: pergunta
            });
        }else{ //ID da pergunta nao encontrada
            res.redirect('/')
        }
    })
});



// === INICIANDO SERVIDOR === 
app.listen(7000, ()=>{
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