import { PromptLayerOpenAI } from 'langchain/llms';
import { config } from 'dotenv';

config({
    path: `../.env`,
})

const model = new PromptLayerOpenAI({temperature: 0.9});
const res = await model.call(
    'What would be a good company name a company that makes colorful socks?',
);

console.log(res);
