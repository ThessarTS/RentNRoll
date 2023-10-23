const totalDayConverter = (sDate, eDate) => {
  const startDate = new Date(sDate);
  const endDate = new Date(eDate);

  // Calculate the total days
  const millisecondsPerDay = 1000 * 60 * 60 * 24; // milliseconds in a day
  const timeDifference = endDate - startDate;
  const totalDays = Math.floor(timeDifference / millisecondsPerDay);

  return totalDays;
};

module.exports = totalDayConverter;
