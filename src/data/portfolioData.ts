export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categorySlug: 'bi' | 'fabric' | 'sql' | 'hr' | 'finance' | 'workforce' | 'performance' | 'engineering';
  thumbnailGradient: string;
  technologies: string[];
  businessImpactSummary: string;
  metrics: { label: string; value: string; detail?: string }[];
  problem: {
    description: string;
    affectedAudience: string;
    importance: string;
    previousLimitations: string[];
  };
  objective: string;
  architecture: {
    sources: string[];
    ingestion: string;
    storageLayer: string;
    semanticModel: string;
    consumption: string;
    summary: string;
  };
  dataPreparation: {
    cleaning: string;
    modeling: string;
    qualityChecks: string[];
  };
  analyticsDevelopment: {
    daxMeasures: { name: string; description: string; code: string }[];
    features: string[];
    security: string;
  };
  dashboardPreview: {
    type: 'sales' | 'hr' | 'finance' | 'supply_chain' | 'saas' | 'healthcare';
    kpiCards: { title: string; value: string; change: string; isPositive: boolean }[];
    charts: {
      type: 'bar' | 'line' | 'donut' | 'table';
      title: string;
      description: string;
      dataPoints: { name: string; val1: number; val2?: number; category?: string }[];
    }[];
  };
  image?: string;
  keyInsights: {
    title: string;
    description: string;
    impact: string;
  }[];
  businessImpactDetails: {
    metric: string;
    label: string;
    description: string;
  }[];
  lessonsLearned: {
    challenge: string;
    technicalDecision: string;
    futureImprovements: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: string; highlight?: boolean; context: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  suitableFor: string;
}

export interface CredibilityItem {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  status: 'Completed' | 'In Progress' | 'Certified';
  description: string;
  skills: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    headline: string;
    subtitle: string;
    positioningStatement: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    whatsappDisplay?: string;
    linkedin: string;
    linkedinDisplay: string;
    github: string;
    avatarUrl: string;
    location: string;
    availability: string;
    coreTools: string[];
  };
  stats: { label: string; value: string; subtitle: string }[];
  lifecycleSteps: { step: number; title: string; shortDesc: string; detail: string }[];
  categories: { name: string; slug: string }[];
  projects: Project[];
  skillsCategories: SkillCategory[];
  experience: ExperienceItem[];
  services: ServiceItem[];
  credibilityPoints: CredibilityItem[];
  certifications: CertificationItem[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Zubair Anwar",
    title: "Data Analyst & Business Intelligence Specialist",
    headline: "Turning Data Into Stories That Drive Smarter Business Decisions.",
    subtitle: "Passionate Data Analyst with hands-on experience turning raw data into interactive dashboards, predictive models, and actionable insights. Skilled in Power BI, Advanced Excel, SQL, and Python.",
    positioningStatement: "I specialize in transforming complex multi-source data into clear, interactive dashboards and automated reporting systems that fuel growth, efficiency, and smarter decisions.",
    email: "zubairanwar499@gmail.com",
    phone: "03433215701",
    whatsapp: "https://wa.me/923433215701?text=Hi%20Zubair,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20data%20analytics%20project.",
    whatsappDisplay: "03433215701",
    linkedin: "https://www.linkedin.com/in/zubair-anwar-56762026a",
    linkedinDisplay: "linkedin.com/in/zubair-anwar",
    github: "https://github.com/zubairanwar499-bi",
    avatarUrl: "/assets/profile.png",
    location: "Islamabad, Pakistan",
    availability: "Available for Data Analyst roles, freelance BI projects & consulting",
    coreTools: ["Power BI", "Advanced Excel", "SQL", "Python", "DAX", "Power Query", "AI Tools", "Data Storytelling"],
  },

  stats: [
    { label: "Experience in Analytics", value: "1+ Years", subtitle: "Focused on BI & Modern Data Stack" },
    { label: "Dashboards & Reports Built", value: "25+", subtitle: "Interactive & Executive-ready" },
    { label: "Data Pipelines & Models", value: "15+", subtitle: "Star Schema & Lakehouse Models" },
    { label: "Reporting Efficiency Gain", value: "85%", subtitle: "Average reduction in manual reporting time" }
  ],

  lifecycleSteps: [
    {
      step: 1,
      title: "Data Sources",
      shortDesc: "ERP, CRM, SQL Databases, APIs, Flat Files",
      detail: "Identifying, connecting to, and cataloging raw data silos across transaction systems, third-party APIs, and spreadsheets."
    },
    {
      step: 2,
      title: "Engineering",
      shortDesc: "Pipelines, Staging, Ingestion",
      detail: "Automating data feeds via Microsoft Fabric Data Pipelines, Python scripts, or Azure Data Factory into structured staging."
    },
    {
      step: 3,
      title: "Transformation",
      shortDesc: "Power Query, SQL Views, PySpark",
      detail: "Cleansing raw records, handling nulls/data types, deduplicating, and standardizing columns for audit readiness."
    },
    {
      step: 4,
      title: "Data Modeling",
      shortDesc: "Star Schema, Relationships, Dimensions",
      detail: "Designing performant dimensional models (Fact & Dimension tables) with 1-to-many single-direction relationships."
    },
    {
      step: 5,
      title: "Analysis & DAX",
      shortDesc: "Time Intelligence, KPIs, Dynamic RLS",
      detail: "Formulating optimized DAX measures for YoY growth, rolling averages, margin calculations, and dynamic role-based security."
    },
    {
      step: 6,
      title: "Visualization",
      shortDesc: "UX-focused Executive Dashboards",
      detail: "Constructing uncluttered, accessible dashboards with clear visual hierarchy, drill-through paths, and responsive card layouts."
    },
    {
      step: 7,
      title: "Actionable Insights",
      shortDesc: "Variance & Root Cause Discovery",
      detail: "Translating metric variances into digestible operational takeaways: what changed, why it changed, and where the risk lies."
    },
    {
      step: 8,
      title: "Business Decisions",
      shortDesc: "Cost Reduction, Growth & Impact",
      detail: "Equipping leadership and operational teams with definitive evidence to reallocate budget, fix bottlenecks, and drive ROI."
    }
  ],

  categories: [
    { name: "All Projects", slug: "all" },
    { name: "Business Intelligence", slug: "bi" },
    { name: "Microsoft Fabric", slug: "fabric" },
    { name: "SQL Analytics", slug: "sql" },
    { name: "HR Analytics", slug: "hr" },
    { name: "Finance Analytics", slug: "finance" },
    { name: "Workforce Analytics", slug: "workforce" },
    { name: "Performance Management", slug: "performance" },
    { name: "Data Engineering", slug: "engineering" },
  ],

  projects: [
    {
      id: "executive-commercial-sales",
      title: "Executive Commercial Sales & Profitability Command Center",
      tagline: "Centralized multi-channel sales reporting into Microsoft Fabric and Power BI with automated margin leak detection.",
      category: "Business Intelligence",
      categorySlug: "bi",
      thumbnailGradient: "from-blue-600 to-cyan-500",
      image: "/assets/dashboards/dashboard-sales.jpg",
      technologies: ["Power BI", "Microsoft Fabric", "SQL", "DAX", "Power Query"],
      businessImpactSummary: "Eliminated 12-day month-end reporting lag and identified a 22% discounting leak across regional distributors.",
      metrics: [
        { label: "Manual Effort Reduction", value: "85%", detail: "From 16 hrs/week to 2 hrs" },
        { label: "Data Latency", value: "Daily", detail: "Automated Lakehouse sync" },
        { label: "Recovered Margin", value: "$140K+", detail: "Identified via discount analytics" }
      ],
      problem: {
        description: "Commercial leadership and regional sales directors relied on 14+ disjointed regional Excel spreadsheets with inconsistent currency conversions and manual data compilation. Decisions on discounts and inventory restocking were made on stale 2-week-old data.",
        affectedAudience: "Chief Commercial Officer, VP of Sales, Regional Account Directors, and FP&A team.",
        importance: "Without a single source of truth, regional margin erosion was hidden until quarterly accounting reconciliations, causing missed revenue targets.",
        previousLimitations: [
          "Manual copy-pasting of 1.2M+ transactional records into Excel workbooks.",
          "Frequent formula corruption and missing lookup joins across CRM and ERP.",
          "Zero row-level security: regional managers could not safely access central files.",
          "Inability to perform time-intelligence comparisons (YoY, MoM, YTD) dynamically."
        ]
      },
      objective: "Architect an end-to-end business intelligence solution in Microsoft Fabric and Power BI that unifies all sales channels, automates daily data refreshes, implements role-based security, and surfaces real-time profitability drivers.",
      architecture: {
        sources: ["Enterprise ERP (SQL Server)", "CRM Sales Pipeline (REST API)", "Distributor Flat Files (Blob Storage)"],
        ingestion: "Microsoft Fabric Data Factory copy pipelines with automated schema mapping and incremental watermark triggers.",
        storageLayer: "Fabric Lakehouse (Delta Parquet tables) configured in Bronze -> Silver -> Gold Medallion architecture.",
        semanticModel: "Power BI Direct Lake semantic model with 1-to-many Star Schema (1 Fact Sales, 6 Conformed Dimensions).",
        consumption: "Power BI Service app with executive summary view, regional drill-through pages, and automated mobile view.",
        summary: "Data flows seamlessly from operational databases through Fabric pipelines directly into high-speed Delta Lakehouse storage, serving a Direct Lake Power BI model with sub-second query speeds."
      },
      dataPreparation: {
        cleaning: "Utilized Power Query and SQL staging views to clean date formatting, impute missing regional codes, standardize exchange rates against USD, and filter cancelled/test transactions.",
        modeling: "Engineered a pure Star Schema: Fact_Sales linked to Dim_Date, Dim_Product (Hierarchy: Category > SubCategory > SKU), Dim_Customer, Dim_Geography, Dim_SalesChannel, and Dim_SalesRep. Avoided bi-directional filtering to preserve memory efficiency.",
        qualityChecks: [
          "Automated row-count parity check between source ERP and Lakehouse Gold layer.",
          "Null check assertions on primary key joins (CustomerKey, ProductKey, DateKey).",
          "Reconciliation query testing gross revenue against audited GL accounting totals (<0.01% variance)."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Total Sales YoY Growth %",
            description: "Calculates year-over-year revenue variance with defensive DIVIDE handling for prior period nulls.",
            code: `Sales YoY Growth % = 
VAR CurrentSales = [Total Revenue]
VAR PriorYearSales = 
    CALCULATE(
        [Total Revenue],
        SAMEPERIODLASTYEAR('Dim_Date'[Date])
    )
RETURN
    DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)`
          },
          {
            name: "Gross Margin % After Discounts",
            description: "Dynamic measure factoring both direct COGS and applied distributor concession discounts.",
            code: `Net Margin % = 
VAR GrossRevenue = SUM(Fact_Sales[GrossAmount])
VAR TotalDiscounts = SUM(Fact_Sales[DiscountAmount])
VAR NetRevenue = GrossRevenue - TotalDiscounts
VAR TotalCOGS = SUM(Fact_Sales[TotalCost])
RETURN
    DIVIDE(NetRevenue - TotalCOGS, NetRevenue, 0)`
          },
          {
            name: "Dynamic RLS Security Filter",
            description: "Filters data automatically based on the logged-in user's Azure AD email against the user access matrix.",
            code: `[UserPrincipalEmail] = USERPRINCIPALNAME() || 
LOOKUPVALUE(Dim_Security[Role], Dim_Security[Email], USERPRINCIPALNAME()) = "Admin"`
          }
        ],
        features: [
          "Dynamic date slicers (CY vs. PY, QTD, MTD, Rolling 12 Months).",
          "Drill-through capability from Country/Region card down to individual sales representative performance.",
          "Decomposition Tree for root-cause analysis of margin drops across product sub-categories.",
          "Dynamic Row-Level Security (RLS) guaranteeing regional directors only view their permitted territories."
        ],
        security: "Implemented Dynamic Row-Level Security via Microsoft Entra ID (Azure AD) integrated with an organizational access mapping table."
      },
      dashboardPreview: {
        type: "sales",
        kpiCards: [
          { title: "Total Net Revenue", value: "$4.82M", change: "+14.2% YoY", isPositive: true },
          { title: "Gross Profit Margin", value: "38.6%", change: "+2.4% vs Target", isPositive: true },
          { title: "Total Units Sold", value: "128,450", change: "+8.1% YoY", isPositive: true },
          { title: "Average Discount Rate", value: "6.2%", change: "-1.8% optimized", isPositive: true }
        ],
        charts: [
          {
            type: "line",
            title: "Monthly Revenue Trend vs Budget (2025-2026)",
            description: "Actual sales steadily outperformed budget starting Q2 after discount restructuring.",
            dataPoints: [
              { name: "Jan", val1: 340, val2: 320 },
              { name: "Feb", val1: 365, val2: 340 },
              { name: "Mar", val1: 410, val2: 380 },
              { name: "Apr", val1: 395, val2: 390 },
              { name: "May", val1: 440, val2: 400 },
              { name: "Jun", val1: 480, val2: 420 },
              { name: "Jul", val1: 510, val2: 430 },
              { name: "Aug", val1: 530, val2: 440 }
            ]
          },
          {
            type: "bar",
            title: "Profit Margin % by Product Category",
            description: "Enterprise Solutions and Cloud Software generated the highest net margin contribution.",
            dataPoints: [
              { name: "Enterprise SaaS", val1: 58 },
              { name: "Cloud Analytics", val1: 52 },
              { name: "Consulting", val1: 41 },
              { name: "Hardware", val1: 24 },
              { name: "Support Services", val1: 36 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "High-Volume Discounting Leak in Southeast Region",
          description: "Analysis revealed 3 regional distributors were routinely applying maximum discretionary 25% discounts on low-margin hardware products, eroding 6.4% of regional profit.",
          impact: "Leadership instituted an automated approval threshold for discounts >15%, immediately recovering ~$140K in annual margin."
        },
        {
          title: "Product Pareto Distribution (80/20 Rule)",
          description: "18% of SKUs generated 74% of cumulative profit, while bottom 30% of legacy SKUs generated negative operating margins after factoring logistics.",
          impact: "Enabled product management to sunset 14 underperforming SKUs and reallocate warehouse capacity to top-tier lines."
        },
        {
          title: "Seasonal Channel Acceleration",
          description: "Direct enterprise online channel outpaced partner reseller channels by 3.2x in Q2-Q3 when backed by self-service quoting.",
          impact: "Directed marketing spend towards digital acquisition campaigns with verified 4.8x ROI."
        }
      ],
      businessImpactDetails: [
        {
          metric: "85%",
          label: "Reporting Efficiency Gain",
          description: "Saved over 50 hours of monthly administrative time across finance and commercial operations."
        },
        {
          metric: "12 Days → 0 Days",
          label: "Latency Reduction",
          description: "Replaced 12-day lagged batch spreadsheets with automated daily refreshed Fabric Lakehouse reporting."
        },
        {
          metric: "$140,000+",
          label: "Direct Margin Recovered",
          description: "Recovered net margin by identifying discounting anomalies and establishing governance guardrails."
        }
      ],
      lessonsLearned: {
        challenge: "Source ERP data had duplicate transaction keys due to legacy billing migrations and inconsistent timezone stamps.",
        technicalDecision: "Implemented robust surrogate key generation in the Lakehouse Silver layer and unified all transaction timestamps to UTC with a standardized local offset dimension.",
        futureImprovements: "Incorporate automated Machine Learning anomaly detection in Fabric notebooks to alert account managers of abrupt order volume decelerations."
      }
    },
    {
      id: "enterprise-hr-workforce-attrition",
      title: "Enterprise HR Workforce & Attrition Intelligence",
      tagline: "Designed an interactive HR analytics solution tracking employee lifecycle, salary parity, and flight-risk indicators.",
      category: "HR Analytics",
      categorySlug: "hr",
      thumbnailGradient: "from-purple-600 to-indigo-500",
      image: "/assets/dashboards/dashboard-operations.png",
      technologies: ["Power BI", "SQL", "DAX", "Power Query", "Dynamic RLS"],
      businessImpactSummary: "Reduced annual department turnover by 14% and surfaced critical compensation anomalies among mid-career engineers.",
      metrics: [
        { label: "Annual Turnover Reduction", value: "14%", detail: "Through early flight-risk identification" },
        { label: "High-Performer Retention", value: "+28%", detail: "Key engineering & sales talent" },
        { label: "Employees Covered", value: "2,400+", detail: "Across 8 global offices" }
      ],
      problem: {
        description: "An enterprise organization with over 2,400 global employees experienced sudden turnover spikes in critical technology and sales roles without actionable visibility into exit reasons, tenure patterns, or compensation band compression.",
        affectedAudience: "Chief People Officer, HR Business Partners, Department Directors, and Executive Committee.",
        importance: "Replacing mid-level technical talent cost ~1.5x their annual salary in recruitment and ramp-up overhead, causing project delays and budget waste.",
        previousLimitations: [
          "HR data locked in static monthly CSV exports from Workday and greenhouse.",
          "No unified metric for calculating annualized rolling voluntary turnover rate.",
          "Absence of role-based security prevented department heads from viewing their specific org metrics.",
          "Salary parity and Compa-Ratio analysis had to be manually computed in Excel each quarter."
        ]
      },
      objective: "Build a secure, interactive HR intelligence reporting suite that models employee headcount, tenure survival curves, compensation ratios, and exit drivers to proactively address workforce attrition.",
      architecture: {
        sources: ["HRIS Workday Employee Master Data", "Greenhouse Recruitment Logs", "Quarterly Performance Review CSVs"],
        ingestion: "Automated SQL Server integration with encrypted credential vault and daily differential loads.",
        storageLayer: "Relational staging database with sanitized PII (Personally Identifiable Information) handling.",
        semanticModel: "Star Schema with Fact_EmploymentHistory, Fact_PerformanceReviews, Dim_Employee, Dim_Department, Dim_PayGrade, and Dim_ExitReason.",
        consumption: "Role-Based Power BI App with dedicated HR Leadership vs. Department Manager views.",
        summary: "Raw HR logs are scrubbed for sensitive identifiers, structured into a validated Star Schema, and protected by multi-tier Dynamic RLS for departmental confidentiality."
      },
      dataPreparation: {
        cleaning: "Masked private personal identifiers (SSNs/National IDs); calculated effective start/end dates for employee tenure intervals using Power Query M code.",
        modeling: "Engineered a snapshot-based dimensional model capable of tracking point-in-time active headcount and historical transfers across business units.",
        qualityChecks: [
          "Validated headcount totals against monthly payroll master files (100% match).",
          "Flagged and corrected orphaned exit records without valid termination reason categories.",
          "Ensured non-overlapping active tenure date ranges for re-hired personnel."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Annualized Turnover Rate %",
            description: "Standardized HR metric calculating annualized voluntary terminations over average active headcount.",
            code: `Annualized Turnover % = 
VAR TotalExits = 
    CALCULATE(
        COUNTROWS(Fact_EmploymentHistory),
        Fact_EmploymentHistory[EventType] = "Termination",
        Fact_EmploymentHistory[VoluntaryFlag] = TRUE()
    )
VAR AvgHeadcount = [Average Active Headcount]
VAR DaysInPeriod = COUNTROWS('Dim_Date')
RETURN
    IF(
        AvgHeadcount > 0,
        DIVIDE(TotalExits, AvgHeadcount, 0) * (365 / DaysInPeriod),
        BLANK()
    )`
          },
          {
            name: "Compa-Ratio (Salary vs Market Midpoint)",
            description: "Calculates employee base salary relative to their salary grade midpoint for compensation equity.",
            code: `Average Compa-Ratio = 
AVERAGEX(
    Fact_EmploymentHistory,
    DIVIDE(
        Fact_EmploymentHistory[BaseSalaryUSD],
        RELATED(Dim_PayGrade[MidpointSalaryUSD]),
        1.0
    )
)`
          }
        ],
        features: [
          "Tenure survival cohort chart highlighting attrition spikes by year of service.",
          "Salary Compa-Ratio distribution matrix to pinpoint under-compensated high performers.",
          "Exit interview sentiment and primary driver categorization.",
          "Department manager drill-through view with sanitized organizational views."
        ],
        security: "Strict Dynamic RLS allowing Department Directors to see aggregate metrics for their direct report tree only, while HR Leaders retain cross-company visibility."
      },
      dashboardPreview: {
        type: "hr",
        kpiCards: [
          { title: "Active Headcount", value: "2,418", change: "+5.3% Net Growth", isPositive: true },
          { title: "Annualized Turnover", value: "11.2%", change: "-2.8% vs Last Year", isPositive: true },
          { title: "Avg Compa-Ratio", value: "0.96", change: "Balanced (0.80 - 1.20)", isPositive: true },
          { title: "Avg Time to Fill", value: "34 Days", change: "-8 Days improvement", isPositive: true }
        ],
        charts: [
          {
            type: "bar",
            title: "Voluntary Attrition by Tenure Cohort",
            description: "Highest flight risk identified at the 18 to 24 month tenure mark.",
            dataPoints: [
              { name: "0-6 Months", val1: 4.2 },
              { name: "6-12 Months", val1: 8.1 },
              { name: "1-2 Years", val1: 21.4 },
              { name: "2-3 Years", val1: 14.6 },
              { name: "3-5 Years", val1: 9.3 },
              { name: "5+ Years", val1: 5.1 }
            ]
          },
          {
            type: "donut",
            title: "Primary Exit Interview Drivers",
            description: "Career progression and compensation made up over 65% of voluntary departures.",
            dataPoints: [
              { name: "Career Growth", val1: 38 },
              { name: "Compensation", val1: 29 },
              { name: "Work-Life Balance", val1: 16 },
              { name: "Management Alignment", val1: 11 },
              { name: "Relocation", val1: 6 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "The 18-Month Promotion Plateau",
          description: "Data proved that mid-level technical individual contributors who received no title adjustment or scope increase within 18-24 months had a 3.4x higher exit probability.",
          impact: "HR implemented an 18-month career review cycle, reducing mid-tenure resignations by 22% in the following cycle."
        },
        {
          title: "Compa-Ratio Below 0.88 Predicted Attrition",
          description: "Employees with performance ratings in the top 20% whose Compa-Ratio lagged below 0.88 accounted for 42% of high-performer departures.",
          impact: "Enabled the Compensation Committee to conduct targeted mid-year salary parity corrections, retaining 38 key engineers."
        }
      ],
      businessImpactDetails: [
        {
          metric: "14%",
          label: "Department Turnover Reduction",
          description: "Stabilized team productivity and reduced costly replacement recruitment cycles."
        },
        {
          metric: "$320,000+",
          label: "Estimated Hiring Overhead Saved",
          description: "Calculated based on average cost-per-hire and ramp-up loss for senior technical roles."
        },
        {
          metric: "100%",
          label: "Confidentiality Compliance",
          description: "Zero data leakage incidents across 45 department directors using Dynamic RLS."
        }
      ],
      lessonsLearned: {
        challenge: "Handling complex employee lifecycle transitions (promotions, lateral transfers, leaves of absence) within a single tabular model.",
        technicalDecision: "Created a dedicated Slowly Changing Dimension (SCD Type 2) approach in SQL to maintain historical point-in-time departmental accuracy.",
        futureImprovements: "Integrate predictive ML attrition risk scoring directly via Python script visuals inside Power BI."
      }
    },
    {
      id: "financial-working-capital-forecasting",
      title: "Financial Working Capital & Cash Flow Forecast Model",
      tagline: "Automated SQL data mart and Power BI financial reporting reducing Days Sales Outstanding (DSO) and cash forecasting cycle.",
      category: "Finance Analytics",
      categorySlug: "finance",
      thumbnailGradient: "from-emerald-600 to-teal-500",
      image: "/assets/dashboards/dashboard-finance.png",
      technologies: ["SQL", "Power BI", "Excel", "DAX", "Financial Modeling"],
      businessImpactSummary: "Reduced Days Sales Outstanding (DSO) by 9 days and saved 18 hours per week across the corporate FP&A team.",
      metrics: [
        { label: "DSO Reduction", value: "-9 Days", detail: "Accelerated cash conversion" },
        { label: "Weekly FP&A Time Saved", value: "18 Hours", detail: "Eliminated manual spreadsheet reconciliation" },
        { label: "Receivables Covered", value: "$18.4M", detail: "Across multi-entity subledgers" }
      ],
      problem: {
        description: "The corporate finance team spent 3 business days each week manually merging general ledger exports, bank balance sheets, and accounts receivable sub-ledgers across 4 operating entities to produce weekly liquidity and aging reports.",
        affectedAudience: "Chief Financial Officer, Head of Treasury, FP&A Managers, and Credit Control team.",
        importance: "Inaccurate cash visibility risked overdraft penalties and hindered timely supplier payments and debt servicing.",
        previousLimitations: [
          "Fragmented QuickBooks and ERP ledgers with inconsistent chart of accounts.",
          "Aged debt categorization (>30, >60, >90 days) had to be manually rebuilt every Monday in Excel.",
          "No dynamic scenario modeling for rolling 13-week cash flow burn.",
          "Lack of drill-through into invoice payment histories for overdue accounts."
        ]
      },
      objective: "Build an automated SQL data mart and interactive Power BI financial suite that standardizes the global chart of accounts, provides rolling 13-week cash projections, and tracks working capital metrics in real-time.",
      architecture: {
        sources: ["Multi-Entity General Ledger (SQL Server)", "Bank Open API Cash Balances", "AR/AP Subledgers"],
        ingestion: "Automated night-shift SQL stored procedures with error logging and balance reconciliation checks.",
        storageLayer: "Normalized PostgreSQL Financial Data Mart with indexed ledger journal views.",
        semanticModel: "Star Schema with Fact_GeneralLedger, Fact_AgedReceivables, Dim_Account (Financial Statement Hierarchy), Dim_Entity, Dim_Date (4-4-5 Accounting Calendar).",
        consumption: "Executive Financial Dashboard with P&L statement layouts, balance sheet ratios, and cash forecast waterfall charts.",
        summary: "Multi-entity accounting records are automatically unified in a normalized SQL data mart and modeled into a standardized financial reporting schema."
      },
      dataPreparation: {
        cleaning: "Mapped disparate legacy ledger account codes to a unified International Financial Reporting Standard (IFRS) chart of accounts using SQL mapping tables.",
        modeling: "Constructed a matrix-compatible financial statement model supporting dynamic subtotals (EBITDA, Gross Profit, Operating Cash Flow) without hardcoded DAX workarounds.",
        qualityChecks: [
          "Automated trial balance zero-sum integrity checks (Total Debits == Total Credits).",
          "Reconciled closing bank balance feeds against general ledger cash accounts.",
          "Flagged duplicate vendor invoice numbers across regional subsidiaries."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Days Sales Outstanding (DSO)",
            description: "Calculates the average number of days required to collect payment after a credit sale.",
            code: `Days Sales Outstanding = 
VAR TotalAR = [Ending Accounts Receivable]
VAR CreditSales90Days = 
    CALCULATE(
        [Total Credit Sales],
        DATESINPERIOD('Dim_Date'[Date], MAX('Dim_Date'[Date]), -90, DAY)
    )
RETURN
    IF(
        CreditSales90Days > 0,
        DIVIDE(TotalAR, CreditSales90Days, 0) * 90,
        BLANK()
    )`
          },
          {
            name: "Rolling 13-Week Cash Forecast",
            description: "Combines committed customer collections, recurring operating expenses, and planned capital investments.",
            code: `Rolling 13W Cash Balance = 
VAR CurrentCash = [Current Bank Balance]
VAR CumulativeInflows = 
    CALCULATE(
        [Expected AR Collections],
        WINDOW(1, ABS, 0, REL, ORDERBY('Dim_Date'[Date], ASC))
    )
VAR CumulativeOutflows = 
    CALCULATE(
        [Expected AP Disbursements],
        WINDOW(1, ABS, 0, REL, ORDERBY('Dim_Date'[Date], ASC))
    )
RETURN
    CurrentCash + CumulativeInflows - CumulativeOutflows`
          }
        ],
        features: [
          "Interactive waterfall visual showing drivers of monthly working capital variance.",
          "Dynamic aged debt bucket slicers with 1-click drill-down to customer transaction ledgers.",
          "What-If parameter slider modeling the liquidity impact of supplier payment term negotiations.",
          "Automated PDF report export for weekly executive treasury briefings."
        ],
        security: "Secured workspace with restricted row-level access for executive and treasury stakeholders."
      },
      dashboardPreview: {
        type: "finance",
        kpiCards: [
          { title: "Current Cash Position", value: "$3.42M", change: "+$410K vs Forecast", isPositive: true },
          { title: "Days Sales Outstanding", value: "38.2 Days", change: "-9.1 Days improved", isPositive: true },
          { title: "Working Capital Ratio", value: "1.84", change: "Healthy (>1.5)", isPositive: true },
          { title: "Total Overdue AR", value: "$612K", change: "-24% reduction", isPositive: true }
        ],
        charts: [
          {
            type: "bar",
            title: "Aged Receivables by Aging Bucket",
            description: "Overdue debt in 61-90 and 90+ buckets decreased by 34% following automated reminders.",
            dataPoints: [
              { name: "Current (<30d)", val1: 1420 },
              { name: "31-60 Days", val1: 580 },
              { name: "61-90 Days", val1: 210 },
              { name: "90+ Days", val1: 95 }
            ]
          },
          {
            type: "line",
            title: "Rolling 13-Week Projected Cash Flow ($000)",
            description: "Maintained cash buffer above $2.5M minimum reserve across all projected weeks.",
            dataPoints: [
              { name: "W1", val1: 3420 },
              { name: "W3", val1: 3280 },
              { name: "W5", val1: 3510 },
              { name: "W7", val1: 3190 },
              { name: "W9", val1: 3640 },
              { name: "W11", val1: 3820 },
              { name: "W13", val1: 4050 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "Overdue Concentration in Top 5 Enterprise Clients",
          description: "62% of invoices exceeding 60+ days belonged to just 5 enterprise clients experiencing internal billing disputes.",
          impact: "Prompted treasury to initiate dedicated reconciliation sessions, recovering $390K within 14 business days."
        },
        {
          title: "Vendor Early-Payment Discount ROI",
          description: "Analysis proved that taking advantage of 2/10 Net 30 vendor discounts yielded an annualized 36% risk-free return on liquid reserves.",
          impact: "Treasury automated early settlement for high-value suppliers, saving $44K annually in procurement costs."
        }
      ],
      businessImpactDetails: [
        {
          metric: "-9 Days",
          label: "DSO Improvement",
          description: "Significantly accelerated operating cash collection cycle and reduced working capital debt reliance."
        },
        {
          metric: "18 hrs/wk",
          label: "Finance Team Time Saved",
          description: "Automated manual general ledger reconciliations and aged debt schedule generation."
        },
        {
          metric: "$390,000",
          label: "Stalled Cash Recovered",
          description: "Unblocked delinquent enterprise receivables identified via dynamic aging drill-through."
        }
      ],
      lessonsLearned: {
        challenge: "Reconciling multi-currency transactions where exchange rates fluctuated between invoice issuance and payment settlement dates.",
        technicalDecision: "Engineered an automated Realized/Unrealized FX Gain/Loss calculation model inside SQL views to ensure exact ledger balance agreement.",
        futureImprovements: "Connect banking APIs directly via Microsoft Fabric Data Factory for real-time intraday cash reconciliation."
      }
    },
    {
      id: "supply-chain-inventory-optimization",
      title: "Omnichannel Supply Chain & Inventory Optimization Suite",
      tagline: "Automated Python and SQL data pipelines feeding an interactive inventory and stockout risk monitoring dashboard.",
      category: "Performance Management",
      categorySlug: "performance",
      thumbnailGradient: "from-amber-500 to-orange-600",
      image: "/assets/dashboards/dashboard-sales.jpg",
      technologies: ["SQL", "Python", "Power BI", "Data Engineering", "Azure"],
      businessImpactSummary: "Reduced warehouse stockout incidents by 32% while trimming $180K in dead stock carrying costs.",
      metrics: [
        { label: "Stockout Reduction", value: "32%", detail: "On critical fast-moving SKUs" },
        { label: "Dead Stock Eliminated", value: "$180K", detail: "Identified for clearance" },
        { label: "Supplier OTIF Score", value: "89%", detail: "Up from 71% baseline" }
      ],
      problem: {
        description: "A multi-site distribution business struggled with erratic supply chain lead times and frequent stockouts on top-selling SKUs, while simultaneously holding over $850K in stagnant, slow-moving inventory across 3 central warehouses.",
        affectedAudience: "Supply Chain Director, Warehouse Logistics Managers, and Purchasing Team.",
        importance: "Stockouts caused direct revenue loss and customer churn to competitors, while excess dead stock tied up capital and storage space.",
        previousLimitations: [
          "Warehouse Management System (WMS) lacked integrated demand velocity metrics.",
          "Lead times were estimated on static vendor promises rather than historical delivery variance.",
          "No automated reorder point (ROP) calculation adjusted for demand volatility.",
          "Purchasing teams operated in isolation without visibility into cross-warehouse inventory rebalancing."
        ]
      },
      objective: "Design an automated supply chain analytics architecture in Azure SQL and Power BI that monitors real-time inventory velocity, calculates dynamic safety stock thresholds, and flags supplier delivery SLA breaches.",
      architecture: {
        sources: ["WMS Warehouse Inventory Feeds", "ERP Purchase Orders & Inbound Goods Receipts", "Point-of-Sale Demand Logs"],
        ingestion: "Python scheduled ETL scripts executing data cleaning, standardizing SKU taxonomies, and loading to Azure SQL.",
        storageLayer: "Azure SQL Database with partitioned transaction history tables.",
        semanticModel: "Star Schema: Fact_InventorySnapshot, Fact_PurchaseOrders, Dim_Product, Dim_Warehouse, Dim_Supplier, Dim_Date.",
        consumption: "Operational Power BI Dashboard featuring Reorder Alerts, Dead Stock Matrix, and Supplier SLA Scorecards.",
        summary: "Python scripts extract and transform multi-warehouse inventory logs into an Azure SQL database, driving automated safety stock calculations in Power BI."
      },
      dataPreparation: {
        cleaning: "Removed duplicate SKU aliases and standardized unit of measurement (Cases vs. Pallets vs. Individual Units) across legacy supplier catalogs.",
        modeling: "Created daily periodic inventory snapshot tables with efficient surrogate keys to support fast rolling 30/60/90-day demand velocity calculations.",
        qualityChecks: [
          "Validated physical cycle count audits against virtual inventory ledger records (99.4% accuracy).",
          "Automated anomaly detection for negative stock counts caused by barcode scan sequence errors.",
          "Calculated historical lead time standard deviations across 40+ overseas suppliers."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Dynamic Reorder Point (ROP)",
            description: "Calculates optimal reorder threshold using average daily demand, supplier lead time, and safety stock buffer.",
            code: `Dynamic Reorder Point = 
VAR AvgDailyDemand = [Average Daily Units Sold (60D)]
VAR AvgLeadTimeDays = AVERAGE(Dim_Supplier[AverageLeadTimeDays])
VAR LeadTimeStdDev = STDEV.S(Fact_PurchaseOrders[ActualLeadTimeDays])
VAR DemandStdDev = STDEV.S(Fact_InventorySnapshot[DailyDemandUnits])
VAR ServiceFactor = 1.65 // 95% Service Level
VAR SafetyStock = 
    ServiceFactor * SQRT(
        (AvgLeadTimeDays * (DemandStdDev ^ 2)) + 
        ((AvgDailyDemand ^ 2) * (LeadTimeStdDev ^ 2))
    )
RETURN
    (AvgDailyDemand * AvgLeadTimeDays) + SafetyStock`
          },
          {
            name: "Supplier On-Time-In-Full (OTIF) %",
            description: "Evaluates supplier compliance against agreed delivery dates and ordered quantities.",
            code: `Supplier OTIF % = 
VAR TotalDeliveries = COUNTROWS(Fact_PurchaseOrders)
VAR CompliantDeliveries = 
    CALCULATE(
        COUNTROWS(Fact_PurchaseOrders),
        Fact_PurchaseOrders[IsOnTime] = TRUE(),
        Fact_PurchaseOrders[IsInFull] = TRUE()
    )
RETURN
    DIVIDE(CompliantDeliveries, TotalDeliveries, 0)`
          }
        ],
        features: [
          "Color-coded visual alerts for items currently below safety stock thresholds.",
          "Warehouse transfer recommendation engine to move slow-moving stock to high-demand sites.",
          "Supplier performance scorecard rating vendors on lead-time consistency and damage rates.",
          "Inventory ABC-XYZ categorization matrix (Revenue value vs. Demand predictability)."
        ],
        security: "Role-based access separating procurement negotiation terms from floor warehouse views."
      },
      dashboardPreview: {
        type: "supply_chain",
        kpiCards: [
          { title: "Total Inventory Value", value: "$3.18M", change: "-$180K dead stock", isPositive: true },
          { title: "Inventory Turnover", value: "6.4x", change: "+1.2x improvement", isPositive: true },
          { title: "Stockout Rate", value: "2.1%", change: "-32% vs benchmark", isPositive: true },
          { title: "Supplier OTIF", value: "89.2%", change: "+18.2% vs Baseline", isPositive: true }
        ],
        charts: [
          {
            type: "bar",
            title: "Inventory Health Classification (ABC-XYZ Analysis)",
            description: "High-value, consistent items (AX) prioritized for automated continuous replenishment.",
            dataPoints: [
              { name: "AX (High/Stable)", val1: 42 },
              { name: "BX (Med/Stable)", val1: 28 },
              { name: "AY (High/Volatile)", val1: 15 },
              { name: "CZ (Low/Erratic)", val1: 9 },
              { name: "Dead Stock", val1: 6 }
            ]
          },
          {
            type: "line",
            title: "Lead Time Variance by Supplier Tier (Days)",
            description: "Tier 1 suppliers achieved stable 6-day lead times after SLA dashboard visibility.",
            dataPoints: [
              { name: "Jan", val1: 14, val2: 12 },
              { name: "Mar", val1: 11, val2: 10 },
              { name: "May", val1: 8, val2: 9 },
              { name: "Jul", val1: 6, val2: 7 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "4 Suppliers Accounted for 68% of Inbound Delays",
          description: "Vendor analytics revealed that delays were clustered around specific packaging suppliers who failed to disclose sub-component shortages.",
          impact: "Procurement dual-sourced critical components, raising overall on-time delivery from 71% to 89%."
        },
        {
          title: "$180K in Stagnant Dead Stock Identified",
          description: "Isolated 62 product lines with zero sales velocity over 180+ days across secondary warehouses.",
          impact: "Management launched a targeted clearance campaign and reclaimed 1,800 sq ft of warehouse pallet space."
        }
      ],
      businessImpactDetails: [
        {
          metric: "32%",
          label: "Stockout Reduction",
          description: "Maintained critical product availability during peak seasonal sales surges."
        },
        {
          metric: "$180,000",
          label: "Dead Stock Capital Cleared",
          description: "Converted obsolete inventory into liquid cash via structured promotional channels."
        },
        {
          metric: "89%",
          label: "Supplier OTIF Score",
          description: "Improved supplier adherence through transparent, data-backed monthly SLA reviews."
        }
      ],
      lessonsLearned: {
        challenge: "Handling erratic spikes in demand data caused by one-off promotional flash sales without distorting regular safety stock formulas.",
        technicalDecision: "Implemented outlier clipping and exponential smoothing in the Python preprocessing stage before loading data into Azure SQL.",
        futureImprovements: "Implement automated replenishment order generation via direct EDI connection to suppliers."
      }
    },
    {
      id: "saas-customer-churn-cohort-analytics",
      title: "B2B SaaS Customer Churn & Cohort Retention Analytics",
      tagline: "Medallion Lakehouse and Power BI dashboard modeling Net Revenue Retention (NRR) and feature engagement correlation.",
      category: "Microsoft Fabric",
      categorySlug: "fabric",
      thumbnailGradient: "from-cyan-600 to-blue-700",
      image: "/assets/dashboards/dashboard-operations.png",
      technologies: ["Microsoft Fabric", "PySpark", "Power BI", "DAX", "Lakehouse"],
      businessImpactSummary: "Identified high-retention onboarding feature triggers that lifted 30-day user activation by 19% and maintained 114% NRR.",
      metrics: [
        { label: "Net Revenue Retention", value: "114%", detail: "Sustained SaaS industry benchmark" },
        { label: "30-Day User Activation", value: "+19%", detail: "Following onboarding revamp" },
        { label: "Data Pipeline Refresh", value: "<8 Mins", detail: "Delta Lake Direct Lake model" }
      ],
      problem: {
        description: "A fast-growing B2B SaaS platform lacked unified visibility into Monthly Recurring Revenue (MRR) movements (New, Expansion, Contraction, Churn) and could not pinpoint which in-app user behaviors correlated with long-term subscription renewals.",
        affectedAudience: "Chief Product Officer, Head of Customer Success, VP of Growth, and Executive Board.",
        importance: "Customer acquisition cost (CAC) was rising, making net retention and expansion revenue essential for capital-efficient growth.",
        previousLimitations: [
          "Subscription payment logs in Stripe disconnected from product telemetry logs in Segment.",
          "No automated customer cohort analysis matrix tracking retention by signup month.",
          "Customer Success managers learned of churn only after an account officially cancelled.",
          "Inability to calculate Customer Lifetime Value (LTV) to CAC ratios dynamically across customer tiers."
        ]
      },
      objective: "Unify subscription billing events and product analytics in a Microsoft Fabric Medallion Lakehouse to deliver a real-time SaaS intelligence portal tracking NRR, MRR waterfall, cohort retention, and churn warning signs.",
      architecture: {
        sources: ["Stripe Webhook Billing Events", "Segment Product Usage Telemetry", "HubSpot CRM Deal Data"],
        ingestion: "Fabric Data Pipelines and PySpark notebooks ingesting event streams into Bronze Delta tables.",
        storageLayer: "Fabric Lakehouse Medallion Architecture (Bronze raw -> Silver cleansed -> Gold dimensional models).",
        semanticModel: "Direct Lake Power BI semantic model with Fact_MRR_Monthly_Snapshot, Fact_UserEvents, Dim_Subscription, Dim_Account, Dim_Plan, Dim_Date.",
        consumption: "Executive SaaS Cockpit with MRR Waterfall, Cohort Heatmaps, and Customer Health Scorecards.",
        summary: "Billing and event telemetry are transformed through Fabric PySpark notebooks into Gold Delta tables, enabling sub-second Direct Lake reporting in Power BI."
      },
      dataPreparation: {
        cleaning: "Reconciled asynchronous subscription update webhooks, standardized trial conversions, and aggregated millions of granular clickstream events into daily account-level feature scores.",
        modeling: "Designed an efficient monthly subscription snapshot model to track expansion, contraction, churn, and reactivation movements with complete historical fidelity.",
        qualityChecks: [
          "Reconciled calculated MRR against Stripe dashboard audited financial totals (<0.05% difference).",
          "Deduplicated webhook events using idempotent transaction UUID checks in PySpark.",
          "Verified account cohort classification logic against historical signup timestamps."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Net Revenue Retention (NRR) %",
            description: "Measures percentage of recurring revenue retained from existing customers over a 12-month trailing period.",
            code: `Net Revenue Retention % = 
VAR StartPeriod = MIN('Dim_Date'[Date])
VAR EndPeriod = MAX('Dim_Date'[Date])
VAR BaseMRR = 
    CALCULATE(
        [Total MRR],
        FILTER(
            ALL('Dim_Date'),
            'Dim_Date'[Date] = EDATE(EndPeriod, -12)
        )
    )
VAR RetainedAndExpandedMRR = 
    CALCULATE(
        [Total MRR],
        FILTER(
            ALL(Dim_Account),
            [HadActiveSubscription_12MonthsAgo] = TRUE()
        )
    )
RETURN
    DIVIDE(RetainedAndExpandedMRR, BaseMRR, 0)`
          },
          {
            name: "Net MRR Growth Velocity",
            description: "Calculates the net monthly change in recurring revenue factoring additions and attrition.",
            code: `Net MRR Growth = 
[New MRR] + [Expansion MRR] + [Reactivation MRR] - [Contraction MRR] - [Churned MRR]`
          }
        ],
        features: [
          "Interactive SaaS MRR Waterfall chart breaking down revenue movements by month.",
          "Cohort retention heatmap with dynamic slicers for pricing plan and acquisition channel.",
          "Customer Health Score matrix alerting Customer Success of accounts with falling weekly engagement.",
          "LTV to CAC ratio calculator by customer segment (Startup vs. Mid-Market vs. Enterprise)."
        ],
        security: "Configured row-level access allowing Customer Success managers to view assigned accounts while shielding cross-team contract values."
      },
      dashboardPreview: {
        type: "saas",
        kpiCards: [
          { title: "Monthly Recurring Revenue", value: "$342K", change: "+8.4% MoM", isPositive: true },
          { title: "Net Revenue Retention", value: "114.2%", change: "+3.1% vs Goal", isPositive: true },
          { title: "Customer Churn Rate", value: "1.4%", change: "-0.6% reduction", isPositive: true },
          { title: "LTV / CAC Ratio", value: "4.6x", change: "Top-tier efficiency", isPositive: true }
        ],
        charts: [
          {
            type: "bar",
            title: "MRR Movement Breakdown (Last 6 Months)",
            description: "Expansion revenue from existing tier upgrades consistently surpassed customer churn.",
            dataPoints: [
              { name: "Mar", val1: 26, val2: 7 },
              { name: "Apr", val1: 31, val2: 6 },
              { name: "May", val1: 34, val2: 5 },
              { name: "Jun", val1: 38, val2: 6 },
              { name: "Jul", val1: 42, val2: 5 },
              { name: "Aug", val1: 46, val2: 4 }
            ]
          },
          {
            type: "line",
            title: "12-Month Cohort Retention Curve (%)",
            description: "Accounts active with multi-user collaboration retained at 82% vs 39% single users.",
            dataPoints: [
              { name: "M1", val1: 100 },
              { name: "M3", val1: 89 },
              { name: "M6", val1: 84 },
              { name: "M9", val1: 82 },
              { name: "M12", val1: 82 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "The Multi-User Collaboration Activation Trigger",
          description: "Accounts that invited 3+ team members within the first 14 days had an 82% 12-month retention rate, compared to just 39% for single-user accounts.",
          impact: "Product and Growth teams redesigned the user onboarding flow to prioritize team invites, lifting 30-day activation by 19%."
        },
        {
          title: "Contraction Precedes Churn by 45 Days",
          description: "80% of accounts that ultimately cancelled their plan downgraded seat counts or reduced weekly active usage 45-60 days prior.",
          impact: "Implemented automated proactive health score alerts in Slack for Customer Success to intervene before contract renewal."
        }
      ],
      businessImpactDetails: [
        {
          metric: "114%",
          label: "Net Revenue Retention",
          description: "High expansion revenue offset churn, securing top-quartile B2B SaaS health benchmarks."
        },
        {
          metric: "+19%",
          label: "30-Day User Activation",
          description: "Achieved through data-backed improvements to the initial product onboarding journey."
        },
        {
          metric: "45 Days",
          label: "Early Warning Buffer",
          description: "Gave Customer Success teams actionable warning before accounts reached contract cancellation."
        }
      ],
      lessonsLearned: {
        challenge: "Ingesting high-velocity clickstream event logs without incurring excessive compute costs in cloud staging.",
        technicalDecision: "Used PySpark in Microsoft Fabric to pre-aggregate event data into daily user-feature score summaries before writing to Delta Gold tables.",
        futureImprovements: "Implement real-time streaming analytics using Fabric Eventhouse to trigger immediate in-app prompts."
      }
    },
    {
      id: "healthcare-clinic-flow-optimization",
      title: "Healthcare Clinic Operations & Patient Wait-Time Optimization",
      tagline: "End-to-end SQL analytics and Power BI reporting reducing patient door-to-doctor wait times and optimizing room utilization.",
      category: "SQL Analytics",
      categorySlug: "sql",
      thumbnailGradient: "from-teal-600 to-emerald-700",
      image: "/assets/dashboards/dashboard-finance.png",
      technologies: ["SQL Server", "Power BI", "Data Modeling", "ETL", "Healthcare Analytics"],
      businessImpactSummary: "Reduced average patient wait time by 43% (42 mins to 24 mins) and optimized clinical room utilization by 18%.",
      metrics: [
        { label: "Wait Time Reduction", value: "-43%", detail: "From 42 mins to 24 mins" },
        { label: "Room Utilization", value: "+18%", detail: "Optimized examination schedules" },
        { label: "No-Show Loss Avoided", value: "$95K+", detail: "Via smart appointment buffers" }
      ],
      problem: {
        description: "A network of multi-specialty healthcare clinics experienced severe patient scheduling bottlenecks, high appointment no-show rates (19%), and unpredictable doctor room utilization, leading to patient dissatisfaction and clinician burnout.",
        affectedAudience: "Clinic Medical Directors, Operations Managers, Chief Nursing Officers, and Front-Desk Coordinators.",
        importance: "Excessive wait times caused patient frustration, while idle exam rooms caused lost clinic revenue of over $250K annually.",
        previousLimitations: [
          "Electronic Health Record (EHR) timestamps were stored in unindexed relational tables with no reporting layer.",
          "Clinic managers only received static monthly summaries with no granular hourly peak visibility.",
          "No analytical differentiation between initial consultation vs follow-up procedure durations.",
          "Scheduling buffers were set arbitrarily without empirical arrival time data."
        ]
      },
      objective: "Develop a robust SQL data model and operational Power BI performance suite that analyzes patient journey milestone timestamps, isolates clinic bottlenecks, and provides actionable recommendations to optimize scheduling intervals.",
      architecture: {
        sources: ["EHR Clinical Database (SQL Server)", "Appointment Scheduling Software", "Patient Feedback Surveys"],
        ingestion: "Automated SQL Server views and stored procedures extracting clean timestamp logs during off-peak hours.",
        storageLayer: "HIPAA-compliant SQL Analytics Data Mart with encrypted data at rest.",
        semanticModel: "Star Schema with Fact_PatientEncounter, Fact_SurveyResponses, Dim_PatientDemographics (Anonymized), Dim_Clinician, Dim_Department, Dim_ExamRoom, Dim_TimeSlot.",
        consumption: "Operational Clinical Command Center dashboard with live wait-time monitoring and historical trend analysis.",
        summary: "EHR clinical encounter milestones are processed in an encrypted SQL data mart, driving interactive wait-time and utilization analytics in Power BI."
      },
      dataPreparation: {
        cleaning: "Anonymized all patient health identifiers (PHI) in compliance with healthcare data regulations; calculated exact delta durations between milestone timestamps (Arrival -> Triage -> Consultation -> Discharge).",
        modeling: "Structured an encounter-level fact table capable of slicing patient flow metrics across physician specialties, days of the week, and hourly arrival intervals.",
        qualityChecks: [
          "Removed anomalous encounters with negative durations caused by delayed front-desk check-in entries.",
          "Validated encounter totals against billing claims records (99.8% reconciliation).",
          "Audited clinician schedule master files for accurate room assignment mappings."
        ]
      },
      analyticsDevelopment: {
        daxMeasures: [
          {
            name: "Average Door-to-Doctor Wait Time",
            description: "Calculates the average elapsed minutes from patient reception check-in to physician consultation entry.",
            code: `Avg Door-to-Doctor Wait (Mins) = 
VAR TotalValidEncounters = 
    CALCULATE(
        COUNTROWS(Fact_PatientEncounter),
        Fact_PatientEncounter[WaitTimeMins] >= 0,
        Fact_PatientEncounter[WaitTimeMins] <= 180
    )
VAR TotalWaitMinutes = 
    CALCULATE(
        SUM(Fact_PatientEncounter[WaitTimeMins]),
        Fact_PatientEncounter[WaitTimeMins] >= 0,
        Fact_PatientEncounter[WaitTimeMins] <= 180
    )
RETURN
    DIVIDE(TotalWaitMinutes, TotalValidEncounters, 0)`
          },
          {
            name: "Examination Room Utilization %",
            description: "Measures occupied consultation minutes relative to total scheduled clinic operating hours.",
            code: `Exam Room Utilization % = 
VAR TotalOccupiedMinutes = SUM(Fact_PatientEncounter[ConsultationDurationMins])
VAR TotalAvailableMinutes = 
    CALCULATE(
        SUM(Dim_ExamRoom[AvailableOperatingMinutes]),
        Dim_ExamRoom[IsActive] = TRUE()
    )
RETURN
    DIVIDE(TotalOccupiedMinutes, TotalAvailableMinutes, 0)`
          }
        ],
        features: [
          "Hourly patient arrival heatmap highlighting morning and afternoon bottleneck peaks.",
          "Specialty vs. procedure duration comparison to right-size appointment booking slots.",
          "No-show probability analysis by appointment time and reminder notification channel.",
          "Patient satisfaction correlation chart linking wait time directly to survey scores."
        ],
        security: "De-identified reporting architecture ensuring zero leakage of patient personal health information."
      },
      dashboardPreview: {
        type: "healthcare",
        kpiCards: [
          { title: "Avg Wait Time", value: "24.2 Mins", change: "-43% from 42 mins", isPositive: true },
          { title: "Room Utilization", value: "84.6%", change: "+18.2% improved", isPositive: true },
          { title: "Total Encounters", value: "14,820", change: "+12% patient volume", isPositive: true },
          { title: "Patient Satisfaction", value: "4.7 / 5.0", change: "+0.8 score gain", isPositive: true }
        ],
        charts: [
          {
            type: "bar",
            title: "Average Wait Time by Day of Week (Mins)",
            description: "Monday morning bottlenecks resolved after staggering appointment start times.",
            dataPoints: [
              { name: "Mon", val1: 27 },
              { name: "Tue", val1: 23 },
              { name: "Wed", val1: 22 },
              { name: "Thu", val1: 24 },
              { name: "Fri", val1: 25 },
              { name: "Sat", val1: 21 }
            ]
          },
          {
            type: "line",
            title: "Patient Wait Time vs Satisfaction Rating",
            description: "Strong negative correlation: satisfaction dropped rapidly when wait time exceeded 30 mins.",
            dataPoints: [
              { name: "<15m", val1: 4.9 },
              { name: "15-30m", val1: 4.6 },
              { name: "30-45m", val1: 3.8 },
              { name: "45-60m", val1: 2.9 },
              { name: ">60m", val1: 1.8 }
            ]
          }
        ]
      },
      keyInsights: [
        {
          title: "Monday 9-11 AM Bottleneck Root Cause",
          description: "Analysis proved that 45% of peak wait times occurred because high-complexity new patient assessments were scheduled in the same morning blocks as quick follow-ups.",
          impact: "Staggered appointment slot types and introduced a dedicated fast-track triage nurse, reducing Monday peak waits by 18 minutes."
        },
        {
          title: "SMS Reminders Cut No-Shows by Half",
          description: "Patients receiving an automated SMS confirmation 24 hours prior had a 6.8% no-show rate vs 21.4% for non-contacted patients.",
          impact: "Clinic automated two-way SMS reminders, recapturing ~$95K in otherwise lost physician billing capacity."
        }
      ],
      businessImpactDetails: [
        {
          metric: "43%",
          label: "Wait Time Reduction",
          description: "Significantly improved patient flow and reduced clinic waiting room congestion."
        },
        {
          metric: "+18%",
          label: "Room Utilization",
          description: "Enabled clinical departments to see 1,400+ additional patients without increasing facility footprint."
        },
        {
          metric: "4.7 / 5.0",
          label: "Patient Satisfaction Score",
          description: "Achieved highest recorded patient satisfaction ratings across all clinic branches."
        }
      ],
      lessonsLearned: {
        challenge: "Dealing with missing timestamp entries when staff forgot to click check-in status during high-volume triage rushes.",
        technicalDecision: "Created a SQL validation routine using nurse consultation logging timestamps to backfill missing arrival markers accurately.",
        futureImprovements: "Integrate RFID badge beacon tracking in clinic rooms for automated real-time patient journey logging."
      }
    }
  ],

  skillsCategories: [
    {
      title: "Business Intelligence & Visualization",
      iconName: "BarChart3",
      description: "Transforming raw business data into intuitive, executive-ready dashboards and decision models.",
      skills: [
        { name: "Power BI", level: "Expert", highlight: true, context: "End-to-end report design, Direct Lake, Service apps, and enterprise administration" },
        { name: "DAX (Data Analysis Expressions)", level: "Advanced", highlight: true, context: "Complex time intelligence, CALCULATE modifiers, dynamic measures, and optimization" },
        { name: "Power Query & M", level: "Advanced", highlight: true, context: "Data mashups, custom M functions, parameterization, and schema transformation" },
        { name: "Data Modeling", level: "Advanced", highlight: true, context: "Star Schema architecture, Snowflake models, role-playing dims, and relationship integrity" },
        { name: "Dashboard UI/UX", level: "Advanced", highlight: false, context: "Clean visual hierarchy, user navigation, mobile-responsive layouts, and accessibility" },
        { name: "KPI Development", level: "Advanced", highlight: false, context: "Defining actionable business metrics aligned with executive goals and operational OKRs" }
      ]
    },
    {
      title: "Data & Querying",
      iconName: "Database",
      description: "Writing performant queries, engineering relational schemas, and conducting deep exploratory data analysis.",
      skills: [
        { name: "SQL (Complex Querying)", level: "Advanced", highlight: true, context: "CTEs, Window functions, Subqueries, Stored Procedures, Views, and Indexing" },
        { name: "Microsoft SQL Server", level: "Advanced", highlight: true, context: "T-SQL scripting, relational schema design, query plan optimization, and SSMS" },
        { name: "PostgreSQL & MySQL", level: "Proficient", highlight: false, context: "Data extraction, database normalization, and analytics warehousing" },
        { name: "Advanced Excel", level: "Expert", highlight: true, context: "Power Pivot, Power Query, Dynamic Arrays, XLOOKUP, Financial Modeling, and VBA" },
        { name: "Python for Data Analysis", level: "Proficient", highlight: true, context: "Pandas, NumPy, Matplotlib, exploratory data analysis, and automated data wrangling" }
      ]
    },
    {
      title: "Microsoft Data Platform & Fabric",
      iconName: "Layers",
      description: "Leveraging the modern unified Microsoft analytics ecosystem for scalable data lakes and warehouses.",
      skills: [
        { name: "Microsoft Fabric", level: "Proficient", highlight: true, context: "Lakehouse, Warehouse, Direct Lake mode, and workspace collaboration" },
        { name: "Fabric Lakehouse", level: "Proficient", highlight: true, context: "Delta Parquet tables, Medallion architecture (Bronze/Silver/Gold)" },
        { name: "Fabric Data Pipelines", level: "Proficient", highlight: false, context: "Automating ETL/ELT pipelines, copy activities, and trigger schedules" },
        { name: "Fabric Notebooks (PySpark)", level: "Proficient", highlight: false, context: "Data transformation, distributed dataframe manipulation, and feature engineering" },
        { name: "Azure Data Services", level: "Proficient", highlight: false, context: "Azure SQL Database, Azure Blob Storage, and cloud data architecture" }
      ]
    },
    {
      title: "Data Engineering & Architecture",
      iconName: "Cpu",
      description: "Building robust data pipelines, ensuring data quality, and maintaining scalable reporting layers.",
      skills: [
        { name: "ETL / ELT Architecture", level: "Advanced", highlight: true, context: "Designing reliable extraction, cleansing, transformation, and loading pipelines" },
        { name: "Data Ingestion & Integration", level: "Advanced", highlight: false, context: "Connecting REST APIs, ERPs, CRMs, SQL databases, and flat files" },
        { name: "Data Quality & Validation", level: "Advanced", highlight: true, context: "Automated integrity assertions, null handling, and reconciliation testing" },
        { name: "Data Warehousing Concepts", level: "Advanced", highlight: false, context: "Dimensional modeling (Kimball methodology), SCD Types, and Fact tables" },
        { name: "Performance Optimization", level: "Advanced", highlight: false, context: "DAX Studio, VertiPaq analyzer, query reduction, and relationship cardinality tuning" }
      ]
    },
    {
      title: "Security, Governance & Access",
      iconName: "ShieldCheck",
      description: "Protecting sensitive organizational data while ensuring compliant, role-tailored access.",
      skills: [
        { name: "Row-Level Security (RLS)", level: "Advanced", highlight: true, context: "Static and Dynamic RLS using DAX USERPRINCIPALNAME and access matrices" },
        { name: "Dynamic User Access", level: "Advanced", highlight: true, context: "Mapping organizational hierarchies and department trees for granular filtering" },
        { name: "Workspace Governance", level: "Proficient", highlight: false, context: "Managing deployment pipelines, app permissions, and sensitivity labels" },
        { name: "Data Confidentiality", level: "Advanced", highlight: false, context: "PII masking, HIPAA/GDPR alignment, and sanitized test data generation" }
      ]
    }
  ],

  experience: [
    {
      role: "Data Analyst",
      company: "IntegCubes.Com",
      location: "Islamabad, Pakistan / Remote",
      period: "2024 - Present",
      isCurrent: true,
      description: "Clean, transform, and model raw data using Power BI to generate actionable business insights and support data-driven decision making.",
      responsibilities: [
        "Clean, transform, and model raw data using Power BI to generate actionable business insights.",
        "Extract and integrate data from multiple sources including Excel, SQL, data lakes, and data warehouses.",
        "Develop data models and interactive visualizations to support executive and operational decision-making.",
        "Solve complex data-related problems efficiently and deliver high-precision results within tight deadlines."
      ],
      technologies: ["Power BI", "SQL", "Excel", "Data Lakes", "Data Warehouses", "DAX", "Power Query"],
      achievements: [
        "Built automated multi-source ETL pipelines integrating SQL databases, data lakes, and Excel spreadsheets.",
        "Engineered custom Power BI semantic models and interactive executive dashboards with sub-second responsiveness.",
        "Delivered data-driven reporting solutions on tight turnarounds for cross-functional stakeholders."
      ]
    },
    {
      role: "Data Analyst & Reporting Specialist",
      company: "FWO 751 CITY",
      location: "Pakistan",
      period: "2024 - 2025",
      isCurrent: false,
      description: "Managed operational data validation, cleaning, and performance reporting using Advanced Excel and modern data visualization tools.",
      responsibilities: [
        "Performed rigorous data entry, validation, and automated cleaning using Advanced Excel formulas and pivot tables.",
        "Created and maintained structured reporting systems to track key performance metrics across operations.",
        "Assisted in data visualization and KPI report generation using analytics tools to support organizational objectives.",
        "Ensured data consistency, accuracy, and audit-ready reporting across department records."
      ],
      technologies: ["Advanced Excel", "Pivot Tables", "Formulas & Macros", "Data Validation", "Data Cleaning", "KPI Reporting"],
      achievements: [
        "Streamlined daily and monthly performance reporting, reducing manual data compilation time.",
        "Standardized validation checks, eliminating spreadsheet errors and data inconsistencies across team metrics.",
        "Collaborated with project managers to create actionable visual summaries for management reviews."
      ]
    }
  ],

  services: [
    {
      id: "power-bi",
      title: "Power BI Development & Dashboards",
      icon: "BarChart3",
      description: "Custom interactive dashboards, executive KPI scorecards, mobile-optimized layouts, and advanced DAX modeling built for rapid business insight.",
      deliverables: [
        "Executive & Operational Dashboards",
        "Advanced DAX Measures & Time Intelligence",
        "Clean UX, Visual Hierarchy & Drill-throughs",
        "Multi-source Data Integration"
      ],
      suitableFor: "Companies seeking clear, interactive dashboards that replace static reports and drive fast leadership decisions."
    },
    {
      id: "data-analysis",
      title: "Data Analysis & Business Storytelling",
      icon: "LineChart",
      description: "Thorough exploratory analysis, variance tracking, trend discovery, and root-cause investigation to turn raw numbers into clear business stories.",
      deliverables: [
        "Exploratory Data Analysis (EDA)",
        "Predictive Modeling & Trend Analysis",
        "Visual Data Storytelling & Infographics",
        "Actionable Business Recommendations"
      ],
      suitableFor: "Organizations looking to understand operational bottlenecks, revenue trends, or customer behavior."
    },
    {
      id: "sql-analytics",
      title: "SQL Querying & Data Extraction",
      icon: "Database",
      description: "Writing complex, performant SQL queries, data manipulation scripts, and creating organized analytical views for reliable reporting.",
      deliverables: [
        "Complex SQL Queries & CTEs",
        "Analytical Views & Stored Procedures",
        "Multi-table Data Extraction & Joins",
        "Database Cleaning & Transformation"
      ],
      suitableFor: "Businesses needing structured, fast-running SQL layers that power business applications and BI tools."
    },
    {
      id: "excel-automation",
      title: "Advanced Excel & Data Cleaning",
      icon: "Layers",
      description: "Automated Excel financial models, advanced pivot tables, dynamic lookup formulas, and automated validation scripts that eliminate manual work.",
      deliverables: [
        "Advanced Formulas & Dynamic Arrays",
        "Power Pivot & Power Query Automation",
        "Automated Data Cleaning & Validation",
        "Executive Financial & Operational Sheets"
      ],
      suitableFor: "Teams spending hours every week manually compiling, cleaning, and formatting Excel workbooks."
    },
    {
      id: "ai-automation",
      title: "AI Tools & Automation for Analytics",
      icon: "Zap",
      description: "Leveraging modern AI tools and Python scripting for automated data extraction, feature enhancement, text parsing, and analytical workflows.",
      deliverables: [
        "Python Data Automation Scripts",
        "AI-assisted Data Enhancement",
        "Automated Scheduled Reporting",
        "Data Pipeline Optimization"
      ],
      suitableFor: "Modern enterprises seeking to accelerate data engineering and reporting cycles with cutting-edge AI."
    },
    {
      id: "data-modeling",
      title: "Semantic Data Modeling & Warehousing",
      icon: "Network",
      description: "Building resilient Star Schema models connecting data lakes, data warehouses, SQL databases, and flat files for unified reporting truth.",
      deliverables: [
        "Star & Snowflake Schema Design",
        "Fact & Dimension Table Definition",
        "Relationship & Cardinality Optimization",
        "Single-source-of-truth Architecture"
      ],
      suitableFor: "Companies suffering from slow, inaccurate, or conflicting numbers across different departments."
    }
  ],

  credibilityPoints: [
    {
      title: "Business Decision-Focused",
      subtitle: "Outcomes Over Visuals",
      description: "I don't just build pretty charts. Every dashboard is engineered around real business questions, KPIs, and decisions that generate measurable ROI.",
      icon: "Target"
    },
    {
      title: "Technical Depth",
      subtitle: "Power BI, Excel, SQL & Python",
      description: "Strong hands-on mastery in writing complex DAX formulas, optimizing SQL queries, building data models, and automating data pipelines.",
      icon: "Code2"
    },
    {
      title: "Scalable Architecture",
      subtitle: "Data Lakes & Warehouses",
      description: "Experience connecting and modeling data across multiple platforms: SQL, Excel, Data Lakes, Data Warehouses, and REST feeds.",
      icon: "TrendingUp"
    },
    {
      title: "Rigorous Data Quality",
      subtitle: "Zero Reconciliation Errors",
      description: "Data validation, reconciliation checks, and automated cleaning are treated as non-negotiable foundations of every reporting system I deliver.",
      icon: "CheckCircle2"
    },
    {
      title: "Creative Storytelling",
      subtitle: "Visual Design & Content Creation",
      description: "Background in graphic design and visual storytelling ensuring intuitive UI/UX, clear visual hierarchy, and compelling executive communication.",
      icon: "Lock"
    },
    {
      title: "Clear Communication",
      subtitle: "Translating Tech to Insights",
      description: "Translating complex data engineering concepts into clear, plain-language insights that executives, managers, and non-technical stakeholders easily grasp.",
      icon: "MessageSquare"
    }
  ],

  certifications: [
    {
      title: "BS in Computer Science (BSCS)",
      issuer: "Abdul Wali Khan University Mardan",
      date: "2020 - 2024",
      status: "Completed",
      description: "4-Year Bachelor of Science in Computer Science with focus on Database Management Systems, Data Structures, Algorithms, Software Engineering, and Python.",
      skills: ["Database Systems", "SQL", "Python", "Data Structures", "Algorithms", "Software Engineering"]
    },
    {
      title: "Microsoft Power BI",
      issuer: "UniAthena Institute",
      date: "2024",
      status: "Certified",
      description: "Professional certification covering end-to-end Power BI report design, data modeling, DAX time-intelligence calculations, and dashboard publication.",
      skills: ["Power BI", "DAX", "Data Modeling", "Power Query", "Interactive Dashboards"]
    },
    {
      title: "Power BI Basic Course",
      issuer: "Satish Dhawale",
      date: "2024",
      status: "Certified",
      description: "Hands-on certification in Power BI fundamentals, data transformation workflows, visual design principles, and report formatting.",
      skills: ["Power BI", "Data Cleaning", "Data Visualization", "Power Query"]
    },
    {
      title: "Web Development",
      issuer: "DigiSkills Training Program",
      date: "2024",
      status: "Certified",
      description: "Comprehensive training in web architecture, responsive user interface design, front-end development, and modern digital platforms.",
      skills: ["Web Development", "Responsive UI", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Graphic Design Course",
      issuer: "DigiSkills Training Program",
      date: "2024",
      status: "Certified",
      description: "Visual design hierarchy, color theory, typography, infographics, and graphic design principles for visual data storytelling.",
      skills: ["Graphic Design", "Data Storytelling", "Visual Design", "UI/UX"]
    },
    {
      title: "Digital Marketing",
      issuer: "DigiSkills Training Program",
      date: "2023",
      status: "Certified",
      description: "Performance metrics tracking, campaign analytics, conversion funnels, audience segmentation, and ROI measurement.",
      skills: ["Digital Marketing", "Marketing Analytics", "Performance Metrics", "Audience Insights"]
    },
    {
      title: "Business Communication",
      issuer: "DigiSkills Training Program",
      date: "2023",
      status: "Certified",
      description: "Executive presentation skills, technical reporting, cross-functional stakeholder communication, and professional writing.",
      skills: ["Business Communication", "Executive Presentation", "Technical Writing"]
    },
    {
      title: "QuickBooks & Financial Recordkeeping",
      issuer: "DigiSkills Training Program",
      date: "2023",
      status: "Certified",
      description: "Financial data entry, ledger reconciliation, profit & loss statement generation, and accounting workflow management.",
      skills: ["QuickBooks", "Financial Data", "Reconciliation", "Accounting Workflow"]
    }
  ]
};
