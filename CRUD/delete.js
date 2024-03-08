export function deleteActivity ({ id }) {
  return fetch(`https://scheduleapi-pffq.onrender.com/schedule/${id}`, {
    method: 'DELETE'
  })
}
