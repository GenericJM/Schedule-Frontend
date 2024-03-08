import { addHour } from '../services/Hours.mjs'
import getSchedule from './services/getSchedule.mjs'
import createActivity from './CRUD/post.mjs'
import NewTable, { updateTable } from './TableManager/NewTable.mjs'
import { getHours } from './services/Hours.mjs'

const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  console.log('submit')
  e.preventDefault()
  const day = document.querySelector('.day').value
  const initialHour = Number(document.querySelector('.initialHour').value)
  const finalHour = Number(document.querySelector('.finalHour').value)
  const activity = document.querySelector('.Activity').value
  console.log(day)
  const newActivity = { day, initialHour, finalHour, activity }
  // window.location.replace("./insert/index.html")
  if (day !== 'none') {
    const shedule = JSON.parse(window.localStorage.getItem('shedule'))

    console.log(shedule)
    createActivity(newActivity)
      .then(res => {
        shedule.push(res)
        window.localStorage.setItem('shedule', JSON.stringify(shedule))
        addHour({ initialHour, finalHour })
        // console.log(res)
        const newHours = getHours()
        updateTable({ shedule: [res], newHours })
      })
  }
})
async function init () {
  const shedule = await getSchedule()
  window.localStorage.setItem('shedule', JSON.stringify(shedule))

  console.log('cargando')

  console.log(shedule)
  NewTable({ shedule })
}
init()
