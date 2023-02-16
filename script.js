'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const dispalyMovements = function (movements) {
    containerMovements.innerHTML = '';

    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

dispalyMovements(account1.movements);

const calcDisplayBalance = function (movements) {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance} EUR`;
}
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}원`

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${out}원`

}
calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('');
    });
};

createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let currentAccount;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 10;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';

        inputLoginPin.blur();

        // Display movements
        dispalyMovements(currentAccount.movements);

        // Display balance
        calcDisplayBalance(currentAccount.movements);

        // Display summary
        calcDisplaySummary(currentAccount);

    }

})

/////////////////////////////////////////////////
// //* Array 기본 설명
// //? remember that methods are simply functions that we can call on objects.
// //? So basically, they are functions attached to objects.
// //? So if we have array methods, that means that arrays themselves are also objects.
// //? these array methods are simply functions that are attached to all arrays that we create in JavaScript.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// // slice는 객체에 값을 변경하지 않는다.

// console.log('SLICE');
// console.log(arr.slice(2));
// //slice 메소드의 start paramter는 값을 포함하지만, end parameter는 값을 포함하지 않는다.
// //최종적으로 index 2, 3만 나타나게 된다.
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // splice는 객체에 값을 변경한다.
// console.log('SPLICE');
// // console.log(arr.splice(2));
// // splice로 요소가 추출되어 origianl array 값이 변경되어 있다.
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// // reverse는 객체에 값을 변경한다.
// console.log('REVERSE');
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
// console.log(arr2); // ['f', 'g', 'h', 'i', 'j']
// //? 어떤 메소드가 array의 값을 변경하는지 알고 있는 것은 중요하다.

// // CONCAT
// // concat은 객체에 값을 변경하지 않는다.
// console.log('CONCAT');
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log('JOIN');
// console.log(letters.join(' - ')); // string 값으로 ' - ' 값이 입력되어 나타난다.
// console.log(arr[0]);

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map((mov) => mov * eurToUsd);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

console.log(movements);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
    (mov, i, arr) =>
        `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs()}`
    // if (mov > 0) {
    //   return `Movement ${i + 1}: You deposited ${mov}`;
    // } else {
    //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
    // }
);
console.table(movementsDescriptions);

const deposits = movements.filter(function (mov) {
    return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

const balance = movements.reduce((acc, cur) => acc + cur, 0);

let balance2 = 0;
for (const mov of movements) balance2 += mov;

// Maximum value
const max = movements.reduce((acc, mov) => {
    if (acc > mov)
        return acc;
    else
        return mov;
}, movements[0]);


////////////////////////////////////////////////////////////////
// Coding Challenge #2 (지문 강의 참조)

const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

// 나의 답변
const myCalcAverageHumanAge = function (dogAges) {
    const filteredHumanAges = dogAges.map((dogAge) => {
        if (dogAge <= 2) {
            return dogAge * 2;
        } else if (dogAge > 2) {
            return 16 + dogAge * 4;
        }
    })
        .filter(humanAge => humanAge > 18)
    const sumHumanAges = filteredHumanAges.reduce((acc, cur) => acc + cur, 0)
    return sumHumanAges / filteredHumanAges.length;
}
console.log(myCalcAverageHumanAge(dogAge1))

// 선생님의 답변
const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    const adults = humanAges.filter(age => age >= 18);
    const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    return average;
}
console.log(calcAverageHumanAge(dogAge1))

console.log(movements);

const totalDepositsUSD = movements
    .filter(mov => mov > 0)
    .map((mov, i, arr) => {
        return mov * eurToUsd;
    })
    .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

