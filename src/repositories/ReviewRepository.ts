import type { ReviewItem } from '../types/review';
import { MOCK_REVIEWS } from '../data/mock-reviews';

export interface IReviewRepository {
  getReviews(): Promise<ReviewItem[]>;
}

export class ReviewRepository implements IReviewRepository {
  async getReviews(): Promise<ReviewItem[]> {
    // Simulate network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_REVIEWS]);
      }, 600); // 600ms artificial latency
    });
  }
}
