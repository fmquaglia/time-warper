import { config } from 'dotenv';
import { OpenAI } from 'langchain/llms';
import { LLMChain } from "langchain/chains";
import { prompt } from './prompts/tech-summary.js';

config()

const model = new OpenAI({temperature: 0.9});
const chain = new LLMChain({llm: model, prompt});
const res = await chain.call({product: 'colorful socks'});
console.log(res);
// const response = await model.call(res);
// console.log(response);
