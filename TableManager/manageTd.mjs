import { dayClassName, validateTd, visible, cleanTable } from '../utils/utils.mjs'
import { deleteActivity } from '../CRUD/delete.js'
import { tdClassLocked } from './NewTable.mjs'
import { getHours } from '../services/Hours.mjs'
const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

export function addDays ({ tdClass }) {
  const fragment = document.createDocumentFragment()
  for (const day of days) {
    const className = dayClassName(day, tdClass)
    // console.log(tdClassLocked)
    const newTd = createTd({ className })
    if (newTd) fragment.appendChild(newTd)
  }
  return fragment
}
export function createTd ({ className, data, rowSpan }) {
  const { element, td, valid } = validateTd({ className })
  if (!valid) return
  visible(td)
  const div = createDiv({ element, className, data })
  td.appendChild(div)
  if (rowSpan)td.rowSpan = rowSpan
  return td
}
export function createDiv ({ element, className, data }) {
  const div = element || document.createElement('DIV')
  div.className = className

  if (data) {
    div.textContent = data.text
    if (data.id !== undefined) {
      div.appendChild(createDelete({ id: data.id }))
    }
  }

  return div
}
export function updateTd ({ className, data, rowSpan }) {
  const td = createTd({ className, data, rowSpan })
  return td
}
function createDelete ({ id }) {
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.className = 'deleteButton'
  deleteButton.addEventListener('click', () => {
    const div = deleteButton.parentElement
    const td = div.parentElement
    const className = div.className
    reduceTd(td)
    td.removeChild(div)
    td.appendChild(createDiv({ className }))
    const parent = td.parentElement
    cleanTable({ tr: parent, tdClassLocked })
    deleteActivity({ id })
  })

  return deleteButton
}
const reduceTd = (td) => {
  console.log(td)
  const className = td.children[0].className
  const initial = className[0]
  const hours = getHours()
  const rowSpan = td.rowSpan
  const selected = Number(className.slice(1))
  const index = hours.indexOf(selected)
  console.log(tdClassLocked)

  for (let i = 1; i < rowSpan; i++) {
    // console.log(initial + hours[index + i])
    const td = document.querySelector('.' + initial + hours[index + i]).parentElement
    const tdClassLockedIndex = tdClassLocked.indexOf(initial + hours[index + i])
    console.log(td.parentElement)

    tdClassLocked.splice(tdClassLockedIndex, 1)
    cleanTable({ tr: td.parentElement, tdClassLocked })

    visible(td)
  }
  td.rowSpan = 1
  //   String.prototype.slice
  console.log(tdClassLocked)
}
