import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { ReviewFilters, ReviewStatus, ReviewPriority } from '../types/review';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface FiltersProps {
  filters: ReviewFilters;
  onFilterChange: (filters: ReviewFilters) => void;
}

const statusOptions: ReviewStatus[] = ['pending', 'reviewed', 'snoozed', 'escalated'];
const priorityOptions: ReviewPriority[] = ['urgent', 'high', 'medium', 'low'];

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const toggleStatus = (status: ReviewStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatus });
  };

  const togglePriority = (priority: ReviewPriority) => {
    const newPriority = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    onFilterChange({ ...filters, priority: newPriority });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: [],
      priority: [],
      risk: [],
      owner: null,
    });
  };

  const hasActiveFilters = filters.status.length > 0 || filters.priority.length > 0 || filters.search !== '';

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search reviews, tags, or summaries... (Cmd + K)"
          id="search-input"
          className="w-full bg-background border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status:</span>
          <div className="flex gap-1">
            {statusOptions.map(status => (
              <Badge
                key={status}
                variant={filters.status.includes(status) ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => toggleStatus(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-border hidden md:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority:</span>
          <div className="flex gap-1">
            {priorityOptions.map(priority => (
              <Badge
                key={priority}
                variant={filters.priority.includes(priority) ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => togglePriority(priority)}
              >
                {priority}
              </Badge>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 ml-auto">
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
