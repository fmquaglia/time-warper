import { OpenAI } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { config } from 'dotenv';

config({
    path: '../.env',
})

const model = new OpenAI({});
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory });
const res1 = await chain.call({ input: "Hi! I'm Jim." });
const res2 = await chain.call({ input: "What's my name?" });
console.log(res1);
console.log(res2);
