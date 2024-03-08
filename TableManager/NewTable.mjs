import showHours, { hArray } from '../services/Hours.mjs'
import { validateTd, visible, dayClassName, cleanTable } from '../utils/utils.mjs'
import { newTR, createMultipleTr, updateTr } from './manageTr.mjs'
import { updateTd } from './manageTd.mjs'

const table = document.getElementById('table')
const tBody = table.lastChild
export const tdClassLocked = []

export default async function NewTable ({ shedule }) {
  const newHours = hArray(shedule)
  const fragment = createMultipleTr({ newHours })
  tBody.appendChild(fragment)

  updateTable({ shedule, newHours })
  cleanTable({ tBody })
}

export function updateTable ({ shedule, newHours }) {
  if (shedule.length === 1) { updateTr({ activity: shedule[0], newHours, tBody }) }

  for (const element of shedule) {
    const className = dayClassName(element.day, element.initialHour)
    const rowSpan = calculateRowSpan({ newHours, initialHour: element.initialHour, finalHour: element.finalHour, day: element.day })

    const data = { text: element.activity, id: element.id }
    const td = updateTd({ className, data, rowSpan })
    // console.log(td.parentElement)
    visible(td.parentElement)
  }
  tdClassLocked.forEach(x => validateTd({ className: x, tdClassLocked }))

  // updateTr()
}
function calculateRowSpan ({ newHours, initialHour, finalHour, day }) {
  const evaluate = (finalHour - initialHour) / 100
  const initialHourIndex = newHours.indexOf(initialHour)

  const isValid = newHours[initialHourIndex + 1] === finalHour

  if (evaluate <= 1 && isValid) return
  const rowSpan = newHours.indexOf(finalHour) - newHours.indexOf(initialHour)

  lockClass({ initialHour: newHours.indexOf(initialHour), rowSpan, newHours, day })
  return rowSpan
}
function lockClass ({ initialHour, rowSpan, newHours, day }) {
  for (let i = initialHour + 1; i < (initialHour + rowSpan); i++) {
    tdClassLocked.push(dayClassName(day, newHours[i]))
  }
  // console.log(tdClassLocked)
}
