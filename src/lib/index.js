export const allowOnlyDigits = e => {
  const reg = /[0-9 ]+/
  
  const allowedKeys = [
    'ArrowLeft',
    'ArrowRight',
    'Backspace'
  ]

  if(!reg.test(e.key) && allowedKeys.indexOf(e.key) < 0){
    e.preventDefault()
  }
}