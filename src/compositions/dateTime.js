export function useDateTime() {
  const now = new Date()
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const years = [...Array(11).keys()].map(i => i + now.getFullYear() - 5)

  return {
    now,
    daysOfWeek,
    months,
    years,
  }
}
