export const getHours = () => {
  return JSON.parse(window.localStorage.getItem('hours'))
}
export const setHours = (hours) => {
  window.localStorage.setItem('hours', JSON.stringify(hours))
}
export function hArray (shedule) {
  const hours = shedule.reduce((ac, el) => {
    const { initialHour, finalHour } = el
    if (!ac.includes(initialHour)) {
      ac.push(initialHour)
    }
    if (!ac.includes(finalHour)) {
      ac.push(finalHour)
    }
    return ac
  }, [])
  hours.sort((a, b) => a - b)
  const newHours = comprobateRange({ hours })
  console.log(hours)

  setHours(newHours)
  return newHours
}
export function addHour (newHour) {
  // const shedule = JSON.parse(window.localStorage.getItem('shedule'))
  // console.log(hArray(shedule))
  // console.log(hours)
  const hours = getHours()
  const newInitialHour = hours.includes(newHour.initialHour)
  const newFinalHour = hours.includes(newHour.finalHour)
  if (newInitialHour && newFinalHour) return
  !newInitialHour && hours.push(newHour.initialHour)
  !newFinalHour && hours.push(newHour.finalHour)
  hours.sort((a, b) => a - b)
  const newHours = comprobateRange({ hours })
  setHours(newHours)
  // console.log(hours) // hours.push()
}

export default function showHours ({ hours }) {
  const trClass = []
  // const newHours = comprobateRange({ hours })

  for (let i = 0; i < hours.length - 1; i++) {
    trClass.push(`hrs_${hours[i]}_${hours[i + 1]}`)
  }
  return { trClass, hours }
}
export function comprobateRange ({ hours }) {
  const range = []
  for (let i = 0; i < hours.length - 1; i++) {
    const dif = (hours[i + 1] - hours[i])
    range.push(hours[i])
    if (dif > 100) {
      const toAdd = addMore(hours[i], dif / 100)
      range.push(...toAdd)
    }
    // console.log(hours.indexOf(hours[i]))
    if (hours.indexOf(hours[i]) === hours.length - 2) range.push(hours[i + 1])
  }
  return range
}
function addMore (hour, amount) {
  const news = []
  for (let i = 1; i < amount; i++) {
    news.push(hour + (i * 100))
  }
  return news
}
