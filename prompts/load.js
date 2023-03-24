import { loadPrompt } from "langchain/prompts";
const prompt = await loadPrompt("lc://prompts/memory/summarize/prompt.json");
const res = await prompt.format({
    summary: "This is a test summary",
    new_lines: 'jjj'
});
console.log({ res });
