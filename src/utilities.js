export const generatePairs = () => {
  const data = [];
  for (let i = 3; i < 17; i++) {
    for (let k = 2; k < i; k++) {
      data.push({ to: k, from: i });
    }
  }
  return data;
};

export const extractNumbers = (text) => {
  const parts = text.split("from");
  const numbers = parts.map((part) => part.trim().split(" ")[0]);
  return numbers.map(Number);
};

export const factorial = (num) => {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

export const combinations = (n, k) => {
  return factorial(k) / (factorial(n) * factorial(k - n));
};

export const createArrayWithLength = (length, value = null) => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = { name: `Odds${i + 1}`, status: "Correct", factor: "2.00" };
  }
  return arr;
};

export const createDescendingArray = (num) => {
  return Array.from({ length: num }, (_, i) => num - i);
};

export const getSets = (arr, n, k) => {
  const result = [];
  function helper(tempArr, start, count) {
    if (count === k) {
      result.push([...tempArr]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      tempArr.push({ factor: arr[i]["factor"], status: arr[i]["status"] });
      helper(tempArr, i + 1, count + 1); // Move to the next index
      tempArr.pop();
    }
  }

  helper([], n, 0);

  return result;
};

export const getFactorData = (arr) => {
  let factorData = [];
  arr.map((value) => {
    factorData.push({ factor: value.factor, status: value.status });
  });
  return factorData;
};

export const getOddsData = (array) => {
  return array.map((subArray) =>
    subArray.reduce((product, value) => {
      if (value.status === "Void") {
        return product;
      } else if (value.status === "Incorrect") {
        return 0;
      } else {
        return product * value.factor;
      }
    }, 1)
  );
};

export const winSumArray = (array, totalStake, length) => {
  return array.reduce((sum, value) => sum + (value * totalStake) / length, 0);
};
