"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedLessonsForLanguages = exports.seedLessons = void 0;
const language_model_1 = require("../models/language.model");
const lesson_section_model_1 = require("../models/lesson-section.model");
const lesson_model_1 = require("../models/lesson.model");
// Comprehensive lesson content data for different languages
const LESSON_CONTENT_TEMPLATES = {
    python: {
        codeExamples: [
            {
                id: 'python-basics-1',
                title: 'Hello World',
                description: 'Your first Python program',
                code: 'print("Hello, World!")',
                explanation: 'The print() function outputs text to the console.'
            },
            {
                id: 'python-basics-2',
                title: 'Variables and Data Types',
                description: 'Storing different types of data',
                code: '# Different data types\nname = "Alice"  # String\nage = 25  # Integer\nheight = 5.6  # Float\nis_student = True  # Boolean\n\nprint(f"Name: {name}, Age: {age}, Height: {height}, Student: {is_student}")',
                explanation: 'Python automatically determines data types. Use f-strings for formatted output.'
            },
            {
                id: 'python-basics-3',
                title: 'User Input',
                description: 'Getting input from users',
                code: 'name = input("What is your name? ")\nage = int(input("What is your age? "))\nprint(f"Hello {name}! You are {age} years old.")',
                explanation: 'input() gets string input. Use int() to convert to integer.'
            }
        ],
        steps: [
            'Open your Python editor or IDE (VS Code, PyCharm, or IDLE)',
            'Type the code example',
            'Save the file with .py extension',
            'Run the program using: python filename.py'
        ],
        exercise: {
            description: 'Create a program that asks for your name, age, and favorite color, then displays a personalized message.',
            starterCode: '# Write your code here\nname = input("Enter your name: ")\nage = input("Enter your age: ")\ncolor = input("Enter your favorite color: ")\n# Complete the message below\n',
            solution: 'name = input("Enter your name: ")\nage = input("Enter your age: ")\ncolor = input("Enter your favorite color: ")\nprint(f"Hello {name}! You are {age} years old and your favorite color is {color}.")'
        }
    },
    javascript: {
        codeExamples: [
            {
                id: 'js-basics-1',
                title: 'Hello World',
                description: 'Your first JavaScript program',
                code: 'console.log("Hello, World!");',
                explanation: 'console.log() outputs text to the browser console.'
            },
            {
                id: 'js-basics-2',
                title: 'Variables and Constants',
                description: 'Using let, const, and var',
                code: '// Different ways to declare variables\nconst name = "Alice";  // Cannot be changed\nlet age = 25;  // Can be changed\nvar city = "New York";  // Old way (avoid)\n\nconsole.log(`Hello, ${name}! You are ${age} years old and live in ${city}.`);',
                explanation: 'const creates constants, let creates variables. Template literals use backticks for string interpolation.'
            },
            {
                id: 'js-basics-3',
                title: 'Functions',
                description: 'Creating reusable code blocks',
                code: 'function greet(name, age) {\n    return `Hello ${name}! You are ${age} years old.`;\n}\n\nconst message = greet("Alice", 25);\nconsole.log(message);',
                explanation: 'Functions allow you to create reusable code. Use return to send back a value.'
            }
        ],
        steps: [
            'Open your browser developer tools (F12)',
            'Go to the Console tab',
            'Type the code and press Enter',
            'See the output in the console'
        ],
        exercise: {
            description: 'Create a function that calculates the area of a rectangle and call it with different values.',
            starterCode: '// Write your function here\nfunction calculateArea(width, height) {\n    // Complete the function\n}\n\n// Test your function\nconsole.log(calculateArea(5, 3));',
            solution: 'function calculateArea(width, height) {\n    return width * height;\n}\n\nconsole.log(calculateArea(5, 3)); // Output: 15'
        }
    },
    html: {
        codeExamples: [
            {
                id: 'html-basics-1',
                title: 'Basic HTML Structure',
                description: 'The foundation of every HTML document',
                code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Welcome to My Website</h1>\n    <p>This is my first HTML page!</p>\n</body>\n</html>',
                explanation: 'Every HTML document needs DOCTYPE, html, head, and body elements. Meta tags provide important information.'
            },
            {
                id: 'html-basics-2',
                title: 'Text Elements and Formatting',
                description: 'Adding different types of text content',
                code: '<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<h3>Smaller Heading</h3>\n<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>\n<p>You can also use <mark>highlighted text</mark> and <del>deleted text</del>.</p>',
                explanation: 'h1-h6 create headings of different sizes. strong, em, mark, and del provide text formatting.'
            },
            {
                id: 'html-basics-3',
                title: 'Links and Images',
                description: 'Adding navigation and media',
                code: '<a href="https://www.w3schools.com" target="_blank">Visit W3Schools</a>\n<br>\n<img src="https://via.placeholder.com/300x200" alt="Sample Image" width="300" height="200">\n<br>\n<a href="#section1">Jump to Section 1</a>\n<h2 id="section1">Section 1</h2>',
                explanation: 'a tags create links. href specifies the destination. img tags display images. Use alt for accessibility.'
            }
        ],
        steps: [
            'Create a new file with .html extension',
            'Add the basic HTML structure',
            'Add your content between the body tags',
            'Open the file in a web browser to see the result'
        ],
        exercise: {
            description: 'Create an HTML page about your favorite hobby with headings, paragraphs, and a link to more information.',
            starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My Favorite Hobby</title>\n</head>\n<body>\n    <!-- Add your content here -->\n</body>\n</html>',
            solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My Favorite Hobby</title>\n</head>\n<body>\n    <h1>My Favorite Hobby: Reading</h1>\n    <p>I love reading books because it helps me learn new things and improves my imagination.</p>\n    <h2>My Favorite Books</h2>\n    <p>Some of my favorite books include science fiction and mystery novels.</p>\n    <a href="https://www.goodreads.com" target="_blank">Find more books on Goodreads</a>\n</body>\n</html>'
        }
    },
    css: {
        codeExamples: [
            {
                id: 'css-basics-1',
                title: 'Basic Styling',
                description: 'Adding colors and fonts to your HTML',
                code: 'h1 {\n    color: #2c3e50;\n    font-family: "Arial", sans-serif;\n    font-size: 32px;\n    text-align: center;\n}\n\np {\n    color: #34495e;\n    font-size: 16px;\n    line-height: 1.6;\n}',
                explanation: 'CSS selectors target HTML elements. Use hex colors, font families, and various properties to style elements.'
            },
            {
                id: 'css-basics-2',
                title: 'Box Model and Layout',
                description: 'Understanding margins, borders, and padding',
                code: '.container {\n    width: 300px;\n    height: 200px;\n    margin: 20px auto;\n    padding: 20px;\n    border: 2px solid #3498db;\n    border-radius: 10px;\n    background-color: #ecf0f1;\n}\n\n.box {\n    width: 100px;\n    height: 100px;\n    background-color: #e74c3c;\n    margin: 10px;\n}',
                explanation: 'The box model controls spacing. Margin is outside, padding is inside, border is between them.'
            },
            {
                id: 'css-basics-3',
                title: 'Flexbox Layout',
                description: 'Modern CSS layout with flexbox',
                code: '.flex-container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 200px;\n    background-color: #f8f9fa;\n    padding: 20px;\n}\n\n.flex-item {\n    background-color: #007bff;\n    color: white;\n    padding: 20px;\n    margin: 5px;\n    flex: 1;\n}',
                explanation: 'Flexbox makes it easy to create flexible layouts. justify-content controls horizontal alignment, align-items controls vertical alignment.'
            }
        ],
        steps: [
            'Create a CSS file with .css extension',
            'Link it to your HTML using: <link rel="stylesheet" href="styles.css">',
            'Write CSS rules to style your elements',
            'Refresh your browser to see the changes'
        ],
        exercise: {
            description: 'Style a card component with a title, description, and button using CSS.',
            starterCode: '/* Write your CSS here */\n.card {\n    /* Style the card container */\n}\n\n.card-title {\n    /* Style the title */\n}\n\n.card-description {\n    /* Style the description */\n}\n\n.card-button {\n    /* Style the button */\n}',
            solution: '.card {\n    width: 300px;\n    padding: 20px;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    margin: 20px;\n}\n\n.card-title {\n    font-size: 24px;\n    color: #333;\n    margin-bottom: 10px;\n}\n\n.card-description {\n    color: #666;\n    line-height: 1.5;\n    margin-bottom: 15px;\n}\n\n.card-button {\n    background-color: #007bff;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}'
        }
    },
    java: {
        codeExamples: [
            {
                id: 'java-basics-1',
                title: 'Hello World Program',
                description: 'Your first Java program',
                code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
                explanation: 'Every Java program needs a class with a main method. System.out.println() prints to the console.'
            },
            {
                id: 'java-basics-2',
                title: 'Variables and Data Types',
                description: 'Declaring variables in Java',
                code: 'public class Variables {\n    public static void main(String[] args) {\n        // Primitive data types\n        int age = 25;\n        double height = 5.6;\n        char grade = \'A\';\n        boolean isStudent = true;\n        String name = "Alice";\n        \n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Height: " + height);\n        System.out.println("Grade: " + grade);\n        System.out.println("Is Student: " + isStudent);\n    }\n}',
                explanation: 'Java is statically typed. You must declare the data type when creating variables.'
            },
            {
                id: 'java-basics-3',
                title: 'Methods and Classes',
                description: 'Creating reusable code with methods',
                code: 'public class Calculator {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    \n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n    \n    public static void main(String[] args) {\n        int sum = add(5, 3);\n        int product = multiply(4, 6);\n        \n        System.out.println("Sum: " + sum);\n        System.out.println("Product: " + product);\n    }\n}',
                explanation: 'Methods are functions inside classes. Use static for methods that don\'t need an object instance.'
            }
        ],
        steps: [
            'Install Java Development Kit (JDK)',
            'Create a .java file with your code',
            'Compile with: javac filename.java',
            'Run with: java filename'
        ],
        exercise: {
            description: 'Create a Java class that calculates the area and perimeter of a rectangle.',
            starterCode: 'public class Rectangle {\n    public static double calculateArea(double width, double height) {\n        // Complete this method\n    }\n    \n    public static double calculatePerimeter(double width, double height) {\n        // Complete this method\n    }\n    \n    public static void main(String[] args) {\n        // Test your methods here\n    }\n}',
            solution: 'public class Rectangle {\n    public static double calculateArea(double width, double height) {\n        return width * height;\n    }\n    \n    public static double calculatePerimeter(double width, double height) {\n        return 2 * (width + height);\n    }\n    \n    public static void main(String[] args) {\n        double area = calculateArea(5.0, 3.0);\n        double perimeter = calculatePerimeter(5.0, 3.0);\n        \n        System.out.println("Area: " + area);\n        System.out.println("Perimeter: " + perimeter);\n    }\n}'
        }
    },
    typescript: {
        codeExamples: [
            {
                id: 'ts-basics-1',
                title: 'Hello World with TypeScript',
                description: 'Your first TypeScript program',
                code: 'function greet(name: string): string {\n    return `Hello, ${name}!`;\n}\n\nconst message = greet("World");\nconsole.log(message);',
                explanation: 'TypeScript adds type annotations to JavaScript. Here we specify that name is a string and the function returns a string.'
            },
            {
                id: 'ts-basics-2',
                title: 'Interfaces and Types',
                description: 'Defining custom data structures',
                code: 'interface Person {\n    name: string;\n    age: number;\n    email?: string; // Optional property\n}\n\ntype Status = "active" | "inactive" | "pending";\n\nfunction createPerson(name: string, age: number): Person {\n    return { name, age };\n}\n\nconst person: Person = createPerson("Alice", 25);\nconsole.log(person);',
                explanation: 'Interfaces define the shape of objects. Types can be unions of specific values. Optional properties use ?.'
            },
            {
                id: 'ts-basics-3',
                title: 'Classes and Inheritance',
                description: 'Object-oriented programming in TypeScript',
                code: 'class Animal {\n    protected name: string;\n    \n    constructor(name: string) {\n        this.name = name;\n    }\n    \n    speak(): void {\n        console.log(`${this.name} makes a sound`);\n    }\n}\n\nclass Dog extends Animal {\n    speak(): void {\n        console.log(`${this.name} barks`);\n    }\n}\n\nconst dog = new Dog("Buddy");\ndog.speak();',
                explanation: 'TypeScript supports classes with inheritance. protected allows access in subclasses. Override methods in child classes.'
            }
        ],
        steps: [
            'Install TypeScript: npm install -g typescript',
            'Create a .ts file with your code',
            'Compile with: tsc filename.ts',
            'Run the generated JavaScript file'
        ],
        exercise: {
            description: 'Create a TypeScript interface for a Book and a class that implements it.',
            starterCode: 'interface Book {\n    // Define the interface properties\n}\n\nclass LibraryBook implements Book {\n    // Implement the interface\n    constructor(/* parameters */) {\n        // Initialize properties\n    }\n    \n    // Add a method to display book info\n}\n\n// Create and test your book',
            solution: 'interface Book {\n    title: string;\n    author: string;\n    pages: number;\n    isAvailable: boolean;\n}\n\nclass LibraryBook implements Book {\n    title: string;\n    author: string;\n    pages: number;\n    isAvailable: boolean;\n    \n    constructor(title: string, author: string, pages: number) {\n        this.title = title;\n        this.author = author;\n        this.pages = pages;\n        this.isAvailable = true;\n    }\n    \n    displayInfo(): void {\n        console.log(`"${this.title}" by ${this.author} (${this.pages} pages) - ${this.isAvailable ? \'Available\' : \'Checked out\'}`);\n    }\n}\n\nconst book = new LibraryBook("The Great Gatsby", "F. Scott Fitzgerald", 180);\nbook.displayInfo();'
        }
    },
    react: {
        codeExamples: [
            {
                id: 'react-basics-1',
                title: 'First React Component',
                description: 'Creating your first React component',
                code: 'import React from \'react\';\n\nfunction Welcome(props) {\n    return <h1>Hello, {props.name}!</h1>;\n}\n\nfunction App() {\n    return (\n        <div>\n            <Welcome name="Sara" />\n            <Welcome name="Cahal" />\n            <Welcome name="Edite" />\n        </div>\n    );\n}\n\nexport default App;',
                explanation: 'React components are functions that return JSX. Props allow you to pass data to components.'
            },
            {
                id: 'react-basics-2',
                title: 'State and Hooks',
                description: 'Managing component state with useState',
                code: 'import React, { useState } from \'react\';\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    \n    return (\n        <div>\n            <p>You clicked {count} times</p>\n            <button onClick={() => setCount(count + 1)}>\n                Click me\n            </button>\n        </div>\n    );\n}\n\nexport default Counter;',
                explanation: 'useState is a Hook that lets you add state to functional components. It returns the current state and a function to update it.'
            },
            {
                id: 'react-basics-3',
                title: 'Event Handling',
                description: 'Handling user interactions',
                code: 'import React, { useState } from \'react\';\n\nfunction TodoApp() {\n    const [todos, setTodos] = useState([]);\n    const [input, setInput] = useState(\'\');\n    \n    const addTodo = () => {\n        if (input.trim()) {\n            setTodos([...todos, input]);\n            setInput(\'\');\n        }\n    };\n    \n    return (\n        <div>\n            <input \n                value={input}\n                onChange={(e) => setInput(e.target.value)}\n                placeholder="Add a todo"\n            />\n            <button onClick={addTodo}>Add Todo</button>\n            <ul>\n                {todos.map((todo, index) => (\n                    <li key={index}>{todo}</li>\n                ))}\n            </ul>\n        </div>\n    );\n}\n\nexport default TodoApp;',
                explanation: 'Event handlers are functions that respond to user interactions. onChange handles input changes, onClick handles button clicks.'
            }
        ],
        steps: [
            'Create a new React app: npx create-react-app my-app',
            'Navigate to the app directory: cd my-app',
            'Edit the src/App.js file with your component',
            'Run the app: npm start'
        ],
        exercise: {
            description: 'Create a React component that displays a list of your favorite movies with the ability to add new ones.',
            starterCode: 'import React, { useState } from \'react\';\n\nfunction MovieList() {\n    // Add state for movies and input\n    \n    // Add function to add new movie\n    \n    return (\n        <div>\n            {/* Add input and button */}\n            {/* Display list of movies */}\n        </div>\n    );\n}\n\nexport default MovieList;',
            solution: 'import React, { useState } from \'react\';\n\nfunction MovieList() {\n    const [movies, setMovies] = useState([\'The Matrix\', \'Inception\', \'Interstellar\']);\n    const [newMovie, setNewMovie] = useState(\'\');\n    \n    const addMovie = () => {\n        if (newMovie.trim()) {\n            setMovies([...movies, newMovie]);\n            setNewMovie(\'\');\n        }\n    };\n    \n    return (\n        <div>\n            <h2>My Favorite Movies</h2>\n            <input \n                value={newMovie}\n                onChange={(e) => setNewMovie(e.target.value)}\n                placeholder="Add a movie"\n            />\n            <button onClick={addMovie}>Add Movie</button>\n            <ul>\n                {movies.map((movie, index) => (\n                    <li key={index}>{movie}</li>\n                ))}\n            </ul>\n        </div>\n    );\n}\n\nexport default MovieList;'
        }
    },
    vue: {
        codeExamples: [
            {
                id: 'vue-basics-1',
                title: 'First Vue Component',
                description: 'Creating your first Vue component',
                code: '<template>\n  <div>\n    <h1>{{ message }}</h1>\n    <p>Count: {{ count }}</p>\n    <button @click="increment">Increment</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: \'Hello Vue!\',\n      count: 0\n    }\n  },\n  methods: {\n    increment() {\n      this.count++\n    }\n  }\n}\n</script>',
                explanation: 'Vue uses template syntax with double curly braces for data binding. @click is shorthand for v-on:click.'
            },
            {
                id: 'vue-basics-2',
                title: 'Composition API',
                description: 'Using Vue 3 Composition API',
                code: '<template>\n  <div>\n    <h1>{{ title }}</h1>\n    <input v-model="name" placeholder="Enter your name">\n    <p>Hello, {{ name || \'stranger\' }}!</p>\n    <button @click="greet">Greet</button>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from \'vue\'\n\nconst title = ref(\'Vue 3 App\')\nconst name = ref(\'\')\n\nconst greet = () => {\n  alert(`Hello, ${name.value || \'stranger\'}!`)\n}\n</script>',
                explanation: 'Composition API uses setup() function and reactive references. v-model creates two-way data binding.'
            },
            {
                id: 'vue-basics-3',
                title: 'Props and Events',
                description: 'Component communication',
                code: '<!-- Parent Component -->\n<template>\n  <div>\n    <ChildComponent \n      :message="parentMessage" \n      @update="handleUpdate"\n    />\n  </div>\n</template>\n\n<script>\nimport ChildComponent from \'./ChildComponent.vue\'\n\nexport default {\n  components: { ChildComponent },\n  data() {\n    return {\n      parentMessage: \'Hello from parent!\'\n    }\n  },\n  methods: {\n    handleUpdate(newMessage) {\n      this.parentMessage = newMessage\n    }\n  }\n}\n</script>\n\n<!-- Child Component -->\n<template>\n  <div>\n    <p>{{ message }}</p>\n    <button @click="updateParent">Update Parent</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: [\'message\'],\n  methods: {\n    updateParent() {\n      this.$emit(\'update\', \'Updated from child!\')\n    }\n  }\n}\n</script>',
                explanation: 'Props pass data down to child components. Events allow child components to communicate with parents.'
            }
        ],
        steps: [
            'Create a new Vue app: npm create vue@latest my-app',
            'Navigate to the app directory: cd my-app',
            'Install dependencies: npm install',
            'Run the app: npm run dev'
        ],
        exercise: {
            description: 'Create a Vue component that manages a shopping cart with items, quantities, and total price.',
            starterCode: '<template>\n  <div>\n    <!-- Add your template here -->\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      // Add your data properties\n    }\n  },\n  computed: {\n    // Add computed properties for total\n  },\n  methods: {\n    // Add methods for cart operations\n  }\n}\n</script>',
            solution: '<template>\n  <div>\n    <h2>Shopping Cart</h2>\n    <div v-for="item in cart" :key="item.id" class="cart-item">\n      <span>{{ item.name }} - ${{ item.price }}</span>\n      <button @click="decreaseQuantity(item.id)">-</button>\n      <span>{{ item.quantity }}</span>\n      <button @click="increaseQuantity(item.id)">+</button>\n      <button @click="removeItem(item.id)">Remove</button>\n    </div>\n    <h3>Total: ${{ total }}</h3>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      cart: [\n        { id: 1, name: \'Apple\', price: 1.50, quantity: 2 },\n        { id: 2, name: \'Banana\', price: 0.80, quantity: 3 }\n      ]\n    }\n  },\n  computed: {\n    total() {\n      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)\n    }\n  },\n  methods: {\n    increaseQuantity(id) {\n      const item = this.cart.find(item => item.id === id)\n      if (item) item.quantity++\n    },\n    decreaseQuantity(id) {\n      const item = this.cart.find(item => item.id === id)\n      if (item && item.quantity > 1) item.quantity--\n    },\n    removeItem(id) {\n      this.cart = this.cart.filter(item => item.id !== id)\n    }\n  }\n}\n</script>'
        }
    },
    nodejs: {
        codeExamples: [
            {
                id: 'nodejs-basics-1',
                title: 'First Node.js Server',
                description: 'Creating a simple HTTP server',
                code: 'const http = require(\'http\');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { \'Content-Type\': \'text/html\' });\n  res.end(\'<h1>Hello World!</h1><p>This is my first Node.js server!</p>\');\n});\n\nconst PORT = 3000;\nserver.listen(PORT, () => {\n  console.log(`Server running at http://localhost:${PORT}/`);\n});',
                explanation: 'Node.js allows you to run JavaScript on the server. http module creates web servers.'
            },
            {
                id: 'nodejs-basics-2',
                title: 'File System Operations',
                description: 'Reading and writing files',
                code: 'const fs = require(\'fs\').promises;\nconst path = require(\'path\');\n\nasync function fileOperations() {\n  try {\n    // Write to file\n    await fs.writeFile(\'data.txt\', \'Hello from Node.js!\');\n    console.log(\'File written successfully\');\n    \n    // Read from file\n    const data = await fs.readFile(\'data.txt\', \'utf8\');\n    console.log(\'File content:\', data);\n    \n    // Check if file exists\n    const exists = await fs.access(\'data.txt\').then(() => true).catch(() => false);\n    console.log(\'File exists:\', exists);\n  } catch (error) {\n    console.error(\'Error:\', error.message);\n  }\n}\n\nfileOperations();',
                explanation: 'fs module handles file operations. Use promises version for async/await syntax.'
            },
            {
                id: 'nodejs-basics-3',
                title: 'Express.js Web Framework',
                description: 'Building web applications with Express',
                code: 'const express = require(\'express\');\nconst app = express();\nconst PORT = 3000;\n\n// Middleware\napp.use(express.json());\n\n// Routes\napp.get(\'/\', (req, res) => {\n  res.json({ message: \'Welcome to my API!\' });\n});\n\napp.get(\'/users/:id\', (req, res) => {\n  const { id } = req.params;\n  res.json({ userId: id, name: \'John Doe\' });\n});\n\napp.post(\'/users\', (req, res) => {\n  const { name, email } = req.body;\n  res.json({ message: \'User created\', user: { name, email } });\n});\n\napp.listen(PORT, () => {\n  console.log(`Server running on port ${PORT}`);\n});',
                explanation: 'Express.js simplifies web server creation. Routes handle different HTTP methods and paths.'
            }
        ],
        steps: [
            'Install Node.js from nodejs.org',
            'Create a new file with .js extension',
            'Run with: node filename.js',
            'For Express apps: npm init, npm install express'
        ],
        exercise: {
            description: 'Create a Node.js server that serves a simple REST API for managing a todo list.',
            starterCode: 'const express = require(\'express\');\nconst app = express();\n\n// Add middleware\n\n// Add your routes here\n// GET /todos - get all todos\n// POST /todos - create new todo\n// PUT /todos/:id - update todo\n// DELETE /todos/:id - delete todo\n\n// Start server',
            solution: 'const express = require(\'express\');\nconst app = express();\n\napp.use(express.json());\n\nlet todos = [\n  { id: 1, text: \'Learn Node.js\', completed: false },\n  { id: 2, text: \'Build an API\', completed: false }\n];\n\n// GET all todos\napp.get(\'/todos\', (req, res) => {\n  res.json(todos);\n});\n\n// POST new todo\napp.post(\'/todos\', (req, res) => {\n  const { text } = req.body;\n  const newTodo = {\n    id: todos.length + 1,\n    text,\n    completed: false\n  };\n  todos.push(newTodo);\n  res.json(newTodo);\n});\n\n// PUT update todo\napp.put(\'/todos/:id\', (req, res) => {\n  const { id } = req.params;\n  const { text, completed } = req.body;\n  const todo = todos.find(t => t.id === parseInt(id));\n  if (todo) {\n    todo.text = text || todo.text;\n    todo.completed = completed !== undefined ? completed : todo.completed;\n    res.json(todo);\n  } else {\n    res.status(404).json({ error: \'Todo not found\' });\n  }\n});\n\n// DELETE todo\napp.delete(\'/todos/:id\', (req, res) => {\n  const { id } = req.params;\n  todos = todos.filter(t => t.id !== parseInt(id));\n  res.json({ message: \'Todo deleted\' });\n});\n\nconst PORT = 3000;\napp.listen(PORT, () => {\n  console.log(`Server running on port ${PORT}`);\n});'
        }
    }
};
// Default sections and lessons for each language
const DEFAULT_LESSON_DATA = {
    python: {
        sections: [
            {
                title: 'Getting Started',
                description: 'Learn the fundamentals and get started with Python programming',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to Python',
                        description: 'Learn what Python is and why it\'s popular',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.python
                    },
                    {
                        title: 'Installing Python',
                        description: 'Set up Python on your computer',
                        lesson_number: 2,
                        content: {
                            steps: [
                                'Visit python.org',
                                'Download the latest version',
                                'Run the installer',
                                'Verify installation with python --version'
                            ]
                        }
                    }
                ]
            },
            {
                title: 'Basic Syntax',
                description: 'Master the basic syntax and structure of Python code',
                section_number: 2,
                lessons: [
                    {
                        title: 'Variables and Data Types',
                        description: 'Learn how to store and work with different types of data',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.python
                    },
                    {
                        title: 'Input and Output',
                        description: 'Getting input from users and displaying output',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'python-io-1',
                                    title: 'Getting User Input',
                                    description: 'Using input() function',
                                    code: 'name = input("What is your name? ")\nprint(f"Nice to meet you, {name}!")',
                                    explanation: 'input() pauses the program and waits for user input.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    javascript: {
        sections: [
            {
                title: 'JavaScript Basics',
                description: 'Learn the fundamentals of JavaScript programming',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to JavaScript',
                        description: 'What is JavaScript and where is it used?',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.javascript
                    },
                    {
                        title: 'Variables and Constants',
                        description: 'Learn about let, const, and var',
                        lesson_number: 2,
                        content: LESSON_CONTENT_TEMPLATES.javascript
                    }
                ]
            },
            {
                title: 'DOM Manipulation',
                description: 'Learn how to interact with HTML elements using JavaScript',
                section_number: 2,
                lessons: [
                    {
                        title: 'Selecting Elements',
                        description: 'How to find and select HTML elements',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'js-dom-1',
                                    title: 'getElementById',
                                    description: 'Selecting elements by ID',
                                    code: 'const element = document.getElementById("myId");\nelement.textContent = "Hello World!";',
                                    explanation: 'getElementById finds an element with a specific ID.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    html: {
        sections: [
            {
                title: 'HTML Introduction',
                description: 'Learn the basics of HTML and web page structure',
                section_number: 1,
                lessons: [
                    {
                        title: 'What is HTML?',
                        description: 'Understanding HTML and its role in web development',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-intro-1',
                                    title: 'What is HTML?',
                                    description: 'HTML stands for Hyper Text Markup Language',
                                    code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First HTML Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n    <p>This is my first HTML page.</p>\n</body>\n</html>',
                                    explanation: 'HTML is the standard markup language for creating web pages. It describes the structure of web pages using markup.'
                                }
                            ],
                            steps: [
                                'HTML stands for Hyper Text Markup Language',
                                'HTML is the standard markup language for creating Web pages',
                                'HTML describes the structure of Web pages using markup',
                                'HTML elements are the building blocks of HTML pages',
                                'HTML elements are represented by tags'
                            ],
                            exercise: {
                                description: 'Create your first HTML page with a title and a paragraph.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Your Title Here</title>\n</head>\n<body>\n    <!-- Add your content here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Welcome to My Website</h1>\n    <p>This is my first HTML page. I am learning web development!</p>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Editors',
                        description: 'Learn about HTML editors and how to write HTML',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-editors-1',
                                    title: 'Using Text Editors',
                                    description: 'Popular HTML editors for writing code',
                                    code: '<!-- You can use any text editor to write HTML -->\n<!-- Popular editors include: -->\n<!-- - Visual Studio Code -->\n<!-- - Sublime Text -->\n<!-- - Atom -->\n<!-- - Notepad++ -->\n<!-- - Brackets -->\n\n<!DOCTYPE html>\n<html>\n<head>\n    <title>HTML Editor Example</title>\n</head>\n<body>\n    <h1>Written in VS Code</h1>\n    <p>This HTML was written using Visual Studio Code.</p>\n</body>\n</html>',
                                    explanation: 'You can use any text editor to write HTML. Popular choices include VS Code, Sublime Text, and Atom.'
                                }
                            ],
                            steps: [
                                'Choose a text editor (VS Code, Sublime Text, Atom, etc.)',
                                'Create a new file with .html extension',
                                'Write your HTML code',
                                'Save the file',
                                'Open the file in a web browser to see the result'
                            ]
                        }
                    },
                    {
                        title: 'HTML Basic Structure',
                        description: 'Understanding the basic structure of HTML documents',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.html
                    }
                ]
            },
            {
                title: 'HTML Elements',
                description: 'Learn about HTML elements, tags, and attributes',
                section_number: 2,
                lessons: [
                    {
                        title: 'HTML Elements',
                        description: 'Understanding HTML elements and how they work',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-elements-1',
                                    title: 'HTML Element Structure',
                                    description: 'How HTML elements are structured',
                                    code: '<tagname>Content goes here...</tagname>\n\n<!-- Examples -->\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n<a href="https://www.w3schools.com">This is a link</a>\n<img src="image.jpg" alt="My Image">',
                                    explanation: 'HTML elements are defined by a start tag, some content, and an end tag. Some elements are self-closing.'
                                },
                                {
                                    id: 'html-elements-2',
                                    title: 'Nested HTML Elements',
                                    description: 'HTML elements can be nested inside other elements',
                                    code: '<html>\n<body>\n    <h1>My First Heading</h1>\n    <p>My first paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>\n    <div>\n        <h2>Nested Heading</h2>\n        <p>This paragraph is inside a div element.</p>\n    </div>\n</body>\n</html>',
                                    explanation: 'HTML elements can be nested inside other elements. This creates a hierarchical structure.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with nested elements including headings, paragraphs, and text formatting.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Nested Elements</title>\n</head>\n<body>\n    <!-- Add nested elements here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Nested Elements</title>\n</head>\n<body>\n    <h1>Main Heading</h1>\n    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>\n    <div>\n        <h2>Section Heading</h2>\n        <p>This paragraph is <mark>highlighted</mark> and contains a <a href="#">link</a>.</p>\n    </div>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Attributes',
                        description: 'Learn about HTML attributes and how to use them',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-attributes-1',
                                    title: 'Basic Attributes',
                                    description: 'Common HTML attributes',
                                    code: '<!-- href attribute for links -->\n<a href="https://www.w3schools.com">Visit W3Schools</a>\n\n<!-- src and alt attributes for images -->\n<img src="image.jpg" alt="A beautiful landscape">\n\n<!-- class attribute for styling -->\n<p class="highlight">This paragraph has a class attribute</p>\n\n<!-- id attribute for unique identification -->\n<div id="main-content">This div has an ID</div>\n\n<!-- title attribute for tooltips -->\n<p title="This is a tooltip">Hover over this text</p>',
                                    explanation: 'Attributes provide additional information about HTML elements. They are always specified in the start tag.'
                                },
                                {
                                    id: 'html-attributes-2',
                                    title: 'Multiple Attributes',
                                    description: 'Elements can have multiple attributes',
                                    code: '<a href="https://www.w3schools.com" target="_blank" title="Visit W3Schools in new tab">\n    Open W3Schools in new tab\n</a>\n\n<img src="photo.jpg" alt="My Photo" width="300" height="200" class="profile-image">\n\n<input type="text" name="username" placeholder="Enter your username" required>',
                                    explanation: 'HTML elements can have multiple attributes. Each attribute provides different information about the element.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with various elements that use different attributes.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Attributes Example</title>\n</head>\n<body>\n    <!-- Add elements with attributes here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Attributes Example</title>\n</head>\n<body>\n    <h1 id="main-title">Welcome to My Website</h1>\n    <p class="intro" title="Introduction paragraph">This is an introduction paragraph.</p>\n    <a href="https://www.w3schools.com" target="_blank" title="Visit W3Schools">Learn HTML at W3Schools</a>\n    <img src="https://via.placeholder.com/300x200" alt="Sample Image" width="300" height="200">\n    <input type="email" name="email" placeholder="Enter your email" required>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Headings',
                        description: 'Learn about HTML heading elements (h1-h6)',
                        lesson_number: 3,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-headings-1',
                                    title: 'Heading Elements',
                                    description: 'HTML provides six levels of headings',
                                    code: '<h1>Heading 1 - Most Important</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6 - Least Important</h6>',
                                    explanation: 'HTML headings are defined with h1 to h6 tags. h1 defines the most important heading, h6 defines the least important heading.'
                                },
                                {
                                    id: 'html-headings-2',
                                    title: 'Heading Structure',
                                    description: 'Proper heading hierarchy for web pages',
                                    code: '<h1>Main Title of the Page</h1>\n<p>Introduction paragraph...</p>\n\n<h2>Section 1</h2>\n<p>Content for section 1...</p>\n\n<h3>Subsection 1.1</h3>\n<p>Content for subsection 1.1...</p>\n\n<h3>Subsection 1.2</h3>\n<p>Content for subsection 1.2...</p>\n\n<h2>Section 2</h2>\n<p>Content for section 2...</p>',
                                    explanation: 'Use headings to create a logical structure for your content. Don\'t skip heading levels.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with proper heading hierarchy for an article about your favorite hobby.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Favorite Hobby</title>\n</head>\n<body>\n    <!-- Add proper heading structure here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Favorite Hobby</title>\n</head>\n<body>\n    <h1>Photography: My Passion</h1>\n    <p>Photography has been my favorite hobby for many years...</p>\n    \n    <h2>Getting Started</h2>\n    <p>When I first started photography...</p>\n    \n    <h3>Choosing a Camera</h3>\n    <p>My first camera was...</p>\n    \n    <h3>Learning the Basics</h3>\n    <p>I learned about composition...</p>\n    \n    <h2>My Favorite Subjects</h2>\n    <p>I love photographing...</p>\n    \n    <h2>Tips for Beginners</h2>\n    <p>If you want to start photography...</p>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Paragraphs',
                        description: 'Learn about HTML paragraph elements and text formatting',
                        lesson_number: 4,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-paragraphs-1',
                                    title: 'Basic Paragraphs',
                                    description: 'Creating paragraphs with the p element',
                                    code: '<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>\n<p>This is a third paragraph.</p>',
                                    explanation: 'The p element defines a paragraph. Browsers automatically add some space before and after each paragraph.'
                                },
                                {
                                    id: 'html-paragraphs-2',
                                    title: 'Text Formatting',
                                    description: 'Formatting text within paragraphs',
                                    code: '<p>This is normal text.</p>\n<p><b>This text is bold.</b></p>\n<p><strong>This text is strong (semantic bold).</strong></p>\n<p><i>This text is italic.</i></p>\n<p><em>This text is emphasized (semantic italic).</em></p>\n<p><small>This text is small.</small></p>\n<p><mark>This text is highlighted.</mark></p>\n<p><del>This text is deleted.</del></p>\n<p><ins>This text is inserted.</ins></p>\n<p>This is <sub>subscript</sub> and <sup>superscript</sup> text.</p>',
                                    explanation: 'HTML provides various elements for formatting text. Use semantic elements like strong and em when possible.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with multiple paragraphs and various text formatting elements.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Text Formatting</title>\n</head>\n<body>\n    <!-- Add paragraphs with formatting here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Text Formatting</title>\n</head>\n<body>\n    <h1>Text Formatting Examples</h1>\n    \n    <p>This is a normal paragraph with regular text.</p>\n    \n    <p>This paragraph contains <strong>bold text</strong> and <em>italic text</em>.</p>\n    \n    <p>Here we have <mark>highlighted text</mark> and <small>small text</small>.</p>\n    \n    <p>This shows <del>deleted text</del> and <ins>inserted text</ins>.</p>\n    \n    <p>Mathematical expressions: H<sub>2</sub>O and E=mc<sup>2</sup>.</p>\n</body>\n</html>'
                            }
                        }
                    }
                ]
            },
            {
                title: 'HTML Links and Images',
                description: 'Learn how to create links and add images to your web pages',
                section_number: 3,
                lessons: [
                    {
                        title: 'HTML Links',
                        description: 'Creating hyperlinks to connect web pages',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-links-1',
                                    title: 'Basic Links',
                                    description: 'Creating links with the a element',
                                    code: '<a href="https://www.w3schools.com">Visit W3Schools</a>\n\n<!-- Link to another page on the same site -->\n<a href="about.html">About Us</a>\n\n<!-- Link to an email address -->\n<a href="mailto:someone@example.com">Send Email</a>\n\n<!-- Link to a phone number -->\n<a href="tel:+1234567890">Call Us</a>',
                                    explanation: 'Links are created using the a element with the href attribute. The href attribute specifies the destination of the link.'
                                },
                                {
                                    id: 'html-links-2',
                                    title: 'Link Attributes',
                                    description: 'Using link attributes for better user experience',
                                    code: '<!-- Open link in new tab -->\n<a href="https://www.w3schools.com" target="_blank">Visit W3Schools (New Tab)</a>\n\n<!-- Link with title attribute for tooltip -->\n<a href="https://www.w3schools.com" title="Learn web development">W3Schools</a>\n\n<!-- Link to a specific section on the same page -->\n<a href="#section1">Go to Section 1</a>\n\n<!-- Internal link to a section -->\n<h2 id="section1">Section 1</h2>',
                                    explanation: 'Use target="_blank" to open links in new tabs, title for tooltips, and id attributes for internal page navigation.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with various types of links including external links, internal links, and email links.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Links Example</title>\n</head>\n<body>\n    <!-- Add various types of links here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Links Example</title>\n</head>\n<body>\n    <h1>My Favorite Websites</h1>\n    \n    <p>Here are some of my favorite websites:</p>\n    \n    <ul>\n        <li><a href="https://www.w3schools.com" target="_blank" title="Learn web development">W3Schools</a></li>\n        <li><a href="https://www.github.com" target="_blank" title="Code repository">GitHub</a></li>\n        <li><a href="https://www.stackoverflow.com" target="_blank" title="Programming Q&A">Stack Overflow</a></li>\n    </ul>\n    \n    <p>You can <a href="mailto:contact@example.com">contact me</a> or <a href="tel:+1234567890">call me</a>.</p>\n    \n    <h2 id="about">About This Page</h2>\n    <p>This page demonstrates different types of links.</p>\n    \n    <p><a href="#about">Jump to About Section</a></p>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Images',
                        description: 'Adding images to your web pages',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-images-1',
                                    title: 'Basic Images',
                                    description: 'Adding images with the img element',
                                    code: '<!-- Basic image -->\n<img src="image.jpg" alt="Description of the image">\n\n<!-- Image with width and height -->\n<img src="photo.png" alt="My Photo" width="300" height="200">\n\n<!-- Image from external source -->\n<img src="https://via.placeholder.com/300x200" alt="Placeholder Image">',
                                    explanation: 'Images are added using the img element. The src attribute specifies the image source, and alt provides alternative text for accessibility.'
                                },
                                {
                                    id: 'html-images-2',
                                    title: 'Image Attributes',
                                    description: 'Using image attributes for better control',
                                    code: '<!-- Image with all common attributes -->\n<img src="landscape.jpg" \n     alt="Beautiful mountain landscape" \n     width="500" \n     height="300" \n     title="Click to enlarge" \n     loading="lazy">\n\n<!-- Responsive image -->\n<img src="responsive.jpg" \n     alt="Responsive image" \n     style="max-width: 100%; height: auto;">',
                                    explanation: 'Use width and height for layout stability, title for tooltips, and loading="lazy" for performance optimization.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with multiple images using different attributes and make them responsive.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Images Example</title>\n</head>\n<body>\n    <!-- Add images with different attributes here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Images Example</title>\n</head>\n<body>\n    <h1>My Photo Gallery</h1>\n    \n    <h2>Nature Photos</h2>\n    <img src="https://via.placeholder.com/400x300/4CAF50/white?text=Forest" \n         alt="Beautiful forest landscape" \n         width="400" \n         height="300" \n         title="Forest Landscape">\n    \n    <img src="https://via.placeholder.com/400x300/2196F3/white?text=Ocean" \n         alt="Ocean waves" \n         width="400" \n         height="300" \n         title="Ocean View">\n    \n    <h2>City Photos</h2>\n    <img src="https://via.placeholder.com/400x300/FF9800/white?text=City" \n         alt="City skyline" \n         style="max-width: 100%; height: auto;" \n         title="City Skyline">\n    \n    <p>All images are optimized for web display.</p>\n</body>\n</html>'
                            }
                        }
                    }
                ]
            },
            {
                title: 'HTML Lists and Tables',
                description: 'Learn how to create lists and tables in HTML',
                section_number: 4,
                lessons: [
                    {
                        title: 'HTML Lists',
                        description: 'Creating ordered and unordered lists',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-lists-1',
                                    title: 'Unordered Lists',
                                    description: 'Creating bullet point lists',
                                    code: '<ul>\n    <li>Coffee</li>\n    <li>Tea</li>\n    <li>Milk</li>\n</ul>\n\n<!-- Nested list -->\n<ul>\n    <li>Fruits\n        <ul>\n            <li>Apple</li>\n            <li>Banana</li>\n            <li>Orange</li>\n        </ul>\n    </li>\n    <li>Vegetables\n        <ul>\n            <li>Carrot</li>\n            <li>Broccoli</li>\n        </ul>\n    </li>\n</ul>',
                                    explanation: 'Unordered lists are created with ul and li elements. Lists can be nested inside other lists.'
                                },
                                {
                                    id: 'html-lists-2',
                                    title: 'Ordered Lists',
                                    description: 'Creating numbered lists',
                                    code: '<ol>\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n</ol>\n\n<!-- Ordered list with different numbering -->\n<ol type="A">\n    <li>Item A</li>\n    <li>Item B</li>\n    <li>Item C</li>\n</ol>\n\n<!-- Ordered list starting from specific number -->\n<ol start="10">\n    <li>Tenth item</li>\n    <li>Eleventh item</li>\n</ol>',
                                    explanation: 'Ordered lists are created with ol and li elements. You can change the numbering type and starting number.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML page with both ordered and unordered lists, including nested lists.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Lists Example</title>\n</head>\n<body>\n    <!-- Add ordered and unordered lists here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Lists Example</title>\n</head>\n<body>\n    <h1>My Shopping Lists</h1>\n    \n    <h2>Grocery List (Unordered)</h2>\n    <ul>\n        <li>Fruits\n            <ul>\n                <li>Apples</li>\n                <li>Bananas</li>\n                <li>Oranges</li>\n            </ul>\n        </li>\n        <li>Vegetables\n            <ul>\n                <li>Carrots</li>\n                <li>Broccoli</li>\n                <li>Spinach</li>\n            </ul>\n        </li>\n        <li>Dairy\n            <ul>\n                <li>Milk</li>\n                <li>Cheese</li>\n                <li>Yogurt</li>\n            </ul>\n        </li>\n    </ul>\n    \n    <h2>Recipe Steps (Ordered)</h2>\n    <ol>\n        <li>Preheat the oven to 350°F</li>\n        <li>Mix the dry ingredients</li>\n        <li>Add the wet ingredients</li>\n        <li>Pour into baking pan</li>\n        <li>Bake for 30 minutes</li>\n        <li>Let cool before serving</li>\n    </ol>\n</body>\n</html>'
                            }
                        }
                    },
                    {
                        title: 'HTML Tables',
                        description: 'Creating tables to display data in rows and columns',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-tables-1',
                                    title: 'Basic Table',
                                    description: 'Creating a simple table',
                                    code: '<table>\n    <tr>\n        <th>Name</th>\n        <th>Age</th>\n        <th>City</th>\n    </tr>\n    <tr>\n        <td>John</td>\n        <td>25</td>\n        <td>New York</td>\n    </tr>\n    <tr>\n        <td>Jane</td>\n        <td>30</td>\n        <td>Los Angeles</td>\n    </tr>\n</table>',
                                    explanation: 'Tables are created with table, tr (table row), th (table header), and td (table data) elements.'
                                },
                                {
                                    id: 'html-tables-2',
                                    title: 'Advanced Table',
                                    description: 'Table with caption, headers, and styling',
                                    code: '<table border="1">\n    <caption>Student Grades</caption>\n    <thead>\n        <tr>\n            <th>Student</th>\n            <th>Math</th>\n            <th>Science</th>\n            <th>English</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>Alice</td>\n            <td>95</td>\n            <td>87</td>\n            <td>92</td>\n        </tr>\n        <tr>\n            <td>Bob</td>\n            <td>78</td>\n            <td>91</td>\n            <td>85</td>\n        </tr>\n    </tbody>\n    <tfoot>\n        <tr>\n            <td>Average</td>\n            <td>86.5</td>\n            <td>89</td>\n            <td>88.5</td>\n        </tr>\n    </tfoot>\n</table>',
                                    explanation: 'Use thead, tbody, and tfoot for better table structure. Caption provides a title for the table.'
                                }
                            ],
                            exercise: {
                                description: 'Create an HTML table displaying information about your favorite movies or books.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Table Example</title>\n</head>\n<body>\n    <!-- Add a table here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Table Example</title>\n</head>\n<body>\n    <h1>My Favorite Movies</h1>\n    \n    <table border="1" style="border-collapse: collapse; width: 100%;">\n        <caption>Top 5 Favorite Movies</caption>\n        <thead>\n            <tr style="background-color: #f2f2f2;">\n                <th>Title</th>\n                <th>Year</th>\n                <th>Genre</th>\n                <th>Rating</th>\n                <th>Director</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>The Matrix</td>\n                <td>1999</td>\n                <td>Sci-Fi</td>\n                <td>8.7</td>\n                <td>Lana Wachowski</td>\n            </tr>\n            <tr>\n                <td>Inception</td>\n                <td>2010</td>\n                <td>Sci-Fi</td>\n                <td>8.8</td>\n                <td>Christopher Nolan</td>\n            </tr>\n            <tr>\n                <td>Interstellar</td>\n                <td>2014</td>\n                <td>Sci-Fi</td>\n                <td>8.6</td>\n                <td>Christopher Nolan</td>\n            </tr>\n            <tr>\n                <td>The Dark Knight</td>\n                <td>2008</td>\n                <td>Action</td>\n                <td>9.0</td>\n                <td>Christopher Nolan</td>\n            </tr>\n            <tr>\n                <td>Pulp Fiction</td>\n                <td>1994</td>\n                <td>Crime</td>\n                <td>8.9</td>\n                <td>Quentin Tarantino</td>\n            </tr>\n        </tbody>\n    </table>\n</body>\n</html>'
                            }
                        }
                    }
                ]
            },
            {
                title: 'HTML Forms',
                description: 'Learn how to create forms for user input',
                section_number: 5,
                lessons: [
                    {
                        title: 'HTML Form Elements',
                        description: 'Creating forms with various input types',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-forms-1',
                                    title: 'Basic Form',
                                    description: 'Creating a simple contact form',
                                    code: '<form action="/submit" method="POST">\n    <label for="name">Name:</label>\n    <input type="text" id="name" name="name" required>\n    \n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n    \n    <label for="message">Message:</label>\n    <textarea id="message" name="message" rows="4" required></textarea>\n    \n    <button type="submit">Submit</button>\n</form>',
                                    explanation: 'Forms are created with the form element. Use label elements to associate labels with form controls for better accessibility.'
                                },
                                {
                                    id: 'html-forms-2',
                                    title: 'Form Input Types',
                                    description: 'Different types of form inputs',
                                    code: '<form>\n    <!-- Text input -->\n    <input type="text" placeholder="Enter your name">\n    \n    <!-- Email input -->\n    <input type="email" placeholder="Enter your email">\n    \n    <!-- Password input -->\n    <input type="password" placeholder="Enter your password">\n    \n    <!-- Number input -->\n    <input type="number" min="1" max="100" placeholder="Enter age">\n    \n    <!-- Date input -->\n    <input type="date">\n    \n    <!-- Checkbox -->\n    <input type="checkbox" id="newsletter">\n    <label for="newsletter">Subscribe to newsletter</label>\n    \n    <!-- Radio buttons -->\n    <input type="radio" id="male" name="gender" value="male">\n    <label for="male">Male</label>\n    <input type="radio" id="female" name="gender" value="female">\n    <label for="female">Female</label>\n    \n    <!-- Select dropdown -->\n    <select name="country">\n        <option value="">Select a country</option>\n        <option value="us">United States</option>\n        <option value="uk">United Kingdom</option>\n        <option value="ca">Canada</option>\n    </select>\n</form>',
                                    explanation: 'HTML provides many input types for different kinds of data. Use appropriate input types for better user experience and validation.'
                                }
                            ],
                            exercise: {
                                description: 'Create a comprehensive registration form with various input types and proper labels.',
                                starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Registration Form</title>\n</head>\n<body>\n    <!-- Create a registration form here -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Registration Form</title>\n</head>\n<body>\n    <h1>User Registration</h1>\n    \n    <form action="/register" method="POST">\n        <fieldset>\n            <legend>Personal Information</legend>\n            \n            <label for="firstName">First Name:</label>\n            <input type="text" id="firstName" name="firstName" required>\n            \n            <label for="lastName">Last Name:</label>\n            <input type="text" id="lastName" name="lastName" required>\n            \n            <label for="email">Email:</label>\n            <input type="email" id="email" name="email" required>\n            \n            <label for="password">Password:</label>\n            <input type="password" id="password" name="password" required>\n            \n            <label for="birthDate">Birth Date:</label>\n            <input type="date" id="birthDate" name="birthDate">\n        </fieldset>\n        \n        <fieldset>\n            <legend>Preferences</legend>\n            \n            <label for="country">Country:</label>\n            <select id="country" name="country" required>\n                <option value="">Select a country</option>\n                <option value="us">United States</option>\n                <option value="uk">United Kingdom</option>\n                <option value="ca">Canada</option>\n                <option value="au">Australia</option>\n            </select>\n            \n            <fieldset>\n                <legend>Gender:</legend>\n                <input type="radio" id="male" name="gender" value="male">\n                <label for="male">Male</label>\n                \n                <input type="radio" id="female" name="gender" value="female">\n                <label for="female">Female</label>\n                \n                <input type="radio" id="other" name="gender" value="other">\n                <label for="other">Other</label>\n            </fieldset>\n            \n            <input type="checkbox" id="newsletter" name="newsletter">\n            <label for="newsletter">Subscribe to newsletter</label>\n            \n            <input type="checkbox" id="terms" name="terms" required>\n            <label for="terms">I agree to the terms and conditions</label>\n        </fieldset>\n        \n        <button type="submit">Register</button>\n        <button type="reset">Reset</button>\n    </form>\n</body>\n</html>'
                            }
                        }
                    }
                ]
            }
        ]
    },
    css: {
        sections: [
            {
                title: 'CSS Introduction',
                description: 'Learn the basics of CSS and how it works with HTML',
                section_number: 1,
                lessons: [
                    {
                        title: 'What is CSS?',
                        description: 'Understanding CSS and its role in web design',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-intro-1',
                                    title: 'What is CSS?',
                                    description: 'CSS stands for Cascading Style Sheets',
                                    code: '/* CSS stands for Cascading Style Sheets */\n/* CSS describes how HTML elements are to be displayed */\n\nh1 {\n    color: blue;\n    font-size: 24px;\n}\n\np {\n    color: red;\n    font-family: Arial, sans-serif;\n}',
                                    explanation: 'CSS is a language that describes the style of an HTML document. CSS describes how HTML elements should be displayed.'
                                },
                                {
                                    id: 'css-intro-2',
                                    title: 'CSS Syntax',
                                    description: 'Understanding CSS syntax and structure',
                                    code: 'selector {\n    property: value;\n}\n\n/* Example */\nh1 {\n    color: blue;\n    font-size: 24px;\n    text-align: center;\n}\n\np {\n    color: #333;\n    line-height: 1.6;\n    margin: 10px 0;\n}',
                                    explanation: 'CSS rule consists of a selector and a declaration block. The declaration block contains one or more declarations separated by semicolons.'
                                }
                            ],
                            steps: [
                                'CSS stands for Cascading Style Sheets',
                                'CSS describes how HTML elements are to be displayed on screen, paper, or in other media',
                                'CSS saves a lot of work. It can control the layout of multiple web pages all at once',
                                'External stylesheets are stored in CSS files',
                                'CSS can be added to HTML in three ways: inline, internal, and external'
                            ],
                            exercise: {
                                description: 'Create a simple CSS file that styles a basic HTML page with different colors and fonts.',
                                starterCode: '/* Write your CSS here */\nh1 {\n    /* Style the heading */\n}\n\np {\n    /* Style the paragraphs */\n}',
                                solution: 'h1 {\n    color: #2c3e50;\n    font-family: Arial, sans-serif;\n    font-size: 32px;\n    text-align: center;\n}\n\np {\n    color: #34495e;\n    font-family: Georgia, serif;\n    font-size: 16px;\n    line-height: 1.6;\n    margin: 15px 0;\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Syntax and Selectors',
                        description: 'Learn CSS syntax and how to select HTML elements',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-selectors-1',
                                    title: 'Basic Selectors',
                                    description: 'Element, class, and ID selectors',
                                    code: '/* Element selector */\np {\n    color: blue;\n}\n\n/* Class selector */\n.highlight {\n    background-color: yellow;\n}\n\n/* ID selector */\n#main-title {\n    font-size: 48px;\n}\n\n/* Multiple selectors */\nh1, h2, h3 {\n    font-family: Arial, sans-serif;\n}',
                                    explanation: 'Element selectors target HTML elements, class selectors target elements with specific class, and ID selectors target elements with specific ID.'
                                },
                                {
                                    id: 'css-selectors-2',
                                    title: 'Advanced Selectors',
                                    description: 'Descendant, child, and attribute selectors',
                                    code: '/* Descendant selector */\ndiv p {\n    color: red;\n}\n\n/* Child selector */\ndiv > p {\n    font-weight: bold;\n}\n\n/* Attribute selector */\ninput[type="text"] {\n    border: 1px solid #ccc;\n}\n\n/* Pseudo-class selector */\na:hover {\n    color: red;\n}\n\n/* Pseudo-element selector */\np::first-line {\n    font-weight: bold;\n}',
                                    explanation: 'Advanced selectors allow you to target elements based on their relationship to other elements or their attributes.'
                                }
                            ],
                            exercise: {
                                description: 'Create CSS rules using different types of selectors to style various HTML elements.',
                                starterCode: '/* Use different selectors to style the HTML */\n/* Element selector */\n\n/* Class selector */\n\n/* ID selector */\n\n/* Descendant selector */\n\n/* Attribute selector */',
                                solution: '/* Element selector */\nh1 {\n    color: #2c3e50;\n    font-size: 32px;\n}\n\n/* Class selector */\n.highlight {\n    background-color: #f39c12;\n    padding: 5px;\n}\n\n/* ID selector */\n#main-content {\n    max-width: 800px;\n    margin: 0 auto;\n}\n\n/* Descendant selector */\ndiv p {\n    line-height: 1.6;\n}\n\n/* Attribute selector */\ninput[type="email"] {\n    border: 2px solid #3498db;\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Colors and Backgrounds',
                        description: 'Learn how to use colors and backgrounds in CSS',
                        lesson_number: 3,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-colors-1',
                                    title: 'CSS Colors',
                                    description: 'Different ways to specify colors in CSS',
                                    code: '/* Named colors */\nh1 {\n    color: red;\n}\n\n/* Hexadecimal colors */\np {\n    color: #ff0000;\n}\n\n/* RGB colors */\ndiv {\n    color: rgb(255, 0, 0);\n}\n\n/* RGBA colors (with transparency) */\nspan {\n    color: rgba(255, 0, 0, 0.5);\n}\n\n/* HSL colors */\n.highlight {\n    color: hsl(0, 100%, 50%);\n}',
                                    explanation: 'CSS supports various color formats: named colors, hexadecimal, RGB, RGBA, and HSL. RGBA and HSL support transparency.'
                                },
                                {
                                    id: 'css-backgrounds-1',
                                    title: 'CSS Backgrounds',
                                    description: 'Setting background colors and images',
                                    code: '/* Background color */\nbody {\n    background-color: #f4f4f4;\n}\n\n/* Background image */\n.hero {\n    background-image: url("hero-image.jpg");\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\n/* Multiple background properties */\n.card {\n    background: #fff url("pattern.png") no-repeat top right;\n    background-size: 50px 50px;\n}',
                                    explanation: 'Background properties allow you to set colors, images, and control how they are displayed.'
                                }
                            ],
                            exercise: {
                                description: 'Create a colorful webpage with different background colors and images.',
                                starterCode: '/* Style the page with colors and backgrounds */\nbody {\n    /* Set background color */\n}\n\n.header {\n    /* Set background image */\n}\n\n.content {\n    /* Set background color */\n}',
                                solution: 'body {\n    background-color: #f8f9fa;\n    color: #333;\n}\n\n.header {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    padding: 20px;\n    text-align: center;\n}\n\n.content {\n    background-color: white;\n    padding: 20px;\n    margin: 20px;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}'
                            }
                        }
                    }
                ]
            },
            {
                title: 'CSS Text and Fonts',
                description: 'Learn how to style text and work with fonts',
                section_number: 2,
                lessons: [
                    {
                        title: 'CSS Text Properties',
                        description: 'Controlling text appearance and formatting',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-text-1',
                                    title: 'Text Properties',
                                    description: 'Basic text styling properties',
                                    code: 'h1 {\n    text-align: center;\n    text-decoration: underline;\n    text-transform: uppercase;\n    letter-spacing: 2px;\n    word-spacing: 5px;\n}\n\np {\n    text-align: justify;\n    text-indent: 30px;\n    line-height: 1.8;\n    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}',
                                    explanation: 'Text properties control alignment, decoration, spacing, and visual effects of text.'
                                },
                                {
                                    id: 'css-text-2',
                                    title: 'Text Overflow and White Space',
                                    description: 'Handling text overflow and white space',
                                    code: '.truncate {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    width: 200px;\n}\n\n.preformatted {\n    white-space: pre;\n    font-family: monospace;\n}\n\n.word-wrap {\n    word-wrap: break-word;\n    word-break: break-all;\n}',
                                    explanation: 'White-space and overflow properties help control how text behaves when it exceeds container boundaries.'
                                }
                            ],
                            exercise: {
                                description: 'Create a webpage with various text styling effects including shadows, spacing, and alignment.',
                                starterCode: '/* Style text with various properties */\n.title {\n    /* Add text styling */\n}\n\n.subtitle {\n    /* Add different text styling */\n}\n\n.paragraph {\n    /* Add paragraph styling */\n}',
                                solution: '.title {\n    text-align: center;\n    text-transform: uppercase;\n    letter-spacing: 3px;\n    text-shadow: 3px 3px 6px rgba(0,0,0,0.3);\n    font-size: 36px;\n    color: #2c3e50;\n}\n\n.subtitle {\n    text-align: left;\n    text-decoration: underline;\n    text-decoration-color: #e74c3c;\n    font-size: 24px;\n    color: #34495e;\n}\n\n.paragraph {\n    text-align: justify;\n    text-indent: 20px;\n    line-height: 1.6;\n    word-spacing: 2px;\n    font-size: 16px;\n    color: #555;\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Fonts',
                        description: 'Working with fonts and typography',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-fonts-1',
                                    title: 'Font Properties',
                                    description: 'Basic font styling properties',
                                    code: 'h1 {\n    font-family: Arial, sans-serif;\n    font-size: 32px;\n    font-weight: bold;\n    font-style: italic;\n    font-variant: small-caps;\n}\n\np {\n    font: 16px/1.6 "Times New Roman", serif;\n}\n\n.highlight {\n    font-size: 1.2em;\n    font-weight: 600;\n}',
                                    explanation: 'Font properties control the appearance of text including family, size, weight, and style.'
                                },
                                {
                                    id: 'css-fonts-2',
                                    title: 'Google Fonts',
                                    description: 'Using web fonts from Google Fonts',
                                    code: '/* Import Google Fonts */\n@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");\n\n/* Use the imported font */\nbody {\n    font-family: "Roboto", sans-serif;\n}\n\n.heading {\n    font-family: "Roboto", sans-serif;\n    font-weight: 700;\n    font-size: 2.5rem;\n}',
                                    explanation: 'Google Fonts provides a wide variety of web fonts that can be easily imported and used in your CSS.'
                                }
                            ],
                            exercise: {
                                description: 'Create a webpage using Google Fonts with different font weights and styles.',
                                starterCode: '/* Import and use Google Fonts */\n@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap");\n\n/* Style different elements with the imported font */\nbody {\n    /* Set base font */\n}\n\nh1 {\n    /* Style heading */\n}\n\np {\n    /* Style paragraphs */\n}',
                                solution: '@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap");\n\nbody {\n    font-family: "Open Sans", sans-serif;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 1.6;\n}\n\nh1 {\n    font-family: "Open Sans", sans-serif;\n    font-weight: 700;\n    font-size: 2.5rem;\n    margin-bottom: 1rem;\n}\n\np {\n    font-family: "Open Sans", sans-serif;\n    font-weight: 400;\n    font-size: 1rem;\n    margin-bottom: 1rem;\n}'
                            }
                        }
                    }
                ]
            },
            {
                title: 'CSS Box Model',
                description: 'Understanding the CSS box model and spacing',
                section_number: 3,
                lessons: [
                    {
                        title: 'CSS Box Model',
                        description: 'Understanding margin, border, padding, and content',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-boxmodel-1',
                                    title: 'Box Model Properties',
                                    description: 'Margin, border, padding, and content',
                                    code: '.box {\n    /* Content */\n    width: 200px;\n    height: 100px;\n    \n    /* Padding - space inside the element */\n    padding: 20px;\n    \n    /* Border - line around the element */\n    border: 2px solid #333;\n    \n    /* Margin - space outside the element */\n    margin: 30px;\n    \n    background-color: #f0f0f0;\n}',
                                    explanation: 'The CSS box model consists of content, padding, border, and margin. Padding is inside the element, margin is outside.'
                                },
                                {
                                    id: 'css-boxmodel-2',
                                    title: 'Box Sizing',
                                    description: 'Controlling how width and height are calculated',
                                    code: '/* Default box-sizing */\n.default-box {\n    width: 200px;\n    padding: 20px;\n    border: 2px solid #333;\n    /* Total width = 200px + 40px (padding) + 4px (border) = 244px */\n}\n\n/* Border-box sizing */\n.border-box {\n    box-sizing: border-box;\n    width: 200px;\n    padding: 20px;\n    border: 2px solid #333;\n    /* Total width = 200px (includes padding and border) */\n}',
                                    explanation: 'box-sizing: border-box makes the width and height include padding and border, making layout calculations easier.'
                                }
                            ],
                            exercise: {
                                description: 'Create a layout with different boxes demonstrating the box model properties.',
                                starterCode: '/* Create boxes with different box model properties */\n.box1 {\n    /* Add margin, padding, border */\n}\n\n.box2 {\n    /* Add different margin, padding, border */\n}\n\n.box3 {\n    /* Use border-box sizing */\n}',
                                solution: '.box1 {\n    width: 200px;\n    height: 100px;\n    padding: 15px;\n    border: 3px solid #e74c3c;\n    margin: 20px;\n    background-color: #ecf0f1;\n}\n\n.box2 {\n    width: 200px;\n    height: 100px;\n    padding: 25px;\n    border: 1px dashed #3498db;\n    margin: 10px;\n    background-color: #d5dbdb;\n}\n\n.box3 {\n    box-sizing: border-box;\n    width: 200px;\n    height: 100px;\n    padding: 20px;\n    border: 5px solid #27ae60;\n    margin: 15px;\n    background-color: #d5f4e6;\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Margins and Padding',
                        description: 'Controlling spacing around and inside elements',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-spacing-1',
                                    title: 'Margin Properties',
                                    description: 'Setting margins on all sides',
                                    code: '/* Individual margins */\n.element {\n    margin-top: 10px;\n    margin-right: 20px;\n    margin-bottom: 15px;\n    margin-left: 5px;\n}\n\n/* Shorthand margin */\n.element {\n    margin: 10px 20px 15px 5px; /* top right bottom left */\n    margin: 10px 20px; /* top/bottom left/right */\n    margin: 10px; /* all sides */\n}\n\n/* Auto margins for centering */\n.centered {\n    margin: 0 auto;\n    width: 300px;\n}',
                                    explanation: 'Margins create space outside elements. Use shorthand properties for efficiency and auto margins for centering.'
                                },
                                {
                                    id: 'css-spacing-2',
                                    title: 'Padding Properties',
                                    description: 'Setting padding inside elements',
                                    code: '/* Individual padding */\n.element {\n    padding-top: 15px;\n    padding-right: 25px;\n    padding-bottom: 20px;\n    padding-left: 10px;\n}\n\n/* Shorthand padding */\n.element {\n    padding: 15px 25px 20px 10px; /* top right bottom left */\n    padding: 15px 25px; /* top/bottom left/right */\n    padding: 15px; /* all sides */\n}\n\n/* Percentage padding */\n.responsive {\n    padding: 5%;\n}',
                                    explanation: 'Padding creates space inside elements. Use shorthand properties and percentages for responsive design.'
                                }
                            ],
                            exercise: {
                                description: 'Create a card layout with proper spacing using margins and padding.',
                                starterCode: '/* Create a card with proper spacing */\n.card {\n    /* Add width, background, border */\n    /* Add padding for internal spacing */\n    /* Add margin for external spacing */\n}\n\n.card-title {\n    /* Style the title */\n}\n\n.card-content {\n    /* Style the content */\n}',
                                solution: '.card {\n    width: 300px;\n    background-color: white;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n    padding: 20px;\n    margin: 20px auto;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.card-title {\n    margin: 0 0 15px 0;\n    padding: 0;\n    font-size: 24px;\n    color: #2c3e50;\n}\n\n.card-content {\n    margin: 0;\n    padding: 0;\n    line-height: 1.6;\n    color: #555;\n}'
                            }
                        }
                    }
                ]
            },
            {
                title: 'CSS Layout',
                description: 'Learn modern CSS layout techniques',
                section_number: 4,
                lessons: [
                    {
                        title: 'CSS Flexbox',
                        description: 'Creating flexible layouts with Flexbox',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-flexbox-1',
                                    title: 'Basic Flexbox',
                                    description: 'Creating a simple flex container',
                                    code: '.flex-container {\n    display: flex;\n    flex-direction: row; /* or column */\n    justify-content: center; /* horizontal alignment */\n    align-items: center; /* vertical alignment */\n    gap: 20px;\n    height: 200px;\n    background-color: #f0f0f0;\n}\n\n.flex-item {\n    background-color: #3498db;\n    color: white;\n    padding: 20px;\n    flex: 1; /* grow to fill available space */\n}',
                                    explanation: 'Flexbox provides a flexible way to arrange items in a container. Use justify-content for horizontal alignment and align-items for vertical alignment.'
                                },
                                {
                                    id: 'css-flexbox-2',
                                    title: 'Advanced Flexbox',
                                    description: 'Flexbox with different properties',
                                    code: '.advanced-flex {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: stretch;\n    align-content: space-around;\n    height: 300px;\n}\n\n.flex-item {\n    flex: 0 1 200px; /* flex-grow flex-shrink flex-basis */\n    margin: 10px;\n    background-color: #e74c3c;\n    color: white;\n    padding: 15px;\n    text-align: center;\n}',
                                    explanation: 'Advanced flexbox properties allow for complex layouts with wrapping, different growth factors, and content alignment.'
                                }
                            ],
                            exercise: {
                                description: 'Create a responsive navigation bar and card layout using Flexbox.',
                                starterCode: '/* Create a flexbox navigation and card layout */\n.navbar {\n    /* Create horizontal navigation */\n}\n\n.nav-item {\n    /* Style navigation items */\n}\n\n.card-container {\n    /* Create flexible card layout */\n}\n\n.card {\n    /* Style individual cards */\n}',
                                solution: '.navbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 1rem 2rem;\n    background-color: #2c3e50;\n    color: white;\n}\n\n.nav-item {\n    padding: 0.5rem 1rem;\n    text-decoration: none;\n    color: white;\n    border-radius: 4px;\n    transition: background-color 0.3s;\n}\n\n.nav-item:hover {\n    background-color: #34495e;\n}\n\n.card-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 20px;\n    padding: 20px;\n    justify-content: center;\n}\n\n.card {\n    flex: 0 1 300px;\n    background-color: white;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    padding: 20px;\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Grid',
                        description: 'Creating two-dimensional layouts with CSS Grid',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-grid-1',
                                    title: 'Basic Grid Layout',
                                    description: 'Creating a simple grid',
                                    code: '.grid-container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: repeat(2, 100px);\n    gap: 20px;\n    padding: 20px;\n    background-color: #f0f0f0;\n}\n\n.grid-item {\n    background-color: #3498db;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n}',
                                    explanation: 'CSS Grid creates two-dimensional layouts. Use grid-template-columns and grid-template-rows to define the grid structure.'
                                },
                                {
                                    id: 'css-grid-2',
                                    title: 'Advanced Grid',
                                    description: 'Grid with named areas and responsive design',
                                    code: '.advanced-grid {\n    display: grid;\n    grid-template-areas:\n        "header header header"\n        "sidebar main main"\n        "footer footer footer";\n    grid-template-columns: 200px 1fr 1fr;\n    grid-template-rows: 80px 1fr 60px;\n    gap: 20px;\n    height: 100vh;\n}\n\n.header { grid-area: header; background-color: #2c3e50; }\n.sidebar { grid-area: sidebar; background-color: #34495e; }\n.main { grid-area: main; background-color: #ecf0f1; }\n.footer { grid-area: footer; background-color: #95a5a6; }',
                                    explanation: 'Named grid areas make complex layouts easier to understand and maintain. Use grid-template-areas to define layout regions.'
                                }
                            ],
                            exercise: {
                                description: 'Create a complete webpage layout using CSS Grid with header, sidebar, main content, and footer.',
                                starterCode: '/* Create a complete grid layout */\n.layout {\n    /* Define grid areas and structure */\n}\n\n.header {\n    /* Style header area */\n}\n\n.sidebar {\n    /* Style sidebar area */\n}\n\n.main {\n    /* Style main content area */\n}\n\n.footer {\n    /* Style footer area */\n}',
                                solution: '.layout {\n    display: grid;\n    grid-template-areas:\n        "header header header"\n        "sidebar main main"\n        "footer footer footer";\n    grid-template-columns: 250px 1fr 1fr;\n    grid-template-rows: 80px 1fr 60px;\n    gap: 20px;\n    min-height: 100vh;\n    padding: 20px;\n    background-color: #f8f9fa;\n}\n\n.header {\n    grid-area: header;\n    background-color: #2c3e50;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n}\n\n.sidebar {\n    grid-area: sidebar;\n    background-color: #34495e;\n    color: white;\n    padding: 20px;\n    border-radius: 8px;\n}\n\n.main {\n    grid-area: main;\n    background-color: white;\n    padding: 20px;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.footer {\n    grid-area: footer;\n    background-color: #95a5a6;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n}'
                            }
                        }
                    }
                ]
            },
            {
                title: 'CSS Responsive Design',
                description: 'Making websites work on all devices',
                section_number: 5,
                lessons: [
                    {
                        title: 'CSS Media Queries',
                        description: 'Creating responsive designs with media queries',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-media-1',
                                    title: 'Basic Media Queries',
                                    description: 'Responsive design for different screen sizes',
                                    code: '/* Mobile first approach */\n.container {\n    width: 100%;\n    padding: 10px;\n    background-color: #f0f0f0;\n}\n\n/* Tablet styles */\n@media (min-width: 768px) {\n    .container {\n        width: 750px;\n        margin: 0 auto;\n        padding: 20px;\n    }\n}\n\n/* Desktop styles */\n@media (min-width: 1024px) {\n    .container {\n        width: 1200px;\n        padding: 30px;\n    }\n    \n    .grid {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 20px;\n    }\n}',
                                    explanation: 'Media queries allow you to apply different styles based on screen size. Use mobile-first approach for better performance.'
                                },
                                {
                                    id: 'css-media-2',
                                    title: 'Advanced Media Queries',
                                    description: 'Complex responsive breakpoints',
                                    code: '/* Extra small devices (phones) */\n@media (max-width: 575.98px) {\n    .navbar {\n        flex-direction: column;\n    }\n    \n    .card {\n        width: 100%;\n        margin: 10px 0;\n    }\n}\n\n/* Small devices (tablets) */\n@media (min-width: 576px) and (max-width: 767.98px) {\n    .grid {\n        grid-template-columns: repeat(2, 1fr);\n    }\n}\n\n/* Large devices (desktops) */\n@media (min-width: 1200px) {\n    .container {\n        max-width: 1140px;\n    }\n    \n    .hero {\n        font-size: 3rem;\n    }\n}',
                                    explanation: 'Use specific breakpoints for different device categories. Consider both min-width and max-width for precise control.'
                                }
                            ],
                            exercise: {
                                description: 'Create a responsive webpage that adapts to different screen sizes using media queries.',
                                starterCode: '/* Create responsive styles */\n.container {\n    /* Mobile styles */\n}\n\n/* Tablet styles */\n@media (min-width: 768px) {\n    .container {\n        /* Tablet styles */\n    }\n}\n\n/* Desktop styles */\n@media (min-width: 1024px) {\n    .container {\n        /* Desktop styles */\n    }\n}',
                                solution: '.container {\n    width: 100%;\n    padding: 15px;\n    margin: 0 auto;\n    background-color: #f8f9fa;\n}\n\n.navbar {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    padding: 20px;\n    background-color: #2c3e50;\n    color: white;\n}\n\n.card {\n    width: 100%;\n    margin: 10px 0;\n    padding: 20px;\n    background-color: white;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Tablet styles */\n@media (min-width: 768px) {\n    .container {\n        width: 750px;\n        padding: 20px;\n    }\n    \n    .navbar {\n        flex-direction: row;\n        justify-content: space-between;\n    }\n    \n    .card-container {\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n        gap: 20px;\n    }\n}\n\n/* Desktop styles */\n@media (min-width: 1024px) {\n    .container {\n        width: 1200px;\n        padding: 30px;\n    }\n    \n    .card-container {\n        grid-template-columns: repeat(3, 1fr);\n    }\n    \n    .hero {\n        font-size: 3rem;\n        text-align: center;\n        margin: 40px 0;\n    }\n}'
                            }
                        }
                    }
                ]
            }
        ]
    },
    java: {
        sections: [
            {
                title: 'Java Fundamentals',
                description: 'Learn the basics of Java programming',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to Java',
                        description: 'Understanding Java and its features',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.java
                    },
                    {
                        title: 'Variables and Data Types',
                        description: 'Working with Java data types',
                        lesson_number: 2,
                        content: LESSON_CONTENT_TEMPLATES.java
                    },
                    {
                        title: 'Methods and Classes',
                        description: 'Creating reusable code with methods',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.java
                    }
                ]
            },
            {
                title: 'Object-Oriented Programming',
                description: 'Master OOP concepts in Java',
                section_number: 2,
                lessons: [
                    {
                        title: 'Classes and Objects',
                        description: 'Creating and using classes and objects',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'java-oop-1',
                                    title: 'Creating Classes',
                                    description: 'Defining classes and creating objects',
                                    code: 'public class Car {\n    // Instance variables\n    private String brand;\n    private String model;\n    private int year;\n    \n    // Constructor\n    public Car(String brand, String model, int year) {\n        this.brand = brand;\n        this.model = model;\n        this.year = year;\n    }\n    \n    // Methods\n    public void start() {\n        System.out.println("The " + brand + " " + model + " is starting...");\n    }\n    \n    public void displayInfo() {\n        System.out.println("Brand: " + brand + ", Model: " + model + ", Year: " + year);\n    }\n    \n    // Getters and Setters\n    public String getBrand() { return brand; }\n    public void setBrand(String brand) { this.brand = brand; }\n}',
                                    explanation: 'Classes are blueprints for objects. Encapsulation keeps data private and provides controlled access.'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Inheritance',
                        description: 'Extending classes and creating hierarchies',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'java-inheritance-1',
                                    title: 'Class Inheritance',
                                    description: 'Creating parent and child classes',
                                    code: '// Parent class\npublic class Vehicle {\n    protected String brand;\n    protected int year;\n    \n    public Vehicle(String brand, int year) {\n        this.brand = brand;\n        this.year = year;\n    }\n    \n    public void start() {\n        System.out.println("Vehicle is starting...");\n    }\n}\n\n// Child class\npublic class Car extends Vehicle {\n    private int doors;\n    \n    public Car(String brand, int year, int doors) {\n        super(brand, year); // Call parent constructor\n        this.doors = doors;\n    }\n    \n    @Override\n    public void start() {\n        System.out.println("Car engine is starting...");\n    }\n    \n    public void openTrunk() {\n        System.out.println("Trunk is opening...");\n    }\n}',
                                    explanation: 'Inheritance allows classes to inherit properties and methods from parent classes.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    typescript: {
        sections: [
            {
                title: 'TypeScript Basics',
                description: 'Learn TypeScript fundamentals',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to TypeScript',
                        description: 'What is TypeScript and why use it',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.typescript
                    },
                    {
                        title: 'Types and Interfaces',
                        description: 'Working with TypeScript types',
                        lesson_number: 2,
                        content: LESSON_CONTENT_TEMPLATES.typescript
                    },
                    {
                        title: 'Classes and Inheritance',
                        description: 'Object-oriented programming in TypeScript',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.typescript
                    }
                ]
            },
            {
                title: 'Advanced TypeScript',
                description: 'Advanced TypeScript features and patterns',
                section_number: 2,
                lessons: [
                    {
                        title: 'Generics',
                        description: 'Creating reusable code with generics',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'ts-generics-1',
                                    title: 'Generic Functions',
                                    description: 'Creating type-safe reusable functions',
                                    code: '// Generic function\nfunction identity<T>(arg: T): T {\n    return arg;\n}\n\n// Usage\nlet stringResult = identity<string>("Hello");\nlet numberResult = identity<number>(42);\n\n// Generic interface\ninterface Container<T> {\n    value: T;\n    getValue(): T;\n    setValue(value: T): void;\n}\n\n// Generic class\nclass Box<T> implements Container<T> {\n    private _value: T;\n    \n    constructor(value: T) {\n        this._value = value;\n    }\n    \n    getValue(): T {\n        return this._value;\n    }\n    \n    setValue(value: T): void {\n        this._value = value;\n    }\n}',
                                    explanation: 'Generics allow you to create reusable components that work with different types.'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Advanced Types',
                        description: 'Union types, intersection types, and more',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'ts-advanced-types-1',
                                    title: 'Union and Intersection Types',
                                    description: 'Combining types in TypeScript',
                                    code: '// Union types\nfunction printId(id: number | string) {\n    console.log("ID: " + id);\n}\n\n// Intersection types\ninterface Person {\n    name: string;\n    age: number;\n}\n\ninterface Employee {\n    employeeId: string;\n    department: string;\n}\n\ntype EmployeePerson = Person & Employee;\n\n// Type guards\nfunction isString(value: unknown): value is string {\n    return typeof value === "string";\n}\n\n// Conditional types\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\n// Mapped types\ntype Partial<T> = {\n    [P in keyof T]?: T[P];\n};',
                                    explanation: 'Advanced types provide powerful ways to create flexible and type-safe code.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    react: {
        sections: [
            {
                title: 'React Fundamentals',
                description: 'Learn the basics of React development',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to React',
                        description: 'What is React and how it works',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.react
                    },
                    {
                        title: 'Components and Props',
                        description: 'Creating and using React components',
                        lesson_number: 2,
                        content: LESSON_CONTENT_TEMPLATES.react
                    },
                    {
                        title: 'State and Hooks',
                        description: 'Managing component state with useState',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.react
                    }
                ]
            },
            {
                title: 'Advanced React',
                description: 'Advanced React concepts and patterns',
                section_number: 2,
                lessons: [
                    {
                        title: 'useEffect Hook',
                        description: 'Managing side effects in functional components',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'react-useeffect-1',
                                    title: 'Data Fetching with useEffect',
                                    description: 'Fetching data from APIs',
                                    code: 'import React, { useState, useEffect } from \'react\';\n\nfunction UserProfile({ userId }) {\n    const [user, setUser] = useState(null);\n    const [loading, setLoading] = useState(true);\n    \n    useEffect(() => {\n        const fetchUser = async () => {\n            setLoading(true);\n            try {\n                const response = await fetch(`/api/users/${userId}`);\n                const userData = await response.json();\n                setUser(userData);\n            } catch (error) {\n                console.error(\'Error fetching user:\', error);\n            } finally {\n                setLoading(false);\n            }\n        };\n        \n        fetchUser();\n    }, [userId]);\n    \n    if (loading) return <div>Loading...</div>;\n    if (!user) return <div>User not found</div>;\n    \n    return (\n        <div>\n            <h2>{user.name}</h2>\n            <p>Email: {user.email}</p>\n        </div>\n    );\n}',
                                    explanation: 'useEffect handles side effects like API calls, subscriptions, and cleanup.'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Custom Hooks',
                        description: 'Creating reusable logic with custom hooks',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'react-custom-hooks-1',
                                    title: 'Custom Hook for API Calls',
                                    description: 'Creating a reusable hook for data fetching',
                                    code: 'import { useState, useEffect } from \'react\';\n\n// Custom hook\nfunction useApi(url) {\n    const [data, setData] = useState(null);\n    const [loading, setLoading] = useState(true);\n    const [error, setError] = useState(null);\n    \n    useEffect(() => {\n        const fetchData = async () => {\n            try {\n                setLoading(true);\n                const response = await fetch(url);\n                if (!response.ok) {\n                    throw new Error(\'Failed to fetch\');\n                }\n                const result = await response.json();\n                setData(result);\n            } catch (err) {\n                setError(err.message);\n            } finally {\n                setLoading(false);\n            }\n        };\n        \n        fetchData();\n    }, [url]);\n    \n    return { data, loading, error };\n}\n\n// Using the custom hook\nfunction UserList() {\n    const { data: users, loading, error } = useApi(\'/api/users\');\n    \n    if (loading) return <div>Loading...</div>;\n    if (error) return <div>Error: {error}</div>;\n    \n    return (\n        <ul>\n            {users?.map(user => (\n                <li key={user.id}>{user.name}</li>\n            ))}\n        </ul>\n    );\n}',
                                    explanation: 'Custom hooks allow you to extract component logic into reusable functions.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    vue: {
        sections: [
            {
                title: 'Vue.js Fundamentals',
                description: 'Learn the basics of Vue.js development',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to Vue',
                        description: 'What is Vue.js and its features',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.vue
                    },
                    {
                        title: 'Template Syntax',
                        description: 'Vue template syntax and directives',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'vue-directives-1',
                                    title: 'Vue Directives',
                                    description: 'Using v-if, v-for, v-model, and other directives',
                                    code: '<template>\n  <div>\n    <!-- Conditional rendering -->\n    <p v-if="isVisible">This is visible</p>\n    <p v-else>This is hidden</p>\n    \n    <!-- List rendering -->\n    <ul>\n      <li v-for="item in items" :key="item.id">\n        {{ item.name }}\n      </li>\n    </ul>\n    \n    <!-- Two-way data binding -->\n    <input v-model="message" placeholder="Type something">\n    <p>You typed: {{ message }}</p>\n    \n    <!-- Event handling -->\n    <button @click="increment">Count: {{ count }}</button>\n  </div>\n</template>',
                                    explanation: 'Vue directives provide special attributes that reactively apply behavior to the DOM.'
                                }
                            ]
                        }
                    },
                    {
                        title: 'Composition API',
                        description: 'Using Vue 3 Composition API',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.vue
                    }
                ]
            },
            {
                title: 'Advanced Vue',
                description: 'Advanced Vue.js concepts and patterns',
                section_number: 2,
                lessons: [
                    {
                        title: 'Props and Events',
                        description: 'Component communication',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.vue
                    },
                    {
                        title: 'Vuex State Management',
                        description: 'Managing global state with Vuex',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'vue-vuex-1',
                                    title: 'Vuex Store Setup',
                                    description: 'Creating a Vuex store for state management',
                                    code: '// store/index.js\nimport { createStore } from \'vuex\';\n\nexport default createStore({\n  state: {\n    count: 0,\n    todos: []\n  },\n  mutations: {\n    increment(state) {\n      state.count++;\n    },\n    addTodo(state, todo) {\n      state.todos.push(todo);\n    }\n  },\n  actions: {\n    increment({ commit }) {\n      commit(\'increment\');\n    },\n    addTodo({ commit }, todo) {\n      commit(\'addTodo\', todo);\n    }\n  },\n  getters: {\n    todoCount: state => state.todos.length,\n    completedTodos: state => state.todos.filter(todo => todo.completed)\n  }\n});\n\n// Using in component\n<template>\n  <div>\n    <p>Count: {{ $store.state.count }}</p>\n    <button @click="$store.dispatch(\'increment\')">Increment</button>\n  </div>\n</template>',
                                    explanation: 'Vuex provides centralized state management for Vue applications.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    nodejs: {
        sections: [
            {
                title: 'Node.js Fundamentals',
                description: 'Learn server-side JavaScript with Node.js',
                section_number: 1,
                lessons: [
                    {
                        title: 'Introduction to Node.js',
                        description: 'What is Node.js and its ecosystem',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.nodejs
                    },
                    {
                        title: 'Modules and NPM',
                        description: 'Working with Node.js modules and packages',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'nodejs-modules-1',
                                    title: 'Creating and Using Modules',
                                    description: 'Organizing code with modules',
                                    code: '// math.js - Custom module\nexports.add = (a, b) => a + b;\nexports.subtract = (a, b) => a - b;\nexports.multiply = (a, b) => a * b;\nexports.divide = (a, b) => b !== 0 ? a / b : \'Cannot divide by zero\';\n\n// app.js - Using the module\nconst math = require(\'./math\');\n\nconsole.log(math.add(5, 3)); // 8\nconsole.log(math.multiply(4, 6)); // 24\n\n// Using built-in modules\nconst fs = require(\'fs\');\nconst path = require(\'path\');\nconst os = require(\'os\');\n\nconsole.log(\'Current directory:\', __dirname);\nconsole.log(\'Platform:\', os.platform());',
                                    explanation: 'Modules help organize code. Use require() to import modules and exports to share functionality.'
                                }
                            ]
                        }
                    },
                    {
                        title: 'File System Operations',
                        description: 'Reading and writing files',
                        lesson_number: 3,
                        content: LESSON_CONTENT_TEMPLATES.nodejs
                    }
                ]
            },
            {
                title: 'Building APIs',
                description: 'Creating RESTful APIs with Express',
                section_number: 2,
                lessons: [
                    {
                        title: 'Express.js Web Framework',
                        description: 'Building web applications with Express',
                        lesson_number: 1,
                        content: LESSON_CONTENT_TEMPLATES.nodejs
                    },
                    {
                        title: 'RESTful API Design',
                        description: 'Creating well-designed REST APIs',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'nodejs-rest-1',
                                    title: 'Complete REST API',
                                    description: 'Building a full CRUD API',
                                    code: 'const express = require(\'express\');\nconst app = express();\n\napp.use(express.json());\n\nlet todos = [\n  { id: 1, text: \'Learn Node.js\', completed: false },\n  { id: 2, text: \'Build an API\', completed: false }\n];\n\n// GET all todos\napp.get(\'/api/todos\', (req, res) => {\n  res.json(todos);\n});\n\n// GET single todo\napp.get(\'/api/todos/:id\', (req, res) => {\n  const todo = todos.find(t => t.id === parseInt(req.params.id));\n  if (!todo) return res.status(404).json({ error: \'Todo not found\' });\n  res.json(todo);\n});\n\n// POST new todo\napp.post(\'/api/todos\', (req, res) => {\n  const { text } = req.body;\n  if (!text) return res.status(400).json({ error: \'Text is required\' });\n  \n  const newTodo = {\n    id: todos.length + 1,\n    text,\n    completed: false\n  };\n  todos.push(newTodo);\n  res.status(201).json(newTodo);\n});\n\n// PUT update todo\napp.put(\'/api/todos/:id\', (req, res) => {\n  const todo = todos.find(t => t.id === parseInt(req.params.id));\n  if (!todo) return res.status(404).json({ error: \'Todo not found\' });\n  \n  const { text, completed } = req.body;\n  todo.text = text || todo.text;\n  todo.completed = completed !== undefined ? completed : todo.completed;\n  \n  res.json(todo);\n});\n\n// DELETE todo\napp.delete(\'/api/todos/:id\', (req, res) => {\n  const index = todos.findIndex(t => t.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: \'Todo not found\' });\n  \n  todos.splice(index, 1);\n  res.json({ message: \'Todo deleted\' });\n});\n\nconst PORT = 3000;\napp.listen(PORT, () => {\n  console.log(`Server running on port ${PORT}`);\n});',
                                    explanation: 'REST APIs follow standard HTTP methods and status codes for different operations.'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
const seedLessons = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        // Clear existing lessons and sections first
        console.log('Clearing existing lessons and sections...');
        yield lesson_model_1.Lesson.destroy({ where: {}, transaction });
        yield lesson_section_model_1.LessonSection.destroy({ where: {}, transaction });
        console.log('Existing lessons and sections cleared.');
        console.log('Starting lesson seeding...');
        // Get all languages
        const languages = yield language_model_1.Language.findAll({
            where: { is_deleted: false },
            transaction
        });
        if (languages.length === 0) {
            console.log('No languages found. Please seed languages first.');
            yield transaction.commit();
            return;
        }
        console.log(`Found ${languages.length} languages. Creating lessons...`);
        let totalSections = 0;
        let totalLessons = 0;
        // Create sections and lessons for each language
        for (const language of languages) {
            const languageName = language.name.toLowerCase();
            const lessonData = DEFAULT_LESSON_DATA[languageName];
            if (!lessonData) {
                console.log(`No lesson data found for language: ${language.name}. Skipping...`);
                continue;
            }
            console.log(`Creating lessons for ${language.name}...`);
            // Create sections for this language
            for (const sectionData of lessonData.sections) {
                const section = yield lesson_section_model_1.LessonSection.create({
                    language_id: language.id,
                    title: sectionData.title,
                    description: sectionData.description,
                    section_order: sectionData.section_number,
                    is_published: true,
                    is_deleted: false
                }, { transaction });
                totalSections++;
                // Create lessons for this section
                for (const lessonData of sectionData.lessons) {
                    yield lesson_model_1.Lesson.create({
                        language_id: language.id,
                        section_id: section.id,
                        title: lessonData.title,
                        description: lessonData.description,
                        lesson_number: lessonData.lesson_number,
                        content: lessonData.content,
                        is_published: true,
                        is_deleted: false
                    }, { transaction });
                    totalLessons++;
                }
            }
        }
        console.log(`Successfully created ${totalSections} sections and ${totalLessons} lessons`);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error seeding lessons: ", error);
        throw error;
    }
});
exports.seedLessons = seedLessons;
// Function to seed lessons for specific languages only
const seedLessonsForLanguages = (connection, languageNames) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        console.log(`Seeding lessons for languages: ${languageNames.join(', ')}`);
        // Get specified languages
        const languages = yield language_model_1.Language.findAll({
            where: {
                name: languageNames,
                is_deleted: false
            },
            transaction
        });
        if (languages.length === 0) {
            console.log('No matching languages found.');
            yield transaction.commit();
            return;
        }
        let totalSections = 0;
        let totalLessons = 0;
        // Create sections and lessons for each specified language
        for (const language of languages) {
            const languageName = language.name.toLowerCase();
            const lessonData = DEFAULT_LESSON_DATA[languageName];
            if (!lessonData) {
                console.log(`No lesson data found for language: ${language.name}. Skipping...`);
                continue;
            }
            // Check if sections already exist for this language
            const existingSections = yield lesson_section_model_1.LessonSection.count({
                where: {
                    language_id: language.id,
                    is_deleted: false
                },
                transaction
            });
            if (existingSections > 0) {
                console.log(`Sections already exist for ${language.name}. Skipping...`);
                continue;
            }
            console.log(`Creating lessons for ${language.name}...`);
            // Create sections for this language
            for (const sectionData of lessonData.sections) {
                const section = yield lesson_section_model_1.LessonSection.create({
                    language_id: language.id,
                    title: sectionData.title,
                    description: sectionData.description,
                    section_order: sectionData.section_number,
                    is_published: true,
                    is_deleted: false
                }, { transaction });
                totalSections++;
                // Create lessons for this section
                for (const lessonData of sectionData.lessons) {
                    yield lesson_model_1.Lesson.create({
                        language_id: language.id,
                        section_id: section.id,
                        title: lessonData.title,
                        description: lessonData.description,
                        lesson_number: lessonData.lesson_number,
                        content: lessonData.content,
                        is_published: true,
                        is_deleted: false
                    }, { transaction });
                    totalLessons++;
                }
            }
        }
        console.log(`Successfully created ${totalSections} sections and ${totalLessons} lessons for specified languages`);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error seeding lessons for specific languages: ", error);
        throw error;
    }
});
exports.seedLessonsForLanguages = seedLessonsForLanguages;
