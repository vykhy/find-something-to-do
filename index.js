const MAIN_URL = 'https://www.boredapi.com/api/activity';

const activityH = document.querySelector('#activity-name')
const priceH = document.querySelector('#price-value')
const typeH = document.querySelector('#type-value')
const partsH = document.querySelector('#parts-value')
const accessH = document.querySelector('#access-value')

/**
 * function to update ui with api json data
 */
function updateUI(json){
    activityH.innerText = json.activity
    priceH.innerText = getPriceValue(json.price)
    typeH.innerText = json.type 
    partsH.innerText = json.participants
    accessH.innerText = getEaseValue(json.accessibility)
}
/**
 * attaches appropriate joiner to the url to add parameters
 */
function updateUrl(url){
    if(url.endsWith('activity')){
        return url += '?'
    }else{
        return url += '&'
    }
}

/**
 * converts accessibility index from api to user friendly message
 */
function getEaseValue(string){
    if(string <= 0.2) return 'Very easy'
    
    if(string <= 0.4) return 'Accessible'

    if(string <= 0.7) return 'May be difficult'
    
    if(string > 0.7) return 'Not very probable'

    return 'Looks like there was an error'
}

/**
 * converts price index from api to user-friendly message
 */
function getPriceValue(string){
   if(string == 0) return 'free'
        
   if(string <= 0.2) return 'very affordable'

   if(string <= 0.5) return 'Affordable'

   if(string <= 0.7) return 'May be expensive'

   if(string > 0.7) return 'Very expensive'  
    
   return 'Looks like there was an error'
}

/**
 * converts user string input to number inorder to call the api
 */
function getParticipantValue(string){
    switch(string){
        case '1':
            return 1
            break;
        case '2':
            return 2
            break;
        case '3':
            return 3
            break; 
        case '5':
            return 5
            break
    }
}

/**
 * main function which calls the api and returns json
 */
async function getActivities()
{
    const types = ['education','recreational','diy','social','charity','cooking','relaxation','music','busywork']
    //GET USER INPUTS
    //let easiness = document.querySelector('#ease').value;
    let type = document.querySelector('#type').value.toLowerCase()
    let participants = document.querySelector('#participants').value
    //let price = document.querySelector('#price').value

    let finalUrl = MAIN_URL;

    //IF EASY LEVEL SET, UPDATE URL
    /*
    if(easiness != 'Any' && easiness != ''){
        console.log('came here')
        let ease = getEaseValue(easiness)
        
        if(ease != 'invalid'){ 
            finalUrl = updateUrl(finalUrl)
            finalUrl += `accessibility=${ease}`
        }
    }
    */

    //IF TYPE SET, UPDATE URL
    if(type != 'any' && type != ''){

        if(types.includes(type)){ 
            finalUrl = updateUrl(finalUrl)
            finalUrl += `type=${type}`
        }
    }

    //IF NO. OF PARTICIPANTS SET, UPDATE URL
    if(participants != 'Any' && participants != ''){
        let parts = getParticipantValue(participants)

        if(participants != 'invalid'){ 
            finalUrl =  updateUrl(finalUrl)
            finalUrl += `participants=${parts}`
        }
    }

    //IF PRICE SET, UPDATE URL
    /*
    if(price != 'Any' && price != ''){
        let pricev = getPriceValue(price)

        if(pricev != 'invalid'){ 
            finalUrl = updateUrl(finalUrl)
            finalUrl += `price=${pricev}`
        }
    }
    */

    //CALL API AND RETURN JSON
    console.log(finalUrl)
    const response = await fetch(finalUrl)
    const json =  await response.json();
    console.log(json)
    updateUI(json)
}

/**
 * RUN MAIN API FUNCTION ON CLICK OF BUTTON
 */
document.querySelector('#go').addEventListener('click', getActivities)

let inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('focus', ()=> {
        input.value = ''
    })
})