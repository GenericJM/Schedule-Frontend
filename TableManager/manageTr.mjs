import showHours from '../services/Hours.mjs'
import hourFormat from '../hourFormat.mjs'
import { createTd, addDays } from './manageTd.mjs'

export function newTR ({ className, initialHour, finalHour }) {
  const tdText = hourFormat({ initialHour, finalHour })
  const { tr } = createTr({ className })
  const data = { text: tdText }
  const td = createTd({ className: `h${initialHour}`, data })
  const day = addDays({ tdClass: initialHour })
  tr.appendChild(td)
  tr.appendChild(day)
  return tr
}
export function createMultipleTr ({ newHours }) {
  console.log(newHours)
  const fragment = document.createDocumentFragment()
  const { trClass } = showHours({ hours: newHours })

  for (const className of trClass) {
    const index = trClass.indexOf(className)
    const initialHour = newHours[index]
    const finalHour = newHours[index + 1]

    const tr = newTR({ className, initialHour, finalHour })

    fragment.appendChild(tr)
  }

  return fragment
}
function createTr ({ className }) {
  let tr = document.querySelector('.' + className)
  if (!tr) {
    tr = document.createElement('TR')
    tr.className = className
    return { tr }
  }
  return { tr }
}
export function updateTr ({ activity, newHours, tBody }) {
  const { trClass } = showHours({ hours: newHours })
  console.log(trClass)
  for (const className of trClass) {
    const tr = document.querySelector('.' + className)
    console.log(tr)
    if (!tr) {
      const index = trClass.indexOf(className)
      const initialHour = activity.initialHour
      const finalHour = activity.finalHour
      const tr = newTR({ className, initialHour, finalHour })
      if (index === trClass.length - 1) {
        tBody.appendChild(tr)
      } else {
        const next = document.querySelector('.' + trClass[index + 1])
        tBody.insertBefore(tr, next)
      }
    }
  }
  // trClassName({ initialHour: activity.initialHour, finalHour: activity.finalHour })
}
