import "./style/App.css";

function App() {
  // 수정
  // Q.1
  const name: string = "John";
  const age: number = 25;
  const isStudent: boolean = true;

  console.log("Name:", name);
  console.log("Age:", age);
  console.log("Is Student:", isStudent);

  // Q.2
  function greet(name: string): string {
    return "Hello, " + name + "!";
  }
  const result = greet("Alice");
  console.log(result);

  // Q.3
  function sumArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc + num, 0);
  }

  const numbersQ3 = [1, 2, 3, 4, 5];
  const resultQ3 = sumArray(numbersQ3);
  console.log(resultQ3); // Output: 15

  // Q.4
  function filterEvenNumbers(numbers: number[]): number[] {
    return numbers.filter(function (num: number) {
      return num % 2 === 0;
    });
  }

  const input: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const output: number[] = filterEvenNumbers(input);
  console.log("output", output);

  // Q.5
  function processInput(input: number | string): number | string {
    if (typeof input === "number") {
      return input * 2;
    } else if (typeof input === "string") {
      return input.toUpperCase();
    } else {
      throw new Error("Invalid input type");
    }
  }

  console.log(processInput(10)); // Output: 20
  console.log(processInput("hello")); // Output: 'HELLO'

  // Q.6
  function findElement<T>(arr: Array<T>, element: T): boolean {
    return arr.includes(element);
  }

  const numbers = [1, 2, 3, 4, 5];
  const result1 = findElement(numbers, 3);
  console.log(result1); // Output: true

  const names = ["Alice", "Bob", "Charlie"];
  const result2 = findElement(names, "Dave");
  console.log(result2); // Output: false

  // Q.7
  type Student = {
    name: string;
    age: number;
  };

  function findObjectsByProperty(
    objects: Array<Student>,
    property: keyof Student,
    value: string
  ): Student | undefined {
    return objects.find((obj: Student) => {
      return obj[property] === value;
    });
  }

  var students = [
    { name: "Alice", age: 18 },
    { name: "Bob", age: 20 },
    { name: "Charlie", age: 22 },
  ];

  const student = findObjectsByProperty(students, "name", "Bob");
  console.log(student);

  return <main>Here!</main>;
}

export default App;
