        // Selectors //

// input selectors
const selectType = document.querySelector('.add__type')

// dashboard buttons
const expenseBtn = document.querySelector('.toggle-expenses')
const incomeBtn = document.querySelector('.toggle-income')
const allBtn = document.querySelector('.toggle-all')

// dashboard elements
const expenseEl = document.querySelector('#expense')
const incomeEl = document.querySelector('#income')
const allEl = document.querySelector('#all')

// variables
let ENTRY_LIST
let balance = 0
let income = 0
let expense = 0
const DELETE = 'delete'
        // Events //

// dashboard btn events
expenseBtn.addEventListener('click', () => {
    active(expenseBtn)
    inactive([incomeBtn, allBtn])
    show(expenseEl)
    hide([incomeEl, allEl])
})
incomeBtn.addEventListener('click', () => {
    active(incomeBtn)
    inactive([expenseBtn, allBtn])
    show(incomeEl)
    hide([expenseEl, allEl])
})
allBtn.addEventListener('click', () => {
    active(allBtn)
    inactive([incomeBtn, expenseBtn])
    show(allEl)
    hide([incomeEl, expenseEl])
})
 
        // Functions //
// dashboard toggle functions
function active (element) {
    element.classList.add("active")
}

function show (element) {
    element.classList.remove("hide")
}

function hide (elementsArray) {
    elementsArray.forEach(element => {
        element.classList.add("hide")
    })
}

function inactive (elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove("active")
    })
}

for(let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.add("hide")
}

// delete button fucntion

function deleteButton (event) {
    const target = event.target

    const entry = target.parentNode
}

function updateUI(){
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outcome));

    // determines sign of balance
    let sign = (income >= outcome) ? "$" : "-$";

    // update UI
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;

    clearElement( [expenseList, incomeList, allList] );

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense" ){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "income" ){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    updateChart(income, outcome);

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}