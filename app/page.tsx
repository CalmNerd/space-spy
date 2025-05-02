
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Space Spy</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Recent Transcriptions</h3>
          <p className="text-sm text-muted-foreground">Your latest transcribed content will appear here.</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Trending Topics</h3>
          <p className="text-sm text-muted-foreground">Popular discussions and trending spaces.</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Start transcribing or explore spaces.</p>
        </div>
      </div>

    </div>
  );
}