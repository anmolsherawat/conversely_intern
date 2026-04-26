export type ReviewStatus = 'pending' | 'reviewed' | 'snoozed' | 'escalated';
export type ReviewPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ReviewRisk = 'low' | 'medium' | 'high';

export interface ReviewItem {
  id: string;
  title: string;
  summary: string;
  status: ReviewStatus;
  priority: ReviewPriority;
  source: string;
  owner: string | null;
  tags: string[];
  createdAt: string;
  score: number;
  risk: ReviewRisk;
  metadata?: Record<string, any>;
}

export interface ReviewFilters {
  search: string;
  status: ReviewStatus[];
  priority: ReviewPriority[];
  risk: ReviewRisk[];
  owner: string | null;
}

export type SortField = 'createdAt' | 'priority' | 'score';
export type SortOrder = 'asc' | 'desc';

export interface ReviewSort {
  field: SortField;
  order: SortOrder;
}
