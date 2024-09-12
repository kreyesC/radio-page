export const  excelSerialToJSDate = (serial) =>{
    const excelEpoch = new Date(1899, 11, 30);
    const daysInMs = serial * 86400000; 
    return new Date(excelEpoch.getTime() + daysInMs); 
}

 