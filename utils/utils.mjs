import { tdClassLocked } from '../TableManager/NewTable.mjs'
export function validateTd ({ className }) {
  // console.log(className)
  const element = document.querySelector('.' + className)
  const td = element ? element.parentElement : document.createElement('TD')

  if (element && tdClassLocked.includes(className)) {
    // console.log(element && tdClassLocked.includes(className))
    // const td = element ? element.parentElement : document.createElement('TD')
    td.classList.add('hide')
    return { valid: false }
  }
  if (tdClassLocked.includes(className)) return { valid: false }
  return { element, td, valid: true }
}
export function dayClassName (day, tdClass) {
  const dayInitialLetter = day === 'miercoles' ? 'x' : day[0]
  return dayInitialLetter + tdClass
}
export function visible (element) {
  if (element && element.classList.contains('hide')) {
    element.classList.remove('hide')
  }
}
export function cleanTable ({ tr, td, tBody }) {
  if (tBody) {
    for (let i = 1; i < tBody.childElementCount; i++) {
      // console.log(tBody.children[i])
      const child = tBody.children[i]
      if (isCleanTr(child)) child.classList.add('hide')
    }

    return
  }
  if (td) {
    const tr = td.parent
    if (isCleanTr(tr)) tr.classList.add('hide')
  }
  if (isCleanTr(tr)) tr.classList.add('hide')
}
function isCleanTr (tr) {
  const childCount = tr.childElementCount
  let count = 0
  for (let i = 0; i < childCount; i++) {
    const firstChild = tr.children[i].children[0]
    if (firstChild.childElementCount > 0 ||
       tdClassLocked.includes(firstChild.className)) break
    else count++
  }
  return (count === childCount)
}
