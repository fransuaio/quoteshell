#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const log = console.log;

const axios = require('axios');

  axios('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback')
    .then((quote) => {
      const quoteStringRaw = quote.data;	
      const quoteArrRaw = quote.data.split("");      
	    const limit = quoteArrRaw.length - 1;
      let dataString = '';
      quoteArrRaw.map( (c, i) => {
  	    if (i >= 0 && i <= 15) {

        } else if (i <= limit - 2) {
            dataString += c
        }       
      })
    
      const quoteRaw = JSON.parse(dataString);
      const author = quoteRaw.title;
      const quoteTextRaw = quoteRaw.content.split("");
      const phraseLength = quoteTextRaw.length - 1;
      let phraseClean = '';
    
      quoteTextRaw.map((c, i) => {
        if (i <= 2) {
        } else if (i <= phraseLength - 6){          
           phraseClean += c;
        }       
      })
      
      log(chalk.cyan(phraseClean)+'\n \t \t -- '+chalk.bgBlackBright(author));

    })

    .catch( (error) => {
      if (error == 'Error: getaddrinfo EAI_AGAIN quotesondesign.com:80')
      log(chalk.red('Please check your internet connection :('));
    })

