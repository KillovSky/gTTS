<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" width="150" height="150" alt="logo_4devs.png"/></p>  
<h5 align="center"><a href="https://en.wikipedia.org/wiki/Google_logo">[Source: Wikipédia]</a></h5>  
  
## O que este módulo faz?  
- Ele utiliza o [Google](https://www.google.com) para gerar áudios utilizando um texto, chamado de Text to Speech ou, TTS.  
  
## Instalação:  
- Rode o código abaixo para instalar via `NPM`:  
  
```bash  
$ npm i @killovsky/gtts  
```  
  
- Rode o código abaixo para instalar via `git`:  
```bash  
$ git clone https://github.com/KillovSky/gTTS.git  
```  
  
## O que este módulo tem de especial?  
- Assim como o da [NASA](https://github.com/KillovSky/NASA), muitas coisas, confira abaixo:  
  
------  
> 1. Neste módulo, os erros não afetam o funcionamento, o que significa que apesar de qualquer erro, os valores 'sempre' estarão lá para que você não seja afetado.  
>  
> 2. Os erros serão inseridos na resposta com uma explicação sobre o que causou eles, facilitando para você entender.  
>  
> 3. A falta de especificação de um parâmetro retornará um áudio padrão, impedindo que você sofra falhas graves.  
>  
> 4. Os headers estão inseridos na resposta, facilitando para saber detalhes que podem lhe ser uteis.  
>  
> 5. Não existem dependências de módulos de terceiro, tudo é feito usando o puro `Node.js`.  
>  
> 6. Cada linha do código possui uma explicação do que está rodando ou vai rodar, ou seja, o código INTEIRO é explicado, linha por linha.  
>  
> 7. É 'ilimitado', permite o download do arquivo de som, assim como retornará uma buffer, caso você prefira desta forma.  
>  
> 8. E muitas outras coisas, confira o código para entender!  
------  
  
## Como testar este módulo:  
- Basta abrir um terminal na pasta do módulo e digitar:  
  
```bash  
$ npm test  
```  
  
## Como utilizar este módulo:  
- Existem diversas formas de utilizar, mas como se trata de um script que faz uso de `Promises`, irei dar dois exemplos que funcionam bem, lembrando, caso você não especifique nada, retornará um valor padrão.   
  
<details>  
<summary><code>[Clique para exibir] → Descrição de cada parâmetro da execução:</code></summary>  
  
```javascript  
// Function especificada  
create('LANGUAGE', 'TEXT', 'DOWNLOAD', 'PATH')  
  
// Function sem especificar, retornará a resposta padrão  
create()  
  
// Retorna os idiomas compatíveis em Object  
languages()  
  
/* ------------------------------------- *  
* 1° - LANGUAGE  
* Valores: string  
* Padrão: 'en'  
* Idiomas: af, ar, ca, cs, cy, da, de, el, en, en-au, en-uk, en-us, eo, es, es-es...  
* ...es-us, fi, fr, hi, hr, ht, hu, hy, id, is, it, ja, ko, la, lv, mk, nl, no...  
* ...pl, pt, pt-br, ro, ru, sk, sq, sr, sv, sw, ta, th, tr, vi, zh, zh-cn, zh-tw, zh-yue  
* ---------------------------------  
* 2° - TEXT  
* Valores: string    
* Padrão: ''  
* ---------------------------------  
* 3° - DOWNLOAD  
* Valores: boolean [false/true]  
* Padrão: false  
* ---------------------------------  
* 4° - PATH [NO FILENAME]  
* Valores: string  
* Padrão: ''  
* Aviso: Não insira um nome de arquivo no PATH, ele é gerado automaticamente!  
* ------------------------------------- */  
```  
  
</details>   
  
<details>  
<summary><code>Exemplos de uso:</code></summary>  
  
```javascript  
// Usando .then | Modo de uso padrão  
const gtts = require('@killovsky/gtts');  
gtts.create('LANGUAGE', 'TEXT', 'DOWNLOAD', 'PATH').then(data => {  
	// Faça seu código baseado na object 'data' aqui  
	// Exemplo: console.log(data);  
})  
  
// Usando await [async] | Modo de uso padrão  
const gtts = require('@killovsky/gtts');  
const data = await gtts.create('LANGUAGE', 'TEXT', 'DOWNLOAD', 'PATH');  
// Faça seu código aqui usando a const 'data'  
// Exemplo: console.log(data);  
```  
  
</details>  
  
<details>  
<summary><code>Código já prontos [.then]:</code></summary>  
  
```javascript  
// Código usando .then  
const gtts = require('@killovsky/gtts');  
gtts.create('en', 'I love you', true, './').then(data => console.log(data));  
```  
  
</details>  
  
<details>  
<summary><code>Código já prontos [async/await]:</code></summary>  
  
```javascript  
// Código usando await 
const gtts = require('@killovsky/gtts');  
const data = await gtts.create('en', 'I love you', true, './');  
console.log(data);  
  
// Se você não sabe criar uma função async ou ainda não tiver uma, use este código abaixo:  
(async () => {  
	// Cole um código com await aqui dentro  
})();  
```  
  
</details>  
  
<details>  
<summary><code>Exemplo de resultado com explicações:</code></summary>  
  
```JSON  
{  
	"date": "String | Data [YYYY-MM-DD HH:MM:SS]",  
	"error": "true | false",  
	"dev_msg": "String / false | Mensagem adicional de erro",  
	"error_msg": "String / false | Códigos de erros de execução",   
	"code": "Number | String | Código de erro HTTP",  
	"explain": {  
		"code": "Number / String | Código escrito de HTTP",  
		"why": "String | Explicação do código HTTP"  
	},  
	"headers": {  
		"date": "String | Data escrita da requisição",  
		"content-type": "String | Tipo de resposta",  
		"Outros": "E vários outros headers, faça uma requisição para obter todos."  
	},  
	"gtts": {  
		"local": "String | Local do download, se requisitado",  
		"buffer": "Buffer | Buffer do arquivo para utilização"  
	}  
}  
```  
  
</details>  
  
<details>  
<summary><code>Exemplo utilizável de resultado:</code></summary>  
  
```JSON  
{  
	"date": "22/07/2022 01:06:05",  
	"error": false,  
	"dev_msg": false,  
	"error_msg": false,  
	"code": 200,  
	"explain": {  
		"code": "OK",  
		"why": "The request is OK, this response depends on the HTTP method used."  
	},  
	"headers": {  
		"content-type": "audio/mpeg",  
		"cache-control": "no-cache, no-store, max-age=0, must-revalidate",  
		"pragma": "no-cache",  
		"date": "Sat, 23 Jul 2022 03:52:11 GMT"  
	},  
	"gtts": {  
		"local": "C:\\Users\\[My_User]\\Documents\\GitHub\\gTTS\\Samples\\test.mp3",  
		"buffer": "Not available in default JSON."  
	}  
}  
```  
  
</details>   
  
## Perguntas e Respostas:  
  
- Isso é bem similar ao seu módulo do Projeto APOD da NASA, não é?  
> Sim, é por que quero criar sistemas fáceis de entender e usar, decidi que a melhor forma seria fazendo eles de forma similar, deixando o código bem simples para qualquer um que vier de outros projetos meus.  
>  
- Por que não usou `axios` ou módulos do tipo?  
> Esse meio exige instalação de módulos de terceiro, quero fazer meus sistemas sem dependências, nada além do próprio `Node.js`, pois tenho foco em uma única tarefa: ser simples.  
>  
- O que é proibido ao usar este módulo?  
> Você jamais deve abusar de qualquer programa, sempre crie um limitador de tempo ou armazene a ultima resposta e use ela, evite ficar utilizando um programa deste estilo muitas vezes seguidas sem esperar.  
  
## Suporte  
  
- Se obtiver algum problema, você pode me dizer [Reportando nas Issues](https://github.com/KillovSky/gTTS/issues).  
- Confira outros projetos meus [Acessando Isto](https://github.com/KillovSky).  
- Se gostar, doe para me ajudar a continuar desenvolvendo, mais informações [Clicando Aqui](http://htmlpreview.github.io/?https://github.com/KillovSky/iris/blob/main/.readme/donates/page.html) - [Página do Projeto Íris]  
  