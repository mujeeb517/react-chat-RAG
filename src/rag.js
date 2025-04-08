import openai, { supabase } from './config';

// Create an embedding vector representing the query
async function createEmbedding(input) {
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input
    });
    return embeddingResponse.data[0].embedding;
}

// Query Supabase and return a semantically matching text chunk
async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc('match_movies', {
        query_embedding: embedding,
        match_threshold: 0.50,
        match_count: 4
    });

    // Manage multiple returned matches
    const match = data.map(obj => obj.content).join('\n');
    return match;
}

// Use OpenAI to make the response conversational
const chatMessages = [{
    role: 'system',
    content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`
}];

async function getChatCompletion(text, query) {
    chatMessages.push({
        role: 'user',
        content: `Context: ${text} Question: ${query}`
    });

    const { choices } = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: chatMessages,
        temperature: 0.65,
        frequency_penalty: 0.5
    });
    return choices[0].message.content;
}

async function getResponse(input) {
    try {
        const embedding = await createEmbedding(input);
        const match = await findNearestMatch(embedding);
        return getChatCompletion(match, input);
    } catch (err) {
        console.error(err);
    }
}

export default getResponse;