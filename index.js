"use strict";
const https = require('https');
const path = require('path');
const fs = require('fs');
const httpcodes = require('./JSON/codes.json');
const default_tts = require('./JSON/default.json');
const default_lang = require('./JSON/languages.json');
const ualist = require('./JSON/UA.json');

/*######################################################################################
#
# Por que fiz a linguagem em inglês? 
# R: Pois eu gosto deste idioma e quis seguir o padrão como quase todos os outros devs.
#
# Esse código pode ser copiado para criar algo diferente, novo, superior ou etc?
# R: É claro! Mas você >PRECISA< manter o copyright, leia mais da licença abaixo.
#
# Por que este código parece igual ao seu outro da NASA?
# R: Por que eu quis fazer algo confortável para quem veio de outros projetos meus.
# R: Ou seja, quis manter o mesmo formato para facilitar, e vou continuar fazendo isso.
#
########################################################################################
#
#	MIT License
#
#	Copyright (c) 2022 KillovSky - Lucas R.
#
#	Permission is hereby granted, free of charge, to any person obtaining a copy
#	of this software and associated documentation files (the "Software"), to deal
#	in the Software without restriction, including without limitation the rights
#	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#	copies of the Software, and to permit persons to whom the Software is
#	furnished to do so, subject to the following conditions:
#
#	The above copyright notice and this permission notice shall be included in all
#	copies or substantial portions of the Software.
#
#	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#	SOFTWARE.
#
######################################################################################*/

/* Cria a exports para atuar como função */
exports.create = (
	lang = 'en',
	text = '',
	download = false,
	download_path = ''
) => {

	/* Promise para utilização de .then | await */
	return new Promise((resolve, reject) => {

		/* Cria a object de return em casos de erros, não afetando o usuário mas permitindo que ele saiba quando der erro */
		const response = default_tts[Math.floor(Math.random() * default_tts.length)];

		/* Insere a data do dia */
		let today = new Date();
		response.date = today.toLocaleString();

		/* Inserta valores padrões */
		var language = lang.toLowerCase() || 'en';

		/* Caso seja um teste do test.js */
		if (language == 'just_a_test') {
			response.gtts.local = path.join(__dirname, '/samples/test.mp3');
			return resolve(response);
		}

		/* Caso a language não seja usável */
		if (!Object.keys(default_lang).includes(language)) {
			response.error_msg = `The specified language [${language}] is not supported, using "en" by default`;
			language = 'en';
		}

		/* Retorna um erro de forma 'simples' para não afetar o usuário, devido a não especificar o valor */
		if (text == '' || text == null) {
			response.error = true;
			response.gtts.local = path.join(__dirname, '/samples/error.mp3');
			response.error_msg = "You didn't define what should be said";
			return resolve(response);
		}

		/* Try - Catch para caso dê um erro pior */
		try {

			/* Limita os caracteres para dar múltiplos requests de forma segura */
			const texts = text.match(/[\s\S]{1,100}(?!\S)|[\s\S]{1,100}/g).map(e => e.trim());

			/* Define uma map que retorna promises */
			const promises = texts.map(async (part, idx) => {

				/* Promise para usar no Promise.all */
				return new Promise((resolve, reject) => {

					/* Var para armazenar a chunk */
					var data = [];

					/* Define uma user-agent 'fake' para impedir bloqueios */
					let useragent = ualist[Math.floor(Math.random() * ualist.length)];

					/* Opções de acesso */
					let options = {
						hostname: 'translate.google.com',
						path: `/translate_tts?ie=UTF-8&tl=${language}&q=${encodeURIComponent(part)}&total=${part.length}&idx=${idx}&client=tw-ob&textlen=${part.length}`,
						method: 'GET',
						headers: {
							'User-Agent': useragent
						}
					};

					/* Faz a requisição */
					https.get(options, function(res) {

						/* Edita a object padrão de casos de erro, atualiza a cada request */
						response.code = res.statusCode;
						response.explain = httpcodes[res.statusCode];
						response.headers = res.headers;

						/* Recebe a chunk */
						res.on('data', function(chunk) {
							data.push(Buffer.from(chunk));
						});

						/* Em caso de falhas */
						res.on("error", function(err) {
							response.error = true;
							response.code = err.code;
							response.error_msg = err.message;
						});

						/* Finaliza pois o resultado foi completamente recebido */
						res.on('end', function() {

							/* Transforma a 'mybuff' no buffer */
							return resolve(Buffer.concat(data));
							
						});
						
					});
					
				});
				
			});

			/* Espera o map ser finalizado para então continuar */
			Promise.all(promises).then(res => {

				/* Insere a Buffer na response */
				response.gtts.buffer = Buffer.concat(res);

				/* Faz o download do TTS */
				if (download == true) {

					/* Caso o local não seja especificado */
					if (download_path == '' || download_path == null) {
						if (!fs.existsSync('./gTTS')) {
							fs.mkdirSync('./gTTS/');
						}
						download_path = './gTTS/';
						response.dev_msg = 'Download place is not available, using "./gTTS/".';
					}

					/* checa se o local especificado é válido */
					if (fs.existsSync(path.normalize(download_path))) {

						/* Local de download normalizado */
						let path_mpeg = path.resolve(download_path + Date.now().toString() + '.mp3');

						/* Escreve em disco */
						fs.writeFileSync(path_mpeg, response.gtts.buffer);

						/* Troca a response.gtts pro local de download */
						response.gtts.local = path_mpeg;

						/* Informa se o local não é valido */
					} else {
						response.error = true;
						response.dev_msg = "The specified path doesn't exist but you can download it using 'fs + gtts.buffer' as the key contains audio buffer";
					}

					/* Retorna os valores */
					return resolve(response);

					/* Retorna a response com buffer dentro da response.gtts */
				} else {
					response.gtts.local = 'Download not requested';
					return resolve(response);
				}
				
			});

			/* Caso algo der errado */
		} catch (error) {
			response.error = true;
			response.code = error.code;
			response.error_msg = error.message;
			return resolve(response);
		}
		
	});

};

/* Idiomas */
exports.languages = () => default_lang;