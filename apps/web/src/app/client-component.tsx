'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [clientResult, setClientResult] = useState<{ status: string; tokens?: number; text?: string }>({
    status: 'loading',
  });

  useEffect(() => {
    async function computeTokens() {
      const { tokenTest } = await import('./lib/tokenTest');
      const { status, tokens, text } = await tokenTest();
      setClientResult({ status, tokens, text });
    }
    computeTokens();
  }, [setClientResult]);

  const [apiResult, setApiResult] = useState<{ status: string; tokens?: number; text?: string }>({ status: 'loading' });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/token-test');
      try {
        const { text, tokens }: { text: string; tokens: number } = await response.json();
        setApiResult({ status: response.statusText, text, tokens });
      } catch {
        setApiResult({ status: response.statusText, text: '', tokens: Number.NaN });
      }
    }
    fetchData();
  }, [setApiResult]);

  return (
    <>
      <h1>Client component</h1>
      <p>Tokens: {clientResult.tokens}</p>
      <p>Text: {clientResult.text}</p>
      <h1>API route</h1>
      <p>Response status: {apiResult.status}</p>
      <p>Tokens: {apiResult.tokens}</p>
      <p>Text: {apiResult.text}</p>
    </>
  );
}
