import { Button, Input } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-6 py-24">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight">
            Later
          </h1>
          <p className="mt-2 text-muted">
            Simple. Clean. Dev-friendly.
          </p>
        </header>

        {/* Typography Demo */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-medium">Typography</h2>
          
          <div className="space-y-4 rounded-lg border border-border p-6">
            <div>
              <p className="text-sm text-muted">UI Font — System UI</p>
              <p className="text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted">Mono Font — JetBrains Mono</p>
              <code className="block rounded bg-foreground/5 px-3 py-2">
                const greeting = "Hello, World!";
              </code>
            </div>
          </div>
        </section>

        {/* Components Demo */}
        <section className="mb-16 space-y-6">
          <h2 className="text-xl font-medium">Components</h2>
          
          <div className="space-y-4 rounded-lg border border-border p-6">
            {/* Buttons */}
            <div className="space-y-2">
              <p className="text-sm text-muted">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-2">
              <p className="text-sm text-muted">Input (JetBrains Mono)</p>
              <Input placeholder="Type something..." />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-sm text-muted">
          Built with Next.js, Tailwind CSS, and TypeScript
        </footer>
      </main>
    </div>
  );
}
