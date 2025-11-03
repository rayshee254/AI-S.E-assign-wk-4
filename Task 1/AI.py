def sort_dicts_by_key(data, key, reverse=False):
    """
    Simple sort of a list of dicts by a specified key.
    Missing keys are treated as -inf so they appear first when reverse=False.
    """
    return sorted(data, key=lambda item: item.get(key, float('-inf')), reverse=reverse)

# Example usage
if __name__ == "__main__":
    data = [
        {"name": "alice", "score": 10},
        {"name": "bob"},
        {"name": "carol", "score": 7},
    ]
    print(sort_dicts_by_key(data, "score"))