# Helper functions
def halve(n):
    return n // 2

def double(n):
    return n * 2

def is_even(n):
    return n % 2 == 0

# Ethiopian multiplication function
def eth_mult(a, b):
    result = 0
    left = a
    right = b
    
    while left >= 1:
        if not is_even(left):
            result += right
        left = halve(left)
        right = double(right)
    
    return result

# Test cases
print(eth_mult(17, 34))  # 578
print(eth_mult(23, 46))  # 1058
print(eth_mult(12, 27))  # 324
print(eth_mult(56, 98))  # 5488
print(eth_mult(63, 74))  # 4662
