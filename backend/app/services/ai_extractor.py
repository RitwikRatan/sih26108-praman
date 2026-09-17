import uuid
from datetime import datetime
from typing import Dict, Any, List
from app.schemas.analysis import RequirementInput, ExtractedRequirement

def extract_requirements_from_input(req_input: RequirementInput) -> ExtractedRequirement:
    text = (req_input.text or "").strip()
    prod = req_input.product_name or ""
    purpose = req_input.purpose or ""
    app = req_input.application or ""
    tech = req_input.technical_specs or ""
    safety = req_input.safety_specs or ""

    full_corpus = f"{text} {prod} {purpose} {app} {tech} {safety}".lower()

    # Rule-based NLP extraction heuristic
    detected_product = "Industrial Safety Helmet"
    detected_app = "Construction & Infrastructure Sites"
    detected_purpose = "Head Protection & Impact Resistance"
    
    if "steel" in full_corpus or "structural" in full_corpus or "plate" in full_corpus or "girder" in full_corpus or "स्टील" in full_corpus or "प्लेट" in full_corpus:
        detected_product = "Hot Rolled Structural Steel Plates & Sections"
        detected_app = "Structural Construction & Fabrication"
        detected_purpose = "Structural Load Bearing & Fabrication"
    elif "mat" in full_corpus or "insulat" in full_corpus or "voltage" in full_corpus or "switchgear" in full_corpus or "मैट" in full_corpus or "विद्युत" in full_corpus:
        detected_product = "Synthetic Elastomer Insulating Mats"
        detected_app = "Substation & Electrical Switchgear Rooms"
        detected_purpose = "Electrical Shock Protection for Operators"
    elif "iron" in full_corpus or "appliance" in full_corpus or "steam" in full_corpus or "इस्त्री" in full_corpus:
        detected_product = "Electric Dry & Steam Irons"
        detected_app = "Commercial & Institutional Laundry"
        detected_purpose = "Pressing & Thermal Appliance Safety"

    if prod:
        detected_product = prod
    if app:
        detected_app = app
    if purpose:
        detected_purpose = purpose

    key_reqs: List[str] = []
    tech_params: Dict[str, str] = {}
    safety_params: List[str] = []

    if "helmet" in detected_product.lower() or "safety" in full_corpus or "हेलमेट" in full_corpus or "सुरक्षा" in full_corpus:
        key_reqs = [
            "Impact & Shock Absorption Capacity (max force transmission <= 5.0 kN)",
            "Penetration Resistance against sharp drop mass",
            "Flame Retardant Shell Material (HDPE / ABS / Fiberglass)",
            "Dielectric Strength insulation (1.2 kV protection rating)",
            "Adjustable Chin Strap & Retention System"
        ]
        tech_params = {
            "Material": "High Density Polyethylene (HDPE) / ABS",
            "Weight Limit": "Maximum 400g harness inclusive",
            "Dielectric Insulation": "1.2 kV AC leak test",
            "Operating Temp": "-10°C to +50°C"
        }
        safety_params = [
            "BIS Quality Control Order (QCO) Mandatory ISI Marking",
            "Lateral Rigidity Test under 430N load",
            "Flame resistance duration min 5 seconds"
        ]
    elif "steel" in detected_product.lower():
        key_reqs = [
            "Structural Grade E250 / E350 tensile strength compliance",
            "Charpy V-Notch Impact Toughness test at 0°C",
            "Maximum Carbon Equivalent (CE) <= 0.42% for weldability",
            "Dimensional Tolerances as per IS 1852"
        ]
        tech_params = {
            "Yield Strength": "Min 250 MPa (E250 Grade)",
            "Tensile Strength": "410 - 540 MPa",
            "Elongation": "Min 23%",
            "Carbon Equivalent": "<= 0.42%"
        }
        safety_params = [
            "Mandatory BIS Certification under Steel Products QCO",
            "Ultrasonic Flaw Detection test report"
        ]
    elif "mat" in detected_product.lower():
        key_reqs = [
            "High Voltage Insulation Rating up to 33 kV (Class 2)",
            "Dielectric Proof Voltage withstand 50 kV AC",
            "Elastomeric synthetic anti-skid surface texture",
            "Acid, alkali, and transformer oil chemical resistance"
        ]
        tech_params = {
            "Class Rating": "Class 2 (33 kV Working Voltage)",
            "Proof Voltage": "50 kV AC for 1 min",
            "Thickness": "3.0 mm +/- 0.2 mm",
            "Tensile Strength": ">= 15 N/mm2"
        }
        safety_params = [
            "Mandatory BIS ISI Mark under Electrical Equipment QCO",
            "Flame retardant self-extinguishing test compliance"
        ]
    else:
        key_reqs = [
            "Compliance with applicable Bureau of Indian Standards (BIS)",
            "Manufacturer quality management ISO 9001 certification",
            "Third-party NABL accredited laboratory test reports",
            "Safety parameters and operational durability"
        ]
        tech_params = {
            "Quality Grade": "Standard Industrial Grade",
            "Warranty": "Minimum 12 months manufacturer warranty"
        }
        safety_params = [
            "BIS Quality Control Order compliance verification",
            "Safety manual and installation instructions"
        ]

    return ExtractedRequirement(
        id=f"req-{uuid.uuid4().hex[:8]}",
        product_name=detected_product,
        application=detected_app,
        purpose=detected_purpose,
        key_requirements=key_reqs,
        technical_parameters=tech_params,
        safety_parameters=safety_params,
        extracted_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    )
