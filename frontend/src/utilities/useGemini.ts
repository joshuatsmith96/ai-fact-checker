import { useState, useCallback } from 'react';

interface UseGeminiResult {
  text: string | null;
  loading: boolean;
  error: string | null;
  generateText: (_prompt: string) => Promise<string | null>;
}

export const useGemini = (): UseGeminiResult => {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = useCallback(async (prompt: string) => {
    setLoading(true);
    setError(null);
    setText(null);

    try {
      const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let message = 'Failed to fetch Gemini response';
        if (contentType?.includes('application/json')) {
          const data = await response.json().catch(() => null);
          if (data?.error) {message = data.error;}
        }
        throw new Error(message);
      }

      if (contentType?.includes('application/json')) {
        const data = await response.json();
        console.log("DATA", data)
        setText(data.text);
        return data.text;
      } else {
        const raw = await response.text();
        throw new Error(`Unexpected response: ${raw}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { text, loading, error, generateText };
};
