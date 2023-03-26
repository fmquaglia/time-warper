import { ChatOpenAI } from "langchain/chat_models";
import {
    ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder,
    SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';

import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {config} from 'dotenv';

config({
    path: '../.env'
})

const chat = new ChatOpenAI({ temperature: 0 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
        'The following is a friendly conversation between a human ' +
        'and an AI. The AI is talkative and provides lots of specific ' +
        'details from its context. If the AI does not know the answer to a ' +
        'question, it truthfully says it does not know.',
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
]);

const chain = new ConversationChain({
    memory: new BufferMemory({returnMessages: true, memoryKey: 'history'}),
    prompt: chatPrompt,
    llm: chat,
});


const responseD = await chain.call({
    input: 'hi I am Fabricio, from Buenos Aires!',
});
console.log({responseD});

const responseE = await chain.call({
    input: 'Do you know where I am and my name?',
});
console.log({responseE});
