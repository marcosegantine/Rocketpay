import "./css/index.css"
import IMask from "imask"

const ccBgColor1 = document.querySelector(".cc-bg g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg g g:nth-child(2) path")
const ccBandeira = document.querySelector(".cc-bandeira")


function setCardType(type) {
  
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"]
  }
  
  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccBandeira.setAttribute("src", `cc-${type}.svg`)
  
}

globalThis.setCardType = setCardType



const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector('.cc-expiration .value')
  ccExpiration.innerText = date.length === 0 ? '12/31' : date
}


const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value)
})
function updateSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '123' : code
}


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex:/^4\d{0,15}/,
      cardtype: 'visa',
    },
      {
        mask: "0000 0000 0000 0000",
        regex:/(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3,7]\d{0,2}\d{0,12})/,
        cardtype: 'mastercard',
    },
      {
        mask: "0000 0000 0000 0000",
        cardtype: 'default',
    }
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,"");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  console.log(cardType)
  updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(number) {
  const ccNumber = document.querySelector('.cc-number')
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}


const cardHolderInput = document.querySelector("#card-holder")
cardHolderInput.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = cardHolderInput.value.length === 0 ? 'FULANO DA SILVA' : cardHolderInput.value;
})


const addCard = document.querySelector('#add-card')
addCard.addEventListener('click', submitCard)

function submitCard(e) {
  e.preventDefault()
  console.log('voce adicionou um cartao')
}