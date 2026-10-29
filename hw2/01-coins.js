/** Exercise 01 - Coins **/

// Add your function here
function calculateChange(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount) || amount < 0) {
    return `$${amount} ==> Invalide input, enter an non-negative amount`;
  }
  if (amount > 100) {
    return `$${amount} ==> The number entered is too large`;
  }
  let cents = Math.round(amount * 100);
  const coins = [
    { name: "dollar", plural: "dollars", value: 100 },
    { name: "quarter", plural: "quarters", value: 25 },
    { name: "dime", plural: "dimes", value: 10 },
    { name: "nickel", plural: "nickels", value: 5 },
    { name: "penny", plural: "pennies", value: 1 },
  ];
  if (cents === 0) {
    return "no coins";
  }
  const remain = [];
  for (const coin of coins) {
    const count = Math.floor(cents / coin.value);
    cents %= coin.value;
    if (count > 0) {
      if (count === 1) remain.push(`${count} ${coin.name}`);
      else remain.push(`${count} ${coin.plural}`);
    }
  }
  return `$${amount.toFixed(2)} ==> ${remain.join(", ")}`;
}
// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(100));
console.log(calculateChange(100.01));
console.log(calculateChange(0));
console.log(calculateChange(0.01));
console.log(calculateChange(0.99));
console.log(calculateChange(1));
console.log(calculateChange(0.25));
console.log(calculateChange(0.3));
console.log(calculateChange(1.15));
console.log(calculateChange(99.99));
console.log(calculateChange(-5));
console.log(calculateChange("abc"));
