export const CALENDLY_URL = "https://calendly.com/thepipelinelab/anuraggautam";

export const NAV_LINKS = [
  { label: "Systems", href: "/#systems" },
  { label: "Process", href: "/#process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Stack", href: "/#stack" },
  { label: "FAQ", href: "/#faq" },
];

export const STATS = [
  { value: 2400, suffix: "+", label: "Meetings booked" },
  { value: 86, prefix: "$", suffix: "M", label: "Pipeline generated" },
  { value: 12.4, suffix: "%", label: "Avg. reply rate", decimals: 1 },
  { value: 99.2, suffix: "%", label: "Inbox placement", decimals: 1 },
];

export const CLIENT_MARQUEE = [
  "GreenTech Industrial",
  "PrecisionParts Co",
  "CareTech Solutions",
  "MedConnect",
  "PayStream",
  "WealthBridge",
  "CloudTech",
  "DataFlow Analytics",
  "SecureStack",
];

export const SERVICES = [
  {
    index: "01",
    title: "Outbound Prospecting",
    tag: "Cold Email + LinkedIn",
    description:
      "Hyper-personalized cold email and LinkedIn campaigns, powered by AI research on every account. We build the data, the copy, the infrastructure — and hand you a calendar full of qualified conversations.",
    points: ["Self-refreshing TAM & lead lists", "AI-personalized messaging at scale", "Deliverability engineered to 99%+"],
  },
  {
    index: "02",
    title: "LinkedIn Ads (ABM)",
    tag: "Account-Based Marketing",
    description:
      "Surround your dream accounts before sales ever reaches out. Thought-leader ads and retargeting flows that warm up buying committees and cut your cost per qualified meeting.",
    points: ["Named-account targeting", "Thought-leader ad creative", "Pipeline-attributed reporting"],
  },
  {
    index: "03",
    title: "LinkedIn Content",
    tag: "Founder-Led Demand",
    description:
      "Turn your founders and executives into the loudest signal in your category. Ghostwritten content systems that compound attention into inbound pipeline.",
    points: ["Weekly ghostwritten content", "Audience growth engineering", "Inbound → outbound handoff"],
  },
  {
    index: "04",
    title: "GTM Engineering",
    tag: "Systems & Automation",
    description:
      "We design and build the revenue infrastructure itself — Clay tables, enrichment waterfalls, CRM automations and AI agents — so your team operates like a company twice its size.",
    points: ["Clay & enrichment workflows", "CRM + signal automations", "AI agents for sales ops"],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Map the territory",
    body: "We define your ICP with data, not opinions — scoring your total addressable market by intent signals, firmographics and lookalikes of your best customers.",
  },
  {
    step: "02",
    title: "Engineer the system",
    body: "Domains, mailboxes, warmup, enrichment waterfalls, Clay tables, CRM sync. Two weeks from kickoff, your outbound engine exists as real infrastructure.",
  },
  {
    step: "03",
    title: "Launch multichannel",
    body: "Email, LinkedIn and phone fire in coordinated sequences. Every message personalized by AI research, every account multi-threaded across the buying committee.",
  },
  {
    step: "04",
    title: "Compound weekly",
    body: "Live dashboards, weekly optimization sprints, message-market fit testing. The system gets smarter every send — and the pipeline stops leaking.",
  },
];

export type Tool = { name: string; logo: string };

export const TOOLS: Record<string, Tool> = {
  clay: { name: "Clay", logo: "/logos/clay.png" },
  smartlead: { name: "Smartlead", logo: "/logos/smartlead.png" },
  instantly: { name: "Instantly", logo: "/logos/instantly.png" },
  heyreach: { name: "HeyReach", logo: "/logos/heyreach.png" },
  apollo: { name: "Apollo", logo: "/logos/apollo.png" },
  claude: { name: "Claude", logo: "/logos/claude.svg" },
  openai: { name: "OpenAI", logo: "/logos/openai.png" },
  n8n: { name: "n8n", logo: "/logos/n8n.svg" },
  hubspot: { name: "HubSpot", logo: "/logos/hubspot.svg" },
  salesforce: { name: "Salesforce", logo: "/logos/salesforce.png" },
  attio: { name: "Attio", logo: "/logos/attio.png" },
  linkedin: { name: "LinkedIn Sales Nav", logo: "/logos/linkedin.png" },
  clearbit: { name: "Clearbit", logo: "/logos/clearbit.png" },
  builtwith: { name: "BuiltWith", logo: "/logos/builtwith.png" },
  trigify: { name: "Trigify", logo: "/logos/trigify.png" },
  lemlist: { name: "lemlist", logo: "/logos/lemlist.png" },
};

export const STACK_ROWS: Tool[][] = [
  ["clay", "smartlead", "instantly", "heyreach", "apollo", "claude", "openai", "n8n"].map((k) => TOOLS[k]),
  ["hubspot", "salesforce", "attio", "linkedin", "clearbit", "builtwith", "trigify", "lemlist"].map((k) => TOOLS[k]),
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  story: string;
  challenge: string;
  approach: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; author: string };
  stack: Tool[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "precisionparts",
    client: "PrecisionParts Co",
    industry: "Aerospace Manufacturing",
    metric: "$15M",
    metricLabel: "in new aerospace contracts",
    story: "Positioned as the low-risk supplier to Tier 1 OEMs through precision outbound.",
    challenge:
      "PrecisionParts had world-class tooling but no seat at the table with Tier 1 OEM suppliers. Aerospace procurement cycles run 12–18 months, buying committees are risk-obsessed, and cold vendors rarely make the approved-supplier list. Trade shows produced business cards, not contracts.",
    approach: [
      "Built a scored account universe of every Tier 1 and Tier 2 OEM supplier in North America, enriched with certifications, contract vehicles and program timelines.",
      "Positioned PrecisionParts around risk reduction — AS9100 compliance, redundancy capacity and on-time delivery data — instead of price.",
      "Multi-threaded procurement, quality and engineering simultaneously, with role-specific messaging for each seat on the committee.",
      "Ran a 9-month nurture cadence timed to program renewal windows surfaced by intent signals.",
    ],
    results: [
      { value: "$15M", label: "new contracts signed" },
      { value: "11", label: "Tier 1 supplier approvals" },
      { value: "31%", label: "reply rate from procurement" },
    ],
    quote: {
      text: "They understood aerospace procurement better than agencies who claim to specialize in it. The pipeline they built became our growth plan.",
      author: "VP Business Development, PrecisionParts Co",
    },
    stack: [TOOLS.clay, TOOLS.smartlead, TOOLS.linkedin, TOOLS.hubspot, TOOLS.claude],
  },
  {
    slug: "wealthbridge",
    client: "WealthBridge",
    industry: "Wealth Management",
    metric: "$50M",
    metricLabel: "new assets under management",
    story: "Trust-driven outbound that put advisors in front of high-net-worth clients.",
    challenge:
      "WealthBridge's advisors relied entirely on referrals. High-net-worth individuals don't respond to templated outreach, and one compliance misstep in a regulated industry can cost more than a lost deal. Growth had flatlined for two years.",
    approach: [
      "Built micro-segments around liquidity events — business exits, IPO lockup expirations, executive transitions — sourced from public filings and news signals.",
      "Wrote advisor-voiced, compliance-reviewed outreach that read like a peer introduction, not a pitch.",
      "Paired outbound with a founder-led LinkedIn content system that made advisors visible before the first touch.",
      "Throttled volume deliberately: 40 highly-researched touches per advisor per week, every message reviewed.",
    ],
    results: [
      { value: "$50M", label: "new AUM in 12 months" },
      { value: "64", label: "qualified HNW consultations" },
      { value: "0", label: "compliance escalations" },
    ],
    quote: {
      text: "We expected cold outreach to feel beneath our brand. Instead it became the most personal channel we operate.",
      author: "Managing Partner, WealthBridge",
    },
    stack: [TOOLS.clay, TOOLS.lemlist, TOOLS.linkedin, TOOLS.attio, TOOLS.claude],
  },
  {
    slug: "medconnect",
    client: "MedConnect",
    industry: "Healthcare",
    metric: "80",
    metricLabel: "hospital partnerships signed",
    story: "Compliant, multi-threaded outreach across hospital buying committees.",
    challenge:
      "Selling into hospitals means navigating clinical, administrative and IT stakeholders at once — each with different priorities and a deep distrust of vendor email. MedConnect's two-person sales team was drowning in a 4,000-account market.",
    approach: [
      "Mapped buying committees for every target health system: CMIO, CIO, nursing leadership and procurement, with role-tailored value propositions.",
      "Engineered HIPAA-conscious messaging and domains that passed hospital security filters — deliverability into health systems is its own discipline.",
      "Sequenced outreach so clinical champions were warmed before economic buyers were approached.",
      "Synced every interaction into their CRM with automated handoffs the two-person team could actually run.",
    ],
    results: [
      { value: "80", label: "hospital partnerships" },
      { value: "$3.6M", label: "annual contract value" },
      { value: "9.8%", label: "reply rate from health systems" },
    ],
    quote: {
      text: "The multi-threading playbook changed everything. By the time we demoed, half the committee already knew us.",
      author: "CEO, MedConnect",
    },
    stack: [TOOLS.clay, TOOLS.instantly, TOOLS.apollo, TOOLS.salesforce, TOOLS.openai],
  },
  {
    slug: "paystream",
    client: "PayStream",
    industry: "Payments",
    metric: "45",
    metricLabel: "merchant partners in 60 days",
    story: "High-intent targeting that collapsed a 9-month sales cycle into weeks.",
    challenge:
      "PayStream's merchant services were winning head-to-head, but their pipeline depended on slow partner referrals. Average sales cycle: nine months. They needed velocity without burning their brand in a market drowning in payments spam.",
    approach: [
      "Built intent triggers from technographic data — merchants on legacy processors, recent checkout-stack changes, funding events — so outreach landed at the moment of pain.",
      "Led with a free processing-cost audit instead of a demo ask, converting cold interest into a value-first conversation.",
      "Coordinated email, LinkedIn and phone in 5-day bursts per account, concentrating attention instead of dripping it.",
      "A/B tested offers weekly and killed underperformers fast; the winning angle emerged by week three.",
    ],
    results: [
      { value: "45", label: "merchant partners in 60 days" },
      { value: "73%", label: "shorter sales cycle" },
      { value: "5.2x", label: "ROI in the first quarter" },
    ],
    quote: {
      text: "Sixty days in, outbound was outproducing a referral network we'd spent five years building.",
      author: "Head of Growth, PayStream",
    },
    stack: [TOOLS.clay, TOOLS.builtwith, TOOLS.smartlead, TOOLS.heyreach, TOOLS.hubspot],
  },
  {
    slug: "greentech",
    client: "GreenTech Industrial",
    industry: "Sustainable Materials",
    metric: "35",
    metricLabel: "enterprise clients secured",
    story: "Education-led campaigns that created a market for a new material category.",
    challenge:
      "GreenTech wasn't fighting competitors — it was fighting ignorance. Their sustainable industrial materials were a category buyers didn't know existed. You can't harvest demand that hasn't been created, so classic outbound playbooks fell flat.",
    approach: [
      "Ran education-first sequences built around original content: cost-parity calculators, compliance briefings on incoming ESG regulation, and material spec comparisons.",
      "Targeted sustainability officers and operations leaders in parallel — conviction from one, budget from the other.",
      "Used regulatory deadlines as urgency anchors, mapping outreach timing to ESG reporting cycles.",
      "Retargeted engaged accounts with LinkedIn thought-leader ads to compound familiarity between touches.",
    ],
    results: [
      { value: "35", label: "enterprise clients" },
      { value: "2.4M", label: "tons in annual commitments" },
      { value: "18%", label: "of TAM engaged in year one" },
    ],
    quote: {
      text: "They didn't just generate leads — they educated a market into existence for us.",
      author: "CCO, GreenTech Industrial",
    },
    stack: [TOOLS.clay, TOOLS.instantly, TOOLS.linkedin, TOOLS.trigify, TOOLS.claude],
  },
  {
    slug: "caretech",
    client: "CareTech Solutions",
    industry: "Healthcare Tech",
    metric: "$8M",
    metricLabel: "qualified pipeline generated",
    story: "ROI-driven demo flows for surgical centers, booked straight to AE calendars.",
    challenge:
      "CareTech's scheduling software saved surgical centers real money, but administrators are pummeled by health-tech vendors and guard their calendars accordingly. Demo no-show rates ran 40%, and SDR cold calls were going nowhere.",
    approach: [
      "Front-loaded the ROI: every first touch included a personalized savings estimate built from the center's published case volumes.",
      "Booked meetings directly into AE calendars with automated qualification — no SDR handoff, no scheduling ping-pong.",
      "Built no-show insurance into the flow: value-recap sequences and one-click rescheduling cut no-shows to 12%.",
      "Scored the entire 9,000-center market and worked it in priority tiers, refreshing data monthly.",
    ],
    results: [
      { value: "$8M", label: "qualified pipeline" },
      { value: "140+", label: "demos with decision-makers" },
      { value: "12%", label: "no-show rate, down from 40%" },
    ],
    quote: {
      text: "Our AEs went from begging for at-bats to choosing which demos to take.",
      author: "VP Sales, CareTech Solutions",
    },
    stack: [TOOLS.apollo, TOOLS.smartlead, TOOLS.clearbit, TOOLS.salesforce, TOOLS.n8n],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The Pipeline Lab transformed our outbound from a black hole into our #1 revenue channel. We went from 2 meetings per month to 40+.",
    name: "Sarah Chen",
    role: "VP of Sales, CloudTech Solutions",
  },
  {
    quote:
      "Their multichannel approach is brilliant. The coordination between email and LinkedIn increased our response rate by 3x.",
    name: "Marcus Johnson",
    role: "Founder & CEO, DataFlow Analytics",
  },
  {
    quote:
      "Finally, a team that actually understands B2B sales. They don't just send emails — they build systems that convert.",
    name: "Elena Rodriguez",
    role: "CMO, SecureStack",
  },
];

export const FAQS = [
  {
    q: "How fast until the system is live?",
    a: "Infrastructure (domains, mailboxes, warmup, data) is built in the first two weeks. Campaigns launch in week three, and most clients see booked meetings within 21–30 days of kickoff.",
  },
  {
    q: "How is this different from a lead gen agency?",
    a: "Agencies sell activity — emails sent, lists scraped. We engineer systems: data infrastructure, deliverability, multichannel orchestration and AI personalization that compound over time. You own an asset, not an invoice.",
  },
  {
    q: "Who is this for?",
    a: "B2B companies past early traction — typically $100K+/month in revenue — that want to scale pipeline without scaling headcount. We work best with technical and considered-purchase markets.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Engagements start with a 3-month build-and-prove sprint, then roll month-to-month. If the system doesn't perform, you shouldn't be locked into it.",
  },
  {
    q: "How much of my time does it take?",
    a: "About an hour a week. We handle data, copy, sending and optimization — you handle the meetings we book and a weekly review of the dashboard.",
  },
];

export const FOOTER_TAGLINE =
  "The Pipeline Lab engineers revenue systems for B2B companies that refuse to settle for average.";
