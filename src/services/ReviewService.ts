import type { ReviewItem, ReviewFilters, ReviewSort } from '../types/review';
import { ReviewRepository } from '../repositories/ReviewRepository';

export class ReviewService {
  private repository: ReviewRepository;

  constructor() {
    this.repository = new ReviewRepository();
  }

  async getProcessedReviews(
    filters: ReviewFilters,
    sort: ReviewSort
  ): Promise<ReviewItem[]> {
    let reviews = await this.repository.getReviews();

    // Filtering
    reviews = reviews.filter((item) => {
      const matchesSearch = filters.search
        ? item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.summary.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
        : true;

      const matchesStatus = filters.status.length > 0
        ? filters.status.includes(item.status)
        : true;

      const matchesPriority = filters.priority.length > 0
        ? filters.priority.includes(item.priority)
        : true;

      const matchesRisk = filters.risk.length > 0
        ? filters.risk.includes(item.risk)
        : true;

      const matchesOwner = filters.owner !== null
        ? item.owner === filters.owner
        : true;

      return matchesSearch && matchesStatus && matchesPriority && matchesRisk && matchesOwner;
    });

    // Sorting
    reviews.sort((a, b) => {
      let comparison = 0;
      if (sort.field === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sort.field === 'priority') {
        const priorityMap = { urgent: 4, high: 3, medium: 2, low: 1 };
        comparison = priorityMap[a.priority] - priorityMap[b.priority];
      } else if (sort.field === 'score') {
        comparison = a.score - b.score;
      }

      return sort.order === 'asc' ? comparison : -comparison;
    });

    return reviews;
  }
}
