const OpenAI = require("openai");
// new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true // This is also the default, can be omitted
});


export async function sendMsgOpenAI(message) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": message }],
    max_tokens: 10,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return chatCompletion.choices[0].message.content;
}

