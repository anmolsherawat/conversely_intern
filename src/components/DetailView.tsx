import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, AlertTriangle, MessageSquare, ExternalLink, User, Tag } from 'lucide-react';
import type { ReviewItem } from '../types/review';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';
import { format } from 'date-fns';

interface DetailViewProps {
  item: ReviewItem | null;
  onClose: () => void;
  onAction: (id: string, action: string) => void;
}

export function DetailView({ item, onClose, onAction }: DetailViewProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l z-50 overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-2">
              <Badge variant="outline">{item.status.toUpperCase()}</Badge>
              <Badge variant={item.priority === 'urgent' ? 'destructive' : 'secondary'}>
                {item.priority.toUpperCase()} PRIORITY
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight">
            {item.title}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Owner: {item.owner || 'Unassigned'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Created: {format(new Date(item.createdAt), 'MMM d, h:mm a')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4" />
              <span>Source: {item.source}</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Summary</h3>
              <p className="text-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
                {item.summary}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="pt-8 border-t">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="flex items-center gap-2" 
                  onClick={() => onAction(item.id, 'reviewed')}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Reviewed
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => onAction(item.id, 'snooze')}
                >
                  <Clock className="w-4 h-4" />
                  Snooze
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => onAction(item.id, 'escalate')}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Escalate
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => onAction(item.id, 'note')}
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Note
                </Button>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
