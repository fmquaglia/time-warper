import { OpenAIChat } from "langchain/llms";
import { CallbackManager } from "langchain/callbacks";
import { config } from 'dotenv';

//create our callback manager
config({
    path: `../.env`,
})

const callbackManager = CallbackManager.fromHandlers({
    handleLLMStart: async (llm, prompts) => {
        console.log(JSON.stringify(llm, null, 2));
        console.log(JSON.stringify(prompts, null, 2));
    },
    handleLLMEnd: async (output) => {
        console.log(JSON.stringify(output, null, 2));
    },
    handleLLMError: async (err) => {
        console.error(err);
    },
});

//create our model and pass it the callback manager

export const model = new OpenAIChat({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    prefixMessages: 'history',
    temperature: 1,
    verbose: true,
    callbackManager,
});

