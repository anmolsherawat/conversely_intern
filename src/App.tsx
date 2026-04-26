import { useState, useEffect } from 'react';
import { useReviews } from './hooks/useReviews';
import { ReviewCard } from './components/ReviewCard';
import { Filters } from './components/Filters';
import { DetailView } from './components/DetailView';
import { Button } from './components/ui/Button';
import { LayoutGrid, List, RefreshCcw, Loader2, Search, ArrowUpDown } from 'lucide-react';
import type { ReviewItem, SortField } from './types/review';
import { cn } from './utils/cn';

function App() {
  const { reviews, loading, error, filters, setFilters, sort, setSort, refresh } = useReviews();
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [isCompact, setIsCompact] = useState(() => {
    return localStorage.getItem('ui_density') === 'compact';
  });

  useEffect(() => {
    localStorage.setItem('ui_density', isCompact ? 'compact' : 'comfortable');
  }, [isCompact]);

  // Command + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAction = (id: string, action: string) => {
    console.log(`Action ${action} on item ${id}`);
    // In a real app, this would call a service method
    setSelectedItem(null);
  };

  const handleSortChange = (field: SortField) => {
    setSort({
      field,
      order: sort.field === field && sort.order === 'desc' ? 'asc' : 'desc'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <RefreshCcw className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Signal Board</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCompact(!isCompact)}
              title={isCompact ? "Comfortable mode" : "Compact mode"}
            >
              {isCompact ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="flex-1">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <div className="flex border rounded-lg p-0.5 bg-muted/50">
              {(['createdAt', 'priority', 'score'] as SortField[]).map((field) => (
                <button
                  key={field}
                  onClick={() => handleSortChange(field)}
                  className={cn(
                    "px-3 py-1 rounded-md transition-all flex items-center gap-1.5 capitalize",
                    sort.field === field 
                      ? "bg-background shadow-sm text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {field === 'createdAt' ? 'Date' : field}
                  {sort.field === field && (
                    <ArrowUpDown className={cn("w-3 h-3 transition-transform", sort.order === 'asc' ? "" : "rotate-180")} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <h3 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={refresh}>Try Again</Button>
          </div>
        ) : loading && reviews.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-48 border rounded-lg bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No items found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
            <Button variant="outline" onClick={() => setFilters({ search: '', status: [], priority: [], risk: [], owner: null })}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4 transition-all duration-300",
            isCompact 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 lg:grid-cols-2"
          )}>
            {reviews.map((item) => (
              <ReviewCard
                key={item.id}
                item={item}
                isCompact={isCompact}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        )}
      </main>

      <DetailView
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAction={handleAction}
      />

      <footer className="border-t py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Signal Board. Built for speed and clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
