export const formmatCurrency = number => {
  return number.toLocaleString() + 'won'
}

// Intl.DateTimeFormat을 사용한 날짜 함수
export const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(new Date(date))
}
