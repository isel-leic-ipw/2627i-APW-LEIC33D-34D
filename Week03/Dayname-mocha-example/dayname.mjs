const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

export function dayName(number) {
    return names[number];
}
export function dayNumber(name) {
    return names.indexOf(name);
    if (name.length > 0) {
        let nameFirstUpperCase = name[0].toUpperCase() + name.slice(1).toLowerCase();
        return names.indexOf(nameFirstUpperCase);
    }
    else return -1;
}