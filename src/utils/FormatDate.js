/** @format */

function FormatDate(date) {
  var formatedDate = `${date?.getFullYear()}-${
    date?.getMonth() + 1
  }-${date?.getDate()}`;
  //console.log("formated date value : ", formatedDate);

  return formatedDate;

  // date.toISOstring().slice(0,10);  can use that instead of above  code
}

export default FormatDate;
