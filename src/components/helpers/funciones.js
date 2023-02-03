function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  export const formatearFecha =(date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  
  const getDateSplitted = (dateParam)=>{
    const date_splitted = dateParam.split(" ")
    const time = date_splitted[1].split(":")
    const date = date_splitted[0]
    const hours =time[0]
    const mins =time[1]
    const secs =time[2]
    return {
      date:date,
      hours:hours,
      mins:mins,
      secs:secs
    }
  }

  const getStringData = (arr) =>{
    let strMaquinas =""
    arr.forEach((numero, index) => {
      if(index+1 !== arr.length){
        strMaquinas +=numero+'%2C'
      }else{
        strMaquinas += numero
      }
    });
  return strMaquinas;
}




  export {padTo2Digits, getDateSplitted,getStringData}; 