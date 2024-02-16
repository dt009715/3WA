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
    // Met à jour l'input d'arrivée
    function setAmount(val){
        const newText = document.querySelector('input[id="amount2"]')
        newText.value = val
    }
    // Converit notre monnaie de départ grâce à notre taux de départ et d'arrivée
    function convert(amount, myCurr, sCurr){
        return (amount = amount * sCurr.value / myCurr.value).toFixed(2)
    }
    // Echange les positions du select de départ et le select d'arrivée
    function switchCurrency(){
        // Nous récupérons les options selectionnées
        const allOptionsSelected = document.querySelectorAll('option:checked')
        const optionDepart = allOptionsSelected[0]
        const optionArrive = allOptionsSelected[1]
        // Nous récupérons les selects ainsi que leurs options
        const mySelectDepart = document.querySelector('select[id="search1"]')
        const allOptionsDepart = mySelectDepart.querySelectorAll('option')
        const mySelectArrive = document.querySelector('select[id="search2"]')
        const allOptionsArrive = mySelectArrive.querySelectorAll('option')
        let indexDepart = 0

        // On boucle dans chaque select séparèment afin de trouver l'option selectionnée de l'un pour l'autre
        allOptionsDepart.forEach(option => {
            if(option.value === optionArrive.value){
                console.log(option)
                option.selected = true
                mySelectDepart.selectedIndex = indexDepart
            }
            indexDepart++
        })
        let indexArrive = 0
        allOptionsArrive.forEach(option => {
            if(option.value === optionDepart.value){
                console.log(option)
                option.selected = true
                mySelectArrive.selectedIndex = indexArrive
            }
            indexArrive++
        })
    }
    // Notre function principale
    function triggerEvent(){
        const firstCurrency = getMyCurrency()
        const secondCurrency = getCurrencyCible()
        const myAmount = getAmount()
        const valConvert = convert(myAmount.value, firstCurrency, secondCurrency)
        setAmount(valConvert)
    }
    // Création de nos Events sur nos select par un simple click sur une option et par le clavier dans notre input type="text"
    const myOptions = document.querySelectorAll('option')
    const amountText = document.querySelector('input[id="amount1"]') 
    myOptions.forEach(option => option.addEventListener('click', triggerEvent))
    amountText.addEventListener("keyup", triggerEvent)
    
    // Création de l'event bouton switch
    const buttonSwitch = document.querySelector('button')
    buttonSwitch.addEventListener('click', ()=>{
        switchCurrency()
        triggerEvent()
    })
})