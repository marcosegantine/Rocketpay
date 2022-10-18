import "./css/index.css"

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

setCardType("visa")

