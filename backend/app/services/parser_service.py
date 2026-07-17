import re


def extract_log_information(log: str):
    """
    Extract important information from uploaded logs.
    """

    errors = []

    warnings = []

    timestamps = []

    # Find ERROR lines

    for line in log.splitlines():

        if "error" in line.lower():

            errors.append(line)

        elif "warning" in line.lower():

            warnings.append(line)

    # Extract timestamps

    pattern = (
        r"\d{4}-\d{2}-\d{2}"
    )

    timestamps = re.findall(pattern, log)

    return {
        "errors": errors[:20],
        "warnings": warnings[:20],
        "timestamps": timestamps[:20],
    }