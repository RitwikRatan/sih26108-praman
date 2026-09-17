from typing import List, Optional
from app.schemas.standards import IndianStandard, ClauseInfo, VersionItem, CertificationItem, SourceEvidence, RelatedStandardItem, StandardGraph, GraphNode, GraphEdge

STANDARDS_KNOWLEDGE_BASE: List[IndianStandard] = [
    IndianStandard(
        id="is-2925-1984",
        is_number="IS 2925 : 1984",
        title="Industrial Safety Helmets",
        category="Personal Protective Equipment",
        status="Active",
        year="1984",
        scope="Specifies physical, performance, and testing requirements for industrial safety helmets for construction, mining, and industrial personnel protection against impact and electrical shock.",
        key_requirements=[
            "Shock absorption performance tests (max force transmission <= 5.0 kN)",
            "Penetration resistance with 3kg drop weight",
            "Flame resistance and lateral rigidity",
            "Electrical insulation up to 1.2 kV for electrical hazards",
            "Adjustable chin strap retaining system (release force 150N - 250N)"
        ],
        clauses=[
            ClauseInfo(number="Clause 4.1", title="Materials & Construction", summary="Shell must be smooth, impact resistant HDPE, ABS or fiberglass with non-irritating harness.", is_mandatory=True),
            ClauseInfo(number="Clause 5.2", title="Shock Absorption Test", summary="Deceleration of headform shall not exceed 50g acceleration equivalent.", is_mandatory=True),
            ClauseInfo(number="Clause 6.1", title="Electrical Insulation", summary="Leaking current shall not exceed 3mA under 1200V AC test.", is_mandatory=True),
            ClauseInfo(number="Clause 7.4", title="Marking & BIS Logo", summary="Must carry IS number, Manufacturer trademark, Year of manufacture and ISI mark.", is_mandatory=True),
        ],
        related_standards=[
            RelatedStandardItem(id="is-4681-1981", is_number="IS 4681 : 1981", title="Method of Testing Safety Helmets", relationship="testing", description="Detailed laboratory impact and penetration test protocols."),
            RelatedStandardItem(id="is-4707-2020", is_number="IS 4707 : 2020", title="Safety Standards for Personal Protective Clothing", relationship="safety", description="Guidelines on integrated safety gear and high-visibility apparel."),
            RelatedStandardItem(id="is-2062-2011", is_number="IS 2062 : 2011", title="Hot Rolled Medium and High Tensile Structural Steel", relationship="normative-reference", description="Reference for structural scaffolding and head impact hazard environments."),
            RelatedStandardItem(id="is-14489-1998", is_number="IS 14489 : 1998", title="Code of Practice for Occupational Safety Audits", relationship="installation", description="Audit protocols for personal protective equipment deployment.")
        ],
        versions=[
            VersionItem(year="1964", title="First Publication", type="original", description="Initial specification for head protection in industrial sites."),
            VersionItem(year="1984", title="Second Revision (Current)", type="revision", description="Incorporated ergonomic harness design and high voltage electrical insulation."),
            VersionItem(year="2018", title="Amendment 1", type="amendment", description="Updated chin strap tension test limits."),
            VersionItem(year="2024", title="Reaffirmed 2024 (Latest)", type="latest", description="Reaffirmed by BIS technical committee without structural changes.")
        ],
        certifications=[
            CertificationItem(scheme="BIS Product Certification Scheme (ISI Mark)", status="Information Available", details="Mandatory ISI Mark certification required for public procurement under Quality Control Order.", is_mandatory=True),
            CertificationItem(scheme="CRS (Compulsory Registration Scheme)", status="Not Applicable", details="CRS applies to electronic items; IS 2925 falls under ISI Mark scheme.", is_mandatory=False),
            CertificationItem(scheme="Hallmarking", status="Not Applicable", details="Not applicable to industrial headwear.", is_mandatory=False)
        ],
        sources=[
            SourceEvidence(section="Section 4 - Performance Requirements", clause="Clause 4.2.1", text="Industrial safety helmets shall provide adequate protection to the crown against falling objects and impact shocks.", confidence=0.98, verified=True),
            SourceEvidence(section="Section 6 - Electrical Tests", clause="Clause 6.1", text="Helmets for electrical utility workers must satisfy 1.2 kV dielectric voltage test without breakdown.", confidence=0.95, verified=True)
        ]
    ),
    IndianStandard(
        id="is-2062-2011",
        is_number="IS 2062 : 2011",
        title="Hot Rolled Medium and High Tensile Structural Steel",
        category="Civil & Structural Materials",
        status="Active",
        year="2011",
        scope="Covers requirements for structural steel sections, plates, flats, and bars suitable for welded, bolted, and riveted structural fabrication.",
        key_requirements=[
            "Minimum Yield Strength E250 / E350 / E450 grade classifications",
            "Tensile strength testing range 410 - 630 MPa",
            "Charpy V-notch impact toughness test at 0°C and -20°C",
            "Carbon Equivalent (CE) limitation <= 0.42% for weldability",
            "Bend test without fracture on inner bend radius"
        ],
        clauses=[
            ClauseInfo(number="Clause 6.1", title="Chemical Composition", summary="Specifies strict limits on Sulphur (<= 0.045%) and Phosphorus (<= 0.045%).", is_mandatory=True),
            ClauseInfo(number="Clause 8.3", title="Tensile Test Requirements", summary="Specifies yield stress, tensile strength, and percentage elongation.", is_mandatory=True),
            ClauseInfo(number="Clause 12.1", title="Tolerance on Dimensions", summary="Dimensions shall conform to IS 1852 standards.", is_mandatory=True)
        ],
        related_standards=[
            RelatedStandardItem(id="is-1608-2018", is_number="IS 1608 : 2018", title="Metallic Materials Tensile Testing", relationship="testing", description="Test procedure for yield and tensile strength."),
            RelatedStandardItem(id="is-800-2007", is_number="IS 800 : 2007", title="Code of Practice for General Construction in Steel", relationship="installation", description="Design and installation standards for structural steelwork.")
        ],
        versions=[
            VersionItem(year="1999", title="Fifth Revision", type="original", description="Consolidated grade specifications."),
            VersionItem(year="2011", title="Seventh Revision (Current)", type="revision", description="Introduced sub-quality classifications (A, BR, BO, C) based on impact energy."),
            VersionItem(year="2019", title="Amendment 2", type="amendment", description="Revised carbon equivalent calculation formulas for ultra-high strength grades."),
            VersionItem(year="2025", title="Latest Available", type="latest", description="Reaffirmed active standard by Bureau of Indian Standards.")
        ],
        certifications=[
            CertificationItem(scheme="BIS ISI Mark Scheme", status="Information Available", details="Mandatory certification for steel plates and structural shapes under Steel and Steel Products QCO.", is_mandatory=True)
        ],
        sources=[
            SourceEvidence(section="Section 8 - Mechanical Properties", clause="Clause 8.1", text="Steel shall conform to mechanical property requirements for grades E250 to E650.", confidence=0.96, verified=True)
        ]
    ),
    IndianStandard(
        id="is-15652-2006",
        is_number="IS 15652 : 2006",
        title="Insulating Mats for Electrical Purposes",
        category="Electrical Safety Equipment",
        status="Active",
        year="2006",
        scope="Specifies characteristics for elastomer insulating mats used as floor covering for personal protection of workers on AC and DC high voltage electrical installations.",
        key_requirements=[
            "Class 0 (up to 3.3 kV), Class 1 (11 kV), Class 2 (33 kV) rating insulation",
            "Dielectric strength testing with 50 kV proof voltage",
            "Flame retardancy and self-extinguishing properties",
            "Acid, alkali, oil, and low-temperature resistant elastomeric compound",
            "Anti-skid texture surface with minimum thickness 2.0 mm to 3.5 mm"
        ],
        clauses=[
            ClauseInfo(number="Clause 5.1", title="Dielectric Proof Test", summary="No electrical puncture or breakdown at specified proof voltage for 1 minute.", is_mandatory=True),
            ClauseInfo(number="Clause 6.3", title="Tensile Strength & Elongation", summary="Tensile strength >= 15 N/mm2, elongation at break >= 250%.", is_mandatory=True)
        ],
        related_standards=[
            RelatedStandardItem(id="is-2071-2014", is_number="IS 2071 : 2014", title="High Voltage Test Techniques", relationship="testing", description="High voltage breakdown test procedures."),
            RelatedStandardItem(id="is-5216-1982", is_number="IS 5216 : 1982", title="Recommendations on Safety Procedures in Electrical Work", relationship="safety", description="Safety guidelines for electrical switchgear rooms.")
        ],
        versions=[
            VersionItem(year="2006", title="First Edition", type="revision", description="Replaced legacy rubber mat standard IS 5424 with synthetic elastomeric specifications."),
            VersionItem(year="2023", title="Reaffirmed (Latest)", type="latest", description="Reaffirmed active standard.")
        ],
        certifications=[
            CertificationItem(scheme="BIS ISI Mark Scheme", status="Information Available", details="Mandatory certification for electrical safety mats under Electrical Equipment QCO.", is_mandatory=True)
        ],
        sources=[
            SourceEvidence(section="Section 5 - Electrical Requirements", clause="Clause 5.1", text="Insulating mats shall withstand specified withstand voltage without flashover.", confidence=0.99, verified=True)
        ]
    ),
    IndianStandard(
        id="is-302-2-3-2007",
        is_number="IS 302 (Part 2/Sec 3) : 2007",
        title="Safety of Household and Similar Electrical Appliances - Electric Irons",
        category="Electrical & Electronics",
        status="Active",
        year="2007",
        scope="Deals with safety of electric dry irons and steam irons for household and commercial procurement.",
        key_requirements=[
            "Protection against access to live parts",
            "Heating element insulation resistance > 2 Mohm under humid conditions",
            "Thermostatic cutoff temperature limit compliance",
            "Mechanical strength drop test from 400mm height"
        ],
        clauses=[
            ClauseInfo(number="Clause 8", title="Protection against Electric Shock", summary="Live parts shall not be accessible with standard test finger.", is_mandatory=True)
        ],
        related_standards=[
            RelatedStandardItem(id="is-302-1-2008", is_number="IS 302 (Part 1) : 2008", title="General Safety Requirements for Electrical Appliances", relationship="normative-reference", description="General appliance safety code.")
        ],
        versions=[
            VersionItem(year="2007", title="Current Revision", type="latest", description="Active published standard.")
        ],
        certifications=[
            CertificationItem(scheme="BIS Product Certification", status="Information Available", details="Mandatory ISI marking required under Household Electrical Appliances Quality Order.", is_mandatory=True)
        ],
        sources=[
            SourceEvidence(section="Section 8 - Insulation", clause="Clause 8.1", text="Electric irons shall provide double or reinforced insulation for safety.", confidence=0.94, verified=True)
        ]
    )
]

def get_all_standards() -> List[IndianStandard]:
    return STANDARDS_KNOWLEDGE_BASE

def get_standard_by_id(std_id: str) -> Optional[IndianStandard]:
    for std in STANDARDS_KNOWLEDGE_BASE:
        if std.id.lower() == std_id.lower() or std.is_number.lower().replace(" ", "") == std_id.lower().replace(" ", ""):
            return std
    return None

def get_standard_graph(std_id: str) -> StandardGraph:
    std = get_standard_by_id(std_id)
    if not std:
        # Fallback default graph for industrial head protection / standard
        std = STANDARDS_KNOWLEDGE_BASE[0]
        
    nodes: List[GraphNode] = [
        GraphNode(id=std.id, is_number=std.is_number, title=std.title, type="main", category=std.category)
    ]
    edges: List[GraphEdge] = []
    
    for rel in std.related_standards:
        node_type = "reference"
        if rel.relationship == "testing":
            node_type = "testing"
        elif rel.relationship == "safety":
            node_type = "safety"
        elif rel.relationship == "installation":
            node_type = "installation"
            
        nodes.append(GraphNode(
            id=rel.id,
            is_number=rel.is_number,
            title=rel.title,
            type=node_type,
            category=std.category
        ))
        edges.append(GraphEdge(
            source=std.id,
            target=rel.id,
            relationship=rel.relationship
        ))
        
    return StandardGraph(nodes=nodes, edges=edges)
