import requests

# Replace with your Production URL after testing
N8N_WEBHOOK_URL = (
    "https://usmanali70909.app.n8n.cloud/webhook/incident-report"
)


def send_incident_email(
    session_id: int,
    analysis: dict,
):
    payload = {
        "session_id": session_id,
        "summary": analysis.get("summary"),
        "severity": analysis.get("severity"),
        "confidence": analysis.get("confidence"),
        "incident_type": analysis.get("incident_type"),
        "root_cause": analysis.get("root_cause"),
        "evidence": analysis.get("evidence", []),
        "fixes": analysis.get("fixes", []),
    }

    try:
        requests.post(
            N8N_WEBHOOK_URL,
            json=payload,
            timeout=10,
        )
    except Exception as e:
        print("n8n Error:", e)