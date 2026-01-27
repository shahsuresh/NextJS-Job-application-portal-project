// session life set to 7 days
export const SESSION_LIFETIME = 7 * 24 * 60 * 60;
export const SESSION_REFRESH_TIME = SESSION_LIFETIME / 2;

export const COMPANY_TYPES = [
  // Tech
  "Software",
  "SaaS",
  "IT Services",
  "Web",
  "Mobile",
  "AI",
  "Cloud",
  "Cybersecurity",

  // Business
  "Startup",
  "SME",
  "Enterprise",
  "Agency",
  "Consulting",

  // Industry
  "FinTech",
  "HealthTech",
  "EdTech",
  "Ecommerce",
  "Manufacturing",

  // Organization
  "Nonprofit",
  "Government",
  "Education",

  // Other
  "Other",
];

export const TEAM_SIZES = [
  "2-10",
  "11-30",
  "31-50",
  "51-100",
  "101-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export type TeamSize = (typeof TEAM_SIZES)[number];
