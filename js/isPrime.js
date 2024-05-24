function isPrime(num) {
    // Prime numbers are greater than 1
    if (num <= 1) {
        return false;
    }
    // Check for divisibility by numbers up to the square root of num
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Test the function
console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false
