const cars: string[] = ['Ford', 'Audi'];
const cars2: Array<string> = ['Ford', 'Audi'];

const promise = new Promise<number>(resolve => {
    setTimeout(() => {
        resolve(42);
    }, 2000);
})

promise.then(data => {
    console.log(data.toFixed());
})

function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
    return Object.assign({}, a, b);
}

const merged = mergeObjects({ name: "Max" }, { age: 26 });
const merged2 = mergeObjects({ model: "Ford" }, { year: 2010 });
console.log(merged.name)
console.log(merged2.model);

// const merged3 = mergeObjects("aaa", "bbb");
// console.log(merged3);

// ============================= //

interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T): { value: T, count: string } {
    return {
        value,
        count: `В этом объекте ${value.length} символов`,
    }
}

console.log(withCount("Hello TS!"));
console.log(withCount(["I", "am", "array"]));
console.log(withCount({ length: 20 }));

// ============================= //

function getObjectValue<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}


const person = {
    name: "Max",
    age: 21,
}

console.log(getObjectValue(person, "name"));
console.log(getObjectValue(person, "age"));
// console.log(getObjectValue(person, "job")); // Error!

// ============================= //

class Collection<T extends number | string | boolean> {
    constructor(private _items: T[] = []) {}

    add(item: T) {
        this._items.push(item);
    }

    remove(item: T) {
        this._items = this._items.filter(i => i !== item);
    }

    get items(): T[] {
        return this._items;
    }
}

const strings = new Collection<string>(["I", "Am", "Strings", "Array"]);
strings.add("s");
strings.remove("Am");
console.log(strings.items);

const numbers = new Collection<number>([1, 2, 3, 4]);
numbers.add(2);
numbers.remove(3);
console.log(numbers.items);

// const objs = new Collection([{ a: 1 }, { b: 2 }]); // Error!
// objs.remove({ b: 2 });
// console.log(objs.items);

interface Car {
    model: string;
    year: number;
}

function createAndValidateCar(model: string, year: number): Car {
    const car: Partial<Car> = {}

    if (model.length > 3) {
        car.model = model;
    }

    if (year > 2000) {
        car.year = year;
    }

    return car as Car;
}

///

const myCars: Readonly<Array<string>> = ["Ford", "Audi"];
// cars[2] = 1; // Error!

const ford: Readonly<Car> = {
    model: "Ford",
    year: 2020,
}

// ford.model = "Ferrarri"; // Error!