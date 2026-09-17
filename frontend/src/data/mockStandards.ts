export const mockStandardsList: import('../types').StandardListItem[] = [
  {
    id: 'IS-2062-2025',
    isNumber: 'IS 2062 (Part 1):2025',
    title: 'Structural Steel - Part 1 - Hot Rolled Medium and High Tensile Steel',
    category: 'Steel & Construction',
    status: 'Active',
    year: '2025',
    type: 'Product Standard',
  },
  {
    id: 'IS-456-2000',
    isNumber: 'IS 456:2000',
    title: 'Plain and Reinforced Concrete - Code of Practice',
    category: 'Civil & Construction',
    status: 'Active',
    year: '2000',
    type: 'Code of Practice',
  },
  {
    id: 'IS-1786-2008',
    isNumber: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
    category: 'Steel & Construction',
    status: 'Active',
    year: '2008',
    type: 'Product Standard',
  },
  {
    id: 'IS-694-2010',
    isNumber: 'IS 694:2010',
    title: 'Polyvinyl Chloride Insulated Cables/Cords for Voltages Up to 1100 V',
    category: 'Electrical Distribution',
    status: 'Active',
    year: '2010',
    type: 'Product Standard',
  },
  {
    id: 'IS-10500-2012',
    isNumber: 'IS 10500:2012',
    title: 'Drinking Water Specification',
    category: 'Water & Environmental',
    status: 'Active',
    year: '2012',
    type: 'Product Standard',
  },
  {
    id: 'IS-17017-2021',
    isNumber: 'IS 17017 (Part 1):2021',
    title: 'Electric Vehicle Conductive Charging System - Part 1: General Requirements',
    category: 'EV & Smart Mobility',
    status: 'Active',
    year: '2021',
    type: 'Product Standard',
  },
  {
    id: 'IS-1893-2025',
    isNumber: 'IS 1893 (Part 1):2025',
    title: 'Criteria for Earthquake Resistant Design of Structures - Part 1: General Provisions',
    category: 'Civil & Construction',
    status: 'Active',
    year: '2025',
    type: 'Code of Practice',
  },
  {
    id: 'IS-732-2019',
    isNumber: 'IS 732:2019',
    title: 'Code of Practice for Electrical Wiring Installations',
    category: 'Electrical Distribution',
    status: 'Active',
    year: '2019',
    type: 'Code of Practice',
  },
];

export const mockStandardDetails: Record<string, import('../types').StandardDetail> = {
  'IS-2062-2025': {
    id: 'IS-2062-2025',
    isNumber: 'IS 2062 (Part 1):2025',
    title: 'Structural Steel - Part 1 - Hot Rolled Medium and High Tensile Steel',
    relevance: 'very-high',
    score: 96,
    reasons: [
      'Structural steel requirement detected',
      'Hot-rolled product type matches',
      'Tensile & yield stress parameters aligned',
      'Current active edition (7th Revision 2025)',
    ],
    matchScores: [
      { category: 'Requirement match', level: 'high', score: 96 },
      { category: 'Product match', level: 'high', score: 98 },
      { category: 'Application match', level: 'high', score: 94 },
      { category: 'Evidence match', level: 'high', score: 91 },
    ],
    evidence: [
      {
        id: 'ev-2062-1',
        source: 'Tender Specification Sec 3.1',
        section: 'Steel Grade & Tensile Strength',
        text: 'Structural steel members must comply with Fe 410 / Fe 540 grade hot-rolled steel.',
        status: 'verified',
      },
    ],
    latestVersion: '2025',
    status: 'Active',
    category: 'Steel & Construction',
    year: '2025',
    overview:
      'Covers physical and mechanical requirements for hot-rolled medium and high tensile structural steel plates, shapes, and sections used in structural steelwork, bridges, buildings, and infrastructure projects.',
    scope:
      'Specifies chemical composition, tensile strength, yield stress, impact toughness, and tolerances for hot-rolled structural steel sections.',
    keyRequirements: [
      'Fe 410 / Fe 540 grade minimum yield strength',
      'Minimum 20% elongation percentage',
      'Charpy V-notch impact toughness testing at 0°C',
      'Carbon equivalent (CE) weldability control',
      'Mandatory BIS ISI Mark Certification',
    ],
    clauses: [
      { number: '1', title: 'Scope', description: 'Covers hot-rolled structural steel plates and sections.' },
      { number: '6', title: 'Chemical Composition', description: 'Maximum carbon, manganese, phosphorus, and sulfur limits.' },
      { number: '8', title: 'Mechanical Properties', description: 'Yield stress, tensile strength, and elongation requirements.' },
    ],
    relatedStandards: [
      { id: 'IS-456-2000', isNumber: 'IS 456:2000', title: 'Plain and Reinforced Concrete Code', relationship: 'related' },
      { id: 'IS-1893-2025', isNumber: 'IS 1893 (Part 1):2025', title: 'Earthquake Resistant Design', relationship: 'safety' },
      { id: 'IS-1786-2008', isNumber: 'IS 1786:2008', title: 'High Strength Deformed Steel Bars', relationship: 'related' },
    ],
    versions: [
      { year: '2025', label: '7th Revision (Current)', type: 'latest', description: 'Seventh revision published by BIS' },
      { year: '2011', label: '6th Revision', type: 'revision', description: 'Previous edition' },
    ],
    certification: [
      { type: 'BIS Product Certification', status: 'available', description: 'Mandatory Certification under BIS Scheme-I', isMandatory: true },
      { type: 'CRS', status: 'not-applicable' },
      { type: 'Hallmarking', status: 'not-applicable' },
    ],
    sources: [
      { name: 'BIS Standards Portal (standards.bis.gov.in)', status: 'Verified BIS Record' },
    ],
  },
};

export function getMockStandardDetail(id: string): import('../types').StandardDetail | null {
  const normalizedId = id.replace('rec-', '').replace('std-', '')
  return mockStandardDetails[normalizedId] ?? mockStandardDetails[id] ?? mockStandardDetails['IS-2062-2025']
}

export function getMockGraphData(mainStandardId: string): import('../types').GraphData {
  const main = mockStandardDetails[mainStandardId] ?? mockStandardDetails['IS-2062-2025']
  return {
    nodes: [
      { id: main.id, label: main.title, isNumber: main.isNumber, type: 'main' },
      ...main.relatedStandards.map((r) => ({
        id: r.id,
        label: r.title,
        isNumber: r.isNumber,
        type: r.relationship === 'normative-reference' ? ('reference' as const) : r.relationship,
      })),
    ],
    edges: main.relatedStandards.map((r) => ({
      from: main.id,
      to: r.id,
      label: r.relationship.replace('-', ' '),
    })),
  }
}
