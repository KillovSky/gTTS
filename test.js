"use strict";
const gTTS = require('./index');

/* Inicia um teste sem fazer um get na 'API' */
gTTS.create('just_a_test', 'just_a_test', false, false).then(data => console.log(data));