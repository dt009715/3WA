fetch('https://cdn.taux.live/api/ecb.json')
.then(response => response.json())
.then(data => {
    // On convertit notre fichier json en tableau ["USD", 1]
    const arrayCurrency = Object.keys(data.rates).map(function(rate) {
        return [rate, data.rates[rate]]
    })
    // On crée nos options dans les selects
    const mySelect = document.querySelectorAll('select')
    mySelect.forEach(select =>{
        for(let i = 0 ; i < arrayCurrency.length ; i++){
            const myOptions = `<option value ="${arrayCurrency[i][1]}">${arrayCurrency[i][0]}</option>`
            select.innerHTML += myOptions
            }

    })
    const amountText = document.querySelector('input[id="amount1"]') 
    // Récupère la contenu de input de gauche
    function getAmount(){
        return document.querySelector('input[id="amount1"]')
    }
    // Récupère l'option de départ sélectionnée
    function getMyCurrency(){
        const convertSelect = document.querySelector('select[id="search1"]')
        const currentCurrency = convertSelect.querySelectorAll('option')
        let selectedCurrency = ""
        currentCurrency.forEach(currency => {  
            if(currency.selected){
                selectedCurrency = currency
            }
            })
            return selectedCurrency
    }
    // Récupère l'option d'arrivée séléctionnée
    function getCurrencyCible(){
        const convertSelect = document.querySelector('select[id="search2"]')
        const currentCurrency = convertSelect.querySelectorAll('option')
        let selectedCurrency = ""
        currentCurrency.forEach(currency => {  
            if(currency.selected){
                selectedCurrency = currency
            }
            })
            return selectedCurrency  
    }
    // Met à jour l'input d'arrivé
    function setAmount(val){
        const newText = document.querySelector('input[id="amount2"]')
        newText.value = val
    }
    // Converit notre monnaie de départ grâce à notre taux de départ et d'arrivé
    function convert(amount, myCurr, sCurr){
        amount = amount * sCurr.value / myCurr.value
        return amount
    }
    amountText.addEventListener("keyup", () => {
        const firstCurrency = getMyCurrency()
        const secondCurrency = getCurrencyCible()
        const myAmount = getAmount()
        const valConvert = convert(myAmount.value, firstCurrency, secondCurrency)
        setAmount(valConvert)
    })
        
})