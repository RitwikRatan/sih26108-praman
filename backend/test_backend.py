import sys
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

print("--- Testing FastAPI Backend Endpoints ---")

# 1. Health Check
res = client.get("/")
print("Root health check:", res.status_code, res.json())
assert res.status_code == 200

# 2. Auth Login
res = client.post("/api/v1/auth/login", json={"email": "officer@gov.in", "password": "password123"})
print("Auth Login response:", res.status_code, res.json()["user"]["name"])
assert res.status_code == 200

# 3. Extract Requirements
res = client.post("/api/v1/analysis/extract", json={"text": "Industrial safety helmets for construction workers with high impact protection"})
print("Extract Requirements:", res.status_code, res.json()["product_name"])
assert res.status_code == 200
ext_id = res.json()["id"]

# 4. Confirm & Find Standards
res = client.post("/api/v1/analysis/confirm", params={"extraction_id": ext_id}, json={
    "product_name": "Industrial Safety Helmet",
    "application": "Construction Sites",
    "purpose": "Impact Protection",
    "key_requirements": ["Impact resistance", "Dielectric insulation"]
})
print("Confirm & Analyze:", res.status_code, "Recommendations found:", len(res.json()["recommendations"]))
assert res.status_code == 200
analysis_id = res.json()["id"]

# 5. Get Standards
res = client.get("/api/v1/standards")
print("Get Standards:", res.status_code, "Count:", len(res.json()))
assert res.status_code == 200

# 6. Get Standard Graph
res = client.get("/api/v1/standards/is-2925-1984/graph")
print("Get Standard Graph:", res.status_code, "Nodes:", len(res.json()["nodes"]))
assert res.status_code == 200

# 7. Create Procurement Report
res = client.post("/api/v1/reports", json={"analysis_id": analysis_id, "officer_name": "Rajesh Sharma"})
print("Create Report:", res.status_code, res.json()["title"])
assert res.status_code == 200

print("\n[SUCCESS] ALL BACKEND ENDPOINTS PASSED EMPIRICAL VERIFICATION SUCCESSFULLY!")
