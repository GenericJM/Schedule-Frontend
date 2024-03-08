import { schedule } from '../moks/schedule.js'
export default function getSchedule () {
  return fetch('https://scheduleapi-pffq.onrender.com/schedule')
    .then(res => {
      if (res.status === 404) {
        return schedule
      }

      return res.json()
    })
}
