import { useState } from 'react';

interface UseGeminiReturn {
  callGemini: (_prompt: string) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useGemini(): UseGeminiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callGemini = async (prompt: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data: any = await res.json();

      // Extract text from Gemini response safely
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
      console.log(text);

      return text;
    } catch (err) {
      console.error('Gemini API Error:', err);
      setError('Failed to fetch from Gemini');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callGemini, loading, error };
}
