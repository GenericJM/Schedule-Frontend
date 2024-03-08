let format = '12'
const hours = []
const hourButton = document.querySelector('.hour')
hourButton.addEventListener('click', () => {
  format = format === '12' ? '24' : '12'
  for (let i = 0; i < hours.length - 1; i++) {
    console.log(hours[i])

    const td = document.querySelector(`.h${hours[i]}`)
    if (!td) continue
    td.textContent = hourFormat({ initialHour: hours[i], finalHour: hours[i + 1] })
  }
  console.log(format, hours)
})
const addHour = (hoursArray) => {
  for (const hour of hoursArray) {
    if (!hours.includes(hour)) { hours.push(hour) }
  }
}
export default function hourFormat ({ initialHour, finalHour }) {
  addHour([initialHour, finalHour])
  if (format === '12') {
    const { newHour: initial, prefix: prefixa } = changeFormat(initialHour, '12')
    const { newHour: final, prefix: prefixb } = changeFormat(finalHour, '12')
    return (hourToString(initial.toString()) + prefixa + '-' + hourToString(final.toString()) + prefixb)
  }
  return (hourToString(initialHour.toString()) + '-' + hourToString(finalHour.toString()))
}
const hourToString = (hour) => {
  let newHour
  if (hour.length === 3) {
    newHour = '0' + hour[0] + ':' + hour[1] + hour[2]
  }
  if (hour.length === 4) {
    newHour = hour[0] + hour[1] + ':' + hour[2] + hour[3]
  }
  return newHour
}
const changeFormat = (hour, format) => {
  if (hour >= 1300) {
    return { newHour: (hour - 1200), prefix: 'P.M' }
  }
  return { newHour: hour, prefix: 'A.M' }
}
