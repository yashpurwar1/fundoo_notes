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


