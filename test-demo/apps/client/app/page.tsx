export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to test-demo</h1>
      <p>Your monorepo is ready to go! 🚀</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Directory Structure:</h2>
        <ul>
          <li><strong>apps/api</strong> - Hono API server</li>
          <li><strong>apps/client</strong> - Next.js application</li>
          <li><strong>packages/auth</strong> - Authentication utilities</li>
          <li><strong>packages/database</strong> - Database setup</li>
          <li><strong>packages/shared</strong> - Shared utilities</li>
          <li><strong>packages/web-ui</strong> - UI component library</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Next Steps:</h2>
        <ol>
          <li>Run <code>bun install</code> to install dependencies</li>
          <li>Run <code>bun run dev</code> to start development servers</li>
          <li>Start building your application!</li>
        </ol>
      </div>
    </main>
  );
}
