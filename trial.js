const basicDetail = {
    name: "Ram",
    roll: 45
}

const address = {
    city:"Agra",
    pin: 245163
}

address.locality = "Taj Mahal"

console.log(basicDetail)
console.log(address)

const student = {
    ...basicDetail,
    ...address
}
//const student1 = Object.assign(basicDetail, address)
console.log(student)

const arr = [1]
for(let i=0; i<=499; i++){
    arr[i]=i+1;
}
let sum = arr.reduce((a, b) => a+b)

console.log(sum)
