interface Person1 {
    name: string;
    age?: number;
    getDetails?(): string;
  }
  
  interface DogOwner extends Person1 {
    dogName: string;
    getDogDetails?(): string;
  }
  
  interface Employee1 extends Person1 {
    employeeId: string;
  }
  
  interface Manager extends Person1 {
    managePeople(): void;
    delegateTasks(): void;
  }
  
  const person: Person1 = {
    name: 'John',
    age: 23,
    getDetails() {
      return `Name: ${this.name} Age: ${this.age}`;
    },
  };
  
  const employee1: Employee1 = {
    name: 'John',
    age: 23,
    employeeId: '34567fghjxcv',
    getDetails() {
      return `Name: ${this.name} Age: ${this.age}`;
    },
  };
  
  const dogOwner: DogOwner = {
    name: 'Jane',
    age: 30,
    dogName: 'Buddy',
    getDetails() {
      return `Name: ${this.name} Age: ${this.age}`;
    },
    getDogDetails() {
      return `Dog's Name: ${this.dogName}`;
    },
  };
  
  const manager: Manager = {
    name: 'Alice',
    age: 40,
    getDetails() {
      return `Name: ${this.name} Age: ${this.age}`;
    },
    delegateTasks() {
      console.log('Delegating tasks');
    },
    managePeople() {
      console.log('Managing people');
    },
  };
  


const employee2: Person1 | DogOwner | Manager = getEmployee()
// this instance does not work well with arrow functions  
// insteasd use normal functions  
// const getEmployee = () => {}
function getEmployee(): Person1 | DogOwner | Manager {
    const random  = Math.random()
    if(random < 0.33) {
        return {
            name: 'John'
        }
    } else if(random < 0.66) {
        return {
            name: 'John',
            dogName: "Rex"
        } 
    } else {
        return {
            name: 'Bob',
            delegateTasks() {
                
            },
            managePeople() {
                
            },
        }
    }

}

//   // Updated function with type checks()Guards  
// const getEmployee2 = (employee: Person1 | DogOwner | Manager): string => {
//     let random = Math.random();

//     if (random < 0.33 && 'getDogDetails' in employee) {
//         return `DogOwner: ${employee.getDogDetails()}`;
//     } else if (random < 0.66 && 'employeeId' in employee) {
//         return `Employee1: ${employee.getDetails()}`;
//     } else if ('managePeople' in employee) {
//         return `Manager: ${employee.getDetails()}`;
//     } else {
//         return `Person: ${employee.getDetails()}`;
//     }
// };


// differences betw interfaces and objects 
