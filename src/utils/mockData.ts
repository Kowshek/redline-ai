import type { Session } from '../types'

// Fake sessions — we'll replace this with real API data later
// This lets us build and style the UI without a backend
export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'AI Tutoring Platform',
    ideaText: 'A personalized AI tutor for high school students',
    status: 'COMPLETE',
    version: 3,
    overallResilienceScore: 84,
    createdAt: '2024-03-01T10:00:00Z',
    completedAt: '2024-03-01T11:30:00Z',
  },
  {
    id: '2',
    title: 'Hyperlocal Grocery Delivery',
    ideaText: 'Same-hour grocery delivery from local stores',
    status: 'DEFENDING',
    version: 2,
    overallResilienceScore: 61,
    createdAt: '2024-03-03T14:00:00Z',
    completedAt: null,
  },
  {
    id: '3',
    title: 'B2B SaaS for Restaurants',
    ideaText: 'Inventory management tool for small restaurants',
    status: 'ATTACKING',
    version: 1,
    overallResilienceScore: null,
    createdAt: '2024-03-05T09:00:00Z',
    completedAt: null,
  },
  {
    id: '4',
    title: 'Freelancer Insurance',
    ideaText: 'Affordable health insurance bundles for freelancers',
    status: 'COMPLETE',
    version: 2,
    overallResilienceScore: 72,
    createdAt: '2024-02-28T16:00:00Z',
    completedAt: '2024-02-28T17:45:00Z',
  },
  {
    id: '5',
    title: 'Remote Team Culture Tool',
    ideaText: 'Platform to build culture in fully remote companies',
    status: 'DRAFT',
    version: 1,
    overallResilienceScore: null,
    createdAt: '2024-03-06T08:00:00Z',
    completedAt: null,
  },
]