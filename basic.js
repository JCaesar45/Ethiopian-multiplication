// Helper functions
function halve(n) {
    return Math.floor(n / 2);
}

function double(n) {
    return n * 2;
}

function isEven(n) {
    return n % 2 === 0;
}

// Ethiopian multiplication function
function eth_mult(a, b) {
    let result = 0;
    let left = a;
    let right = b;
    
    while (left >= 1) {
        if (!isEven(left)) {
            result += right;
        }
        left = halve(left);
        right = double(right);
    }
    
    return result;
}

// Test cases
console.log(eth_mult(17, 34));  // 578
console.log(eth_mult(23, 46));  // 1058
console.log(eth_mult(12, 27));  // 324
console.log(eth_mult(56, 98));  // 5488
console.log(eth_mult(63, 74));  // 4662
