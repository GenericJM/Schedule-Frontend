export default function createActivity ({ initialHour, finalHour, day, activity }) {
  // const update = true
  const data = {
    day,
    initialHour: parseInt(initialHour),
    finalHour: parseInt(finalHour),
    activity
  }
  return fetch('https://scheduleapi-pffq.onrender.com/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  })
    .then(res => res.json())
}
