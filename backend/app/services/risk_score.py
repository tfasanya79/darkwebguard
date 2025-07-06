def calculate_risk(message: str) -> float:
    # Naive scoring example
    if "credentials" in message:
        return 0.9
    elif "impersonation" in message:
        return 0.7
    return 0.3
