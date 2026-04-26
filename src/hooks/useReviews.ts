import { useState, useEffect, useCallback } from 'react';
import type { ReviewItem, ReviewFilters, ReviewSort } from '../types/review';
import { ReviewService } from '../services/ReviewService';

const reviewService = new ReviewService();

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ReviewFilters>(() => {
    const saved = localStorage.getItem('review_filters');
    return saved ? JSON.parse(saved) : {
      search: '',
      status: [],
      priority: [],
      risk: [],
      owner: null,
    };
  });

  const [sort, setSort] = useState<ReviewSort>(() => {
    const saved = localStorage.getItem('review_sort');
    return saved ? JSON.parse(saved) : {
      field: 'createdAt',
      order: 'desc',
    };
  });

  useEffect(() => {
    localStorage.setItem('review_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('review_sort', JSON.stringify(sort));
  }, [sort]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewService.getProcessedReviews(filters, sort);
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    filters,
    setFilters,
    sort,
    setSort,
    refresh: fetchReviews,
  };
}
