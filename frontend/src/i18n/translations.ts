export type Language = 'en' | 'te' | 'hi'

export const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' },
]

type TranslationKeys = typeof en

const en = {
  brand: {
    name: 'StandardsAI',
    subtitle: 'AI-Powered Standards Assistant for Procurement',
    prototype: 'SIH26108 Prototype',
  },
  nav: {
    home: 'Home',
    about: 'About',
    howItWorks: 'How It Works',
    standards: 'Standards',
    help: 'Help',
    login: 'Login',
    dashboard: 'Dashboard',
    analyze: 'Analyze',
    reports: 'Reports',
    search: 'Search',
    notifications: 'Notifications',
    profile: 'Profile',
  },
  home: {
    heroTitle: 'Find the Right Indian Standards for Your Procurement',
    heroSubtitle:
      'Analyze procurement requirements, discover relevant standards, check related requirements, and create an evidence-backed standards report.',
    analyzeRequirement: 'Analyze Requirement',
    exploreStandards: 'Explore Standards',
    howItWorks: 'How It Works',
    step1: 'Add Requirement',
    step2: 'AI Finds Standards',
    step3: 'Review Results',
    step4: 'Create Report',
    keyFeatures: 'Key Features',
    whyItHelps: 'Why It Helps',
    fasterSearch: 'Faster search',
    betterCoverage: 'Better coverage',
    currentInfo: 'Current information',
    clearEvidence: 'Clear evidence',
    standardsPreview: 'Standards Explorer Preview',
    finalCta: 'Ready to analyze a procurement requirement?',
    startAnalysis: 'Start Analysis',
    demoNotice: 'Demo data shown for prototype demonstration purposes.',
  },
  dashboard: {
    greeting: 'Good morning',
    subtitle: 'Find and review Indian Standards for your procurement requirements.',
    analyzeRequirement: 'Analyze Requirement',
    analyses: 'Analyses',
    savedStandards: 'Saved Standards',
    reports: 'Reports',
    recentSearches: 'Recent Searches',
    quickActions: 'Quick Actions',
    uploadTender: 'Upload Tender',
    exploreStandards: 'Explore Standards',
    recentAnalysis: 'Recent Analysis',
    noAnalyses: 'No analyses yet',
    noAnalysesDesc: 'Start by entering a procurement requirement or uploading a tender document.',
  },
  analyze: {
    title: 'Analyze Requirement',
    stepRequirement: 'Requirement',
    stepReview: 'Review',
    stepResults: 'Results',
    stepReport: 'Report',
    writeRequirement: 'Write Requirement',
    uploadTender: 'Upload Tender',
    placeholder: 'Describe the product or procurement requirement...',
    moreDetails: 'More details',
    confirmFind: 'Confirm & Find Standards',
    edit: 'Edit',
    foundRequirements: 'We found these requirements',
    analyzing: 'Analyzing your requirement',
  },
  results: {
    title: 'Recommended Standards',
    subtitle: 'Based on the procurement requirements you provided.',
    whyRecommended: 'Why recommended?',
    viewDetails: 'View Details',
    latestVersion: 'Latest version',
    aiNotice: 'AI-assisted recommendation',
    aiNoticeText:
      'These recommendations are generated from the available standards knowledge base and supporting evidence. The procurement authority should review and make the final determination.',
  },
  common: {
    view: 'View',
    download: 'Download',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    tryAgain: 'Try Again',
    loading: 'Loading...',
    noResults: 'No results found',
    demoData: 'Demo data',
  },
}

const te: TranslationKeys = {
  ...en,
  home: {
    ...en.home,
    heroTitle: 'మీ PROCUREMENT కోసం సరైన Indian Standards కనుగొనండి',
    heroSubtitle:
      'Procurement requirements విశ్లేషించండి, relevant standards కనుగొనండి, related requirements తనిఖీ చేయండి.',
    analyzeRequirement: 'Requirement విశ్లేషించండి',
    exploreStandards: 'Standards Explore చేయండి',
  },
  dashboard: {
    ...en.dashboard,
    greeting: 'శుభోదయం',
    subtitle: 'మీ procurement requirements కోసం Indian Standards కనుగొనండి.',
  },
}

const hi: TranslationKeys = {
  ...en,
  home: {
    ...en.home,
    heroTitle: 'अपनी खरीद के लिए सही भारतीय मानक खोजें',
    heroSubtitle:
      'खरीद आवश्यकताओं का विश्लेषण करें, प्रासंगिक मानक खोजें, संबंधित आवश्यकताओं की जांच करें।',
    analyzeRequirement: 'आवश्यकता का विश्लेषण करें',
    exploreStandards: 'मानक देखें',
  },
  dashboard: {
    ...en.dashboard,
    greeting: 'सुप्रभात',
    subtitle: 'अपनी खरीद आवश्यकताओं के लिए भारतीय मानक खोजें और समीक्षा करें।',
  },
}

export const translations: Record<Language, TranslationKeys> = { en, te, hi }

export type Translations = TranslationKeys
