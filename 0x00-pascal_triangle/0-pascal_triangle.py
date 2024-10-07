def pascal_triangle(n):
    """Returns a list of lists representing Pascal's triangle up to n rows."""
    if n <= 0:
        return []
    
    # Initialize the triangle with the first row
    triangle = [[1]]

    for i in range(1, n):
        # Start each row with 1
        row = [1]

        # Populate rows with sum of adjacent values from prev rows
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])

        # End row with 1
        row.append(1)
        triangle.append(row)

    return triangle
