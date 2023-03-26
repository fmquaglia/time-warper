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

const response = await chat.call([
    new SystemChatMessage(
        "You are a helpful assistant that translates English to French."
    ),
    new HumanChatMessage("Translate: I love programming."),
]);

console.log(response);

const responseC = await chat.generate([
    [
        new SystemChatMessage(
            "You are a helpful assistant that translates English to French."
        ),
        new HumanChatMessage(
            "Translate this sentence from English to French. I love programming."
        ),
    ],
    [
        new SystemChatMessage(
            "You are a helpful assistant that translates English to French."
        ),
        new HumanChatMessage(
            "Translate this sentence from English to French. I love artificial intelligence."
        ),
    ],
]);

console.log(JSON.stringify(responseC, null, 2));
