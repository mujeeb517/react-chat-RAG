import OpenAI from "openai";
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});


export const supabase = createClient(
    process.env.DB_URL,
    process.env.SUPABASE_KEY
);

export default openai;