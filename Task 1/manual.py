def manual(data, key):
    
    #lambda function as the key
    # The lambda accesses the value of the specified key for each dictionary
    sorted_data = sorted(data, key=lambda x: x[key])
    return sorted_data


data = [{"name": "Ann", "age": 20}, {"name": "John", "age": 25}, {"name": "Patrick", "age": 23}]
print("Sorted by 'name':", manual(data, "name"))
print("Sorted by 'age':", manual(data, "age"))
