import "./css/index.css"
import IMask from "imask"

const ccBgColor1 = document.querySelector(".cc-bg g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg g g:nth-child(2) path")
const ccLogo = document.querySelector('.cc-logo-img')


function setCardType(type) {
  
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"]
  }
  
  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
  
}

globalThis.setCardType = setCardType


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: "0000 0000 0000 0000"
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)


const cardHolder = document.querySelector('#card-holder')
const cardHolderPattern = {
  mask: "aaaaaaaaaaaaaaaaaaaa"
}
const cardHolderMasked = IMask(cardHolder, cardHolderPattern)


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


const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

