import { HistoryList } from "@/components/history-list";

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your past resume analyses.
        </p>
      </div>
      <HistoryList />
    </div>
  );
}
