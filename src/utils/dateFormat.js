const dateFormart = (date) => {
  const newDate = new Date(date);
  let stringMonth = "";

  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  switch (month) {
    case 0:
      stringMonth = "janeiro";
      break;
    case 1:
      stringMonth = "fevereiro";
      break;
    case 2:
      stringMonth = "março";
      break;
    case 3:
      stringMonth = "abril";
      break;
    case 4:
      stringMonth = "maio";
      break;
    case 5:
      stringMonth = "junho";
      break;
    case 6:
      stringMonth = "julho";
      break;
    case 7:
      stringMonth = "agosto";
      break;
    case 8:
      stringMonth = "setembro";
      break;
    case 9:
      stringMonth = "outubro";
      break;
    case 10:
      stringMonth = "novembro";
      break;
    case 11:
      stringMonth = "dezembro";
      break;
  }

  return {
    day,
    stringMonth,
    year,
  };
};

export { dateFormart };
