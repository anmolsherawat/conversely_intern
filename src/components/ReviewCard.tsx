import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Clock, User, Tag, ChevronRight } from 'lucide-react';
import type { ReviewItem, ReviewPriority, ReviewRisk } from '../types/review';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

interface ReviewCardProps {
  item: ReviewItem;
  onClick: (item: ReviewItem) => void;
  isCompact?: boolean;
}

const priorityConfig: Record<ReviewPriority, { variant: any; label: string }> = {
  urgent: { variant: 'destructive', label: 'Urgent' },
  high: { variant: 'warning', label: 'High' },
  medium: { variant: 'info', label: 'Medium' },
  low: { variant: 'secondary', label: 'Low' },
};

const riskConfig: Record<ReviewRisk, { color: string }> = {
  high: { color: 'text-destructive' },
  medium: { color: 'text-yellow-600 dark:text-yellow-400' },
  low: { color: 'text-green-600 dark:text-green-400' },
};

export function ReviewCard({ item, onClick, isCompact }: ReviewCardProps) {
  return (
    <div
      onClick={() => onClick(item)}
      className={cn(
        "group relative flex flex-col border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer",
        isCompact ? "p-3" : "p-4"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center">
          <Badge variant={priorityConfig[item.priority].variant}>
            {priorityConfig[item.priority].label}
          </Badge>
          <span className={cn("text-xs font-medium flex items-center gap-1", riskConfig[item.risk].color)}>
            <AlertCircle className="w-3 h-3" />
            {item.risk.toUpperCase()} RISK
          </span>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDistanceToNow(new Date(item.createdAt))} ago
        </span>
      </div>

      <h3 className={cn("font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1", isCompact ? "text-sm" : "text-base")}>
        {item.title}
      </h3>
      
      {!isCompact && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.summary}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground flex items-center gap-1">
              <Tag className="w-2 h-2" />
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && <span className="text-[10px] text-muted-foreground">+{item.tags.length - 3} more</span>}
        </div>

        <div className="flex items-center gap-2">
          {item.owner && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              {item.owner}
            </div>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
