import { Injectable } from '@nestjs/common';
// import {  } from "@google-cloud/translate";

// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
var projectId = 'studious-legend-328003',keyFilename= 'src/studious-legend-328003-00a72820390e.json'
const storage = new Storage({projectId, keyFilename});
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}



// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'שלום ביי ביי';
const target = 'en';




@Injectable()
export class TranslationService2 {
    constructor() {
        listBuckets();
        
    }
    async translateText() {
        console.log('func');
        
      // Translates the text into the target language. "text" can be a string for
      // translating a single piece of text, or an array of strings for translating
      // multiple texts.
      let [translations] = await translate.translate(text, target);
      translations = Array.isArray(translations) ? translations : [translations];
      console.log('Translations:');
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
      });
    }
    a() {
        console.log('f');
        return 'ff'
    }
}