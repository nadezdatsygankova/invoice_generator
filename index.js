console.log('hi')

const washCarBtn = document.getElementById('wash_car_btn');
const washLawnBtn = document.getElementById('wash_lawn_btn');
const washWeedsBtn = document.getElementById('wash_weeds_btn');
const renderInformation = document.getElementById('render_information');
const totalPrice = document.getElementById("total_price");
const totalAmountDiv = document.querySelector('.total_amount');
const sendBtn = document.getElementById('send_invoice');


let total = [];
const services = [
    { "Wash Car": 10 },
    { "Mow Lawn": 20 },
    { "Pull Weeds": 30 }
]

const servicesWorking = [];

washCarBtn.addEventListener('click', () => {
    servicesWorking.push({ "Wash Car": 10 });
    render(servicesWorking)
    washCarBtn.disabled = true;
})

washLawnBtn.addEventListener('click', () => {
    servicesWorking.push({ "Mow Lawn": 20 });
    render(servicesWorking)
    washLawnBtn.disabled = true;
})
washWeedsBtn.addEventListener('click', () => {
    servicesWorking.push({ "Pull Weeds": 30 });
    render(servicesWorking)
    washWeedsBtn.disabled = true;
})

sendBtn.addEventListener('click', () => {
    washCarBtn.disabled = false;
    washLawnBtn.disabled = false;
    washWeedsBtn.disabled = false;
    total = [];
    servicesWorking.length = 0;
    renderInformation.innerHTML = '';
    totalPrice.innerHTML = '$0';
    totalPrice.classList.remove('total_amount_calcul');
    totalAmountDiv.classList.remove('total_amount_add');
    const notesDes = document.querySelector(".notes_description")
    notesDes.remove();


})

function render(array) {
    let totalPriceAmount = 0;
    renderInformation.innerHTML = ''
    total = [];
    for (const iterator of array) {

        let element = document.createElement('div');
        let name = document.createElement('span')
        let price = document.createElement('span')
        let priceDoll = document.createElement('span');
        let divPrice = document.createElement('div')
        let removeBtn = document.createElement('button');
        let divForName = document.createElement('div');
        console.log(iterator)
        element.classList.add('info-render-list');
        renderInformation.append(element);

        divForName.classList.add('div_for_name')
        element.append(divForName);

        name.classList.add('name-render')
        name.textContent = Object.keys(iterator);
        divForName.append(name)

        removeBtn.classList.add('remove_btn');
        removeBtn.textContent = "Remove";
        divForName.append(removeBtn);


        divPrice.classList.add('price-div-wrapper-render');
        element.append(divPrice)

        priceDoll.classList.add('price-doll');
        priceDoll.textContent = '$';
        divPrice.append(priceDoll)

        price.classList.add('price-render');
        price.textContent = Object.values(iterator);
        divPrice.append(price);

        console.log(total)
        total.push(Object.values(iterator));
        renderDescription()
        console.log(total)
        totalPriceAmount = calculateTotal(total);
        renderTotal(totalPriceAmount)
        removeBtn.onclick = function () {
            total.pop();
            totalPriceAmount = calculateTotal(total);
            renderTotal(totalPriceAmount)
            servicesWorking.pop()
            render(servicesWorking)

        }
    }
    if (renderInformation.innerHTML === '') {
        washWeedsBtn.disabled = false;
        washLawnBtn.disabled = false;
        washCarBtn.disabled = false;
    }
    console.log('finish rendering')
}

function calculateTotal(array) {
    let sum = 0

    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i])
    }
    return sum;
}

function renderDescription() {
    if (!document.querySelector('.notes_description')) {
        const notesDescription = document.createElement('p');
        notesDescription.classList.add('notes_description')
        notesDescription.innerText = 'We accept cash, credit card, or PayPal';
        totalPrice.parentNode.insertBefore(notesDescription, totalPrice);
        totalAmountDiv.classList.add('total_amount_add');
    }
}

function renderTotal(number) {
    totalPrice.textContent = `$${number}`;
    totalPrice.classList.add('total_amount_calcul')
}

