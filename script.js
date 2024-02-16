fetch('https://cdn.taux.live/api/ecb.json')
.then(response => response.json())
.then(data => {
    // On convertit notre fichier json en tableau ["USD", 1]
    // La méthode Object.keys() renvoie un tableau à double entrée contenant les noms des propriétés
    const arrayCurrency = Object.keys(data.rates).map(function(rate) {
        return [rate, data.rates[rate]]
    })
    
    arrayCurrency.forEach(currency =>{
        const code = currency[0].slice(0, 2)
        const myImg = `<img src="https://flagsapi.com/${code}/flat/64.png">`
        currency.push(myImg)
    })
    
    // On crée nos options dans les selects
    // Nous stockons dans la value de notre option le taux de change et dans le textContent le nom du taux
    // arrayCurrency étant un tableau à double entrée, à chaque itération nous appelons le taux grâce à tableau[i][1], 1 étant la position de notre taux dans le tableau
    // Nous faisons pareil pour le nom avec tableau[i][0]
    const mySelect = document.querySelectorAll('select')
    mySelect.forEach(select =>{
        for(let i = 0 ; i < arrayCurrency.length ; i++){
            const myOptions = `<option value ='${arrayCurrency[i][1]}' id ='${arrayCurrency[i][2]}'>${arrayCurrency[i][0]}</option>`
            select.innerHTML += myOptions
        }
    })

    // Récupère la contenu de input de gauche
    // Retourne l'input de gauche
    function getAmount(){
        return document.querySelector('input[id="amount1"]')
    }
    // Récupère l'option de départ sélectionnée
    // Retourne à la fin du forEach() l'option sélectionnée
    function getCurrency(cible){
        const convertSelect = document.querySelector(cible)
        const currentCurrency = convertSelect.querySelector('option:checked')
        return currentCurrency
    }
    function showFlag(sCurr, fCurr){

        const myDivStart = document.querySelector('div[id="flag1"]')
        const myDivFinish = document.querySelector('div[id="flag2"]')
        myDivStart.innerHTML = sCurr.id
        myDivFinish.innerHTML = fCurr.id
    }
    // Met à jour l'input d'arrivée
    function setAmount(val){
        const newText = document.querySelector('input[id="amount2"]')
        newText.value = val
    }
    // Convertit notre monnaie de départ grâce à notre taux de départ et d'arrivée
    function convert(amount, currStart, currFinish){
        return (amount = amount * currFinish.value / currStart.value).toFixed(2)
    }
    // Echange les positions du select de départ et le select d'arrivée
    function switchCurrency(){
        // Nous récupérons les options selectionnées
        const allOptionsSelected = document.querySelectorAll('option:checked')
        const optionStart = allOptionsSelected[0]
        const optionFinish = allOptionsSelected[1]
        // Nous récupérons les selects ainsi que leurs options
        const mySelectStart = document.querySelector('select[id="search1"]')
        const allOptionsStart = mySelectStart.querySelectorAll('option')
        const mySelectFinish = document.querySelector('select[id="search2"]')
        const allOptionsFinish = mySelectFinish.querySelectorAll('option')
        let indexStart = 0
        // On boucle dans chaque select séparèment afin de trouver l'option selectionnée de l'un pour l'autre
        allOptionsStart.forEach(option => {
            if(option.value === optionFinish.value){
                option.selected = true
                mySelectStart.selectedIndex = indexStart
            }
            indexStart++
        })
        let indexFinish = 0
        allOptionsFinish.forEach(option => {
            if(option.value === optionStart.value){
                option.selected = true
                mySelectFinish.selectedIndex = indexFinish
            }
            indexFinish++
        })
    }
    // Notre function principale
    function triggerEvent(){
        const firstCurrency = getCurrency('select[id="search1"]')
        const secondCurrency = getCurrency('select[id="search2"]')
        showFlag(firstCurrency, secondCurrency)
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
    const buttonSwitch = document.querySelector('input[id="switchButton"]')
    buttonSwitch.addEventListener('click', ()=>{
        switchCurrency()
        triggerEvent()
    })
    const firstCurrency = getCurrency('select[id="search1"]')
    const secondCurrency = getCurrency('select[id="search2"]')
    showFlag(firstCurrency, secondCurrency)
})