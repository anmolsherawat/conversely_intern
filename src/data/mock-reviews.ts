import type { ReviewItem, ReviewStatus, ReviewPriority, ReviewRisk } from '../types/review';

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    title: 'Anomalous Refund Request Pattern detected for User #8821',
    summary: 'System flagged 5 consecutive high-value refund requests within 10 minutes. This exceeds typical behavior patterns for this user segment.',
    status: 'pending' as ReviewStatus,
    priority: 'urgent' as ReviewPriority,
    source: 'Fraud Detection System',
    owner: 'Sarah Chen',
    tags: ['fraud', 'refund', 'anomaly'],
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    score: 94,
    risk: 'high' as ReviewRisk
  },
  {
    id: 'rev-2',
    title: 'Customer Feedback: Checkout flow timing out on iOS',
    summary: 'Multiple reports of the checkout page failing to load or timing out specifically on Safari mobile. Impacting conversion rate by approx 4%.',
    status: 'pending' as ReviewStatus,
    priority: 'high' as ReviewPriority,
    source: 'Zendesk Support',
    owner: null,
    tags: ['bug', 'checkout', 'ios', 'safari'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    score: 82,
    risk: 'medium' as ReviewRisk
  },
  {
    id: 'rev-3',
    title: 'Inventory Sync Delay: Warehouse 4 (North Region)',
    summary: 'Real-time inventory sync between Warehouse 4 and the storefront is delayed by 15-20 minutes. Risk of overselling popular items.',
    status: 'snoozed' as ReviewStatus,
    priority: 'medium' as ReviewPriority,
    source: 'Logistics Monitor',
    owner: 'Michael Rodriguez',
    tags: ['inventory', 'logistics', 'sync'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    score: 45,
    risk: 'low' as ReviewRisk
  },
  {
    id: 'rev-4',
    title: 'New Merchant Application: Artisanal Goods Co.',
    summary: 'Review required for a high-volume merchant application. Identity verification passed, but business model needs manual check.',
    status: 'pending' as ReviewStatus,
    priority: 'low' as ReviewPriority,
    source: 'Merchant Onboarding',
    owner: 'Alex Wong',
    tags: ['onboarding', 'manual-review'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    score: 30,
    risk: 'low' as ReviewRisk
  },
  {
    id: 'rev-5',
    title: 'Security Alert: Multiple failed login attempts from IP 192.168.1.1',
    summary: 'Brute force attack suspected on administrative endpoints. IP has been temporarily throttled but requires investigation.',
    status: 'escalated' as ReviewStatus,
    priority: 'urgent' as ReviewPriority,
    source: 'Auth Service',
    owner: 'Sarah Chen',
    tags: ['security', 'auth', 'attack'],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    score: 98,
    risk: 'high' as ReviewRisk
  },
  {
    id: 'rev-6',
    title: 'Marketing Campaign Performance Drop',
    summary: 'The "Spring Sale" campaign CTR dropped by 50% in the last 6 hours. Possible link breakage or creative fatigue.',
    status: 'reviewed' as ReviewStatus,
    priority: 'medium' as ReviewPriority,
    source: 'Marketing Analytics',
    owner: 'Emma Wilson',
    tags: ['marketing', 'analytics', 'performance'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    score: 55,
    risk: 'medium' as ReviewRisk
  },
  {
    id: 'rev-7',
    title: 'API Rate Limit Exceeded: Integration Partner "ShopifyPlus"',
    summary: 'Integration partner is consistently hitting rate limits on the Orders API. May cause sync failures for merchants.',
    status: 'pending' as ReviewStatus,
    priority: 'medium' as ReviewPriority,
    source: 'API Gateway',
    owner: null,
    tags: ['api', 'integration', 'rate-limit'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    score: 60,
    risk: 'medium' as ReviewRisk
  },
  {
    id: 'rev-8',
    title: 'Data Privacy Request: User #4412 (GDPR)',
    summary: 'Formal request for data deletion (Right to be Forgotten). Must be processed within 30 days.',
    status: 'pending' as ReviewStatus,
    priority: 'high' as ReviewPriority,
    source: 'Legal Compliance',
    owner: 'Michael Rodriguez',
    tags: ['gdpr', 'privacy', 'legal'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    score: 75,
    risk: 'high' as ReviewRisk
  },
  // Adding more items for a robust list...
  ...Array.from({ length: 22 }).map((_, i) => ({
    id: `rev-${i + 9}`,
    title: `Routine System Health Check: ${['DB Cluster', 'Redis Cache', 'ElasticSearch', 'Email Gateway'][i % 4]}`,
    summary: 'Regularly scheduled automated review of system metrics and performance logs.',
    status: (i % 3 === 0 ? 'reviewed' : 'pending') as ReviewStatus,
    priority: (i % 4 === 0 ? 'medium' : 'low') as ReviewPriority,
    source: 'Health Monitor',
    owner: i % 5 === 0 ? 'Sarah Chen' : null,
    tags: ['routine', 'system-health'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * (i + 10)).toISOString(),
    score: Math.floor(Math.random() * 40) + 10,
    risk: 'low' as ReviewRisk
  }))
];
