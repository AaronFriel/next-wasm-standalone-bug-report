import ClientComponent from './client-component';
import { tokenTest } from './lib/tokenTest';

export default function Page() {
  const { tokens, text } = tokenTest();
  return (
    <>
      <h1>Server component</h1>
      <p>Tokens: {tokens}</p>
      <p>Text: {text}</p>
      <ClientComponent/>
    </>
  );
}
