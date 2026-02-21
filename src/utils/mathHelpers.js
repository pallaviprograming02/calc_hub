export const gcd = (a, b) => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) { [a, b] = [b, a % b]; }
    return a;
};

export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

export const lcmMultiple = (nums) => nums.reduce(lcm);
export const gcfMultiple = (nums) => nums.reduce(gcd);
