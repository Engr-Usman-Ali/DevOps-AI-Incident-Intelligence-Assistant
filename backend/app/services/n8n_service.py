import requests

N8N_WEBHOOK_URL = "https://usmanali70909.app.n8n.cloud/webhook/incident-report"


def send_incident_email(
    session_id: int,
    analysis: dict,
    email: str = None,
):

    payload = {
        "session_id": session_id,
        "email": email,
        "summary": analysis.get("summary"),
        "severity": analysis.get("severity"),
        "confidence": analysis.get("confidence"),
        "incident_type": analysis.get("incident_type"),
        "root_cause": analysis.get("root_cause"),
        "evidence": analysis.get("evidence", []),
        "fixes": analysis.get("fixes", []),
    }

    try:

        response = requests.post(
            N8N_WEBHOOK_URL,
            json=payload,
            timeout=10,
        )

        print("n8n response:", response.status_code, response.text)

    except Exception as e:

        print("n8n Error:", e)
