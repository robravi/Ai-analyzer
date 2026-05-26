import { HistoryList } from "@/components/history-list";

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analysis History</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your past resume analyses.
        </p>
      </div>
      <HistoryList />
    </div>
  );
}
