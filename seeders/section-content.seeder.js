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
exports.addContentToExistingLessons = exports.updateLessonContent = exports.addSectionContent = void 0;
const language_model_1 = require("../models/language.model");
const lesson_section_model_1 = require("../models/lesson-section.model");
const lesson_model_1 = require("../models/lesson.model");
// Additional content data for existing lessons
const ADDITIONAL_LESSON_CONTENT = {
    python: {
        sections: [
            {
                title: 'Advanced Python',
                description: 'Advanced Python concepts and techniques',
                section_number: 4,
                lessons: [
                    {
                        title: 'Object-Oriented Programming',
                        description: 'Learn classes, objects, and inheritance in Python',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'python-oop-1',
                                    title: 'Creating Classes',
                                    description: 'Defining classes and creating objects',
                                    code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, I\'m {self.name} and I\'m {self.age} years old."\n\n# Create an instance\nperson1 = Person("Alice", 25)\nprint(person1.greet())',
                                    explanation: 'Classes are blueprints for creating objects. The __init__ method is the constructor that initializes object attributes.'
                                },
                                {
                                    id: 'python-oop-2',
                                    title: 'Inheritance',
                                    description: 'Creating child classes that inherit from parent classes',
                                    code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        return f"{self.name} makes a sound"\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} barks"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} meows"\n\n# Create instances\ndog = Dog("Buddy")\ncat = Cat("Whiskers")\nprint(dog.speak())\nprint(cat.speak())',
                                    explanation: 'Inheritance allows child classes to inherit attributes and methods from parent classes, and override them as needed.'
                                }
                            ],
                            steps: [
                                'Define a class using the class keyword',
                                'Create an __init__ method to initialize object attributes',
                                'Add methods to define object behavior',
                                'Create instances of the class using the class name',
                                'Call methods on instances using dot notation'
                            ],
                            exercise: {
                                description: 'Create a BankAccount class with methods to deposit, withdraw, and check balance.',
                                starterCode: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        # Initialize account holder and balance\n        pass\n    \n    def deposit(self, amount):\n        # Add amount to balance\n        pass\n    \n    def withdraw(self, amount):\n        # Subtract amount from balance (check if sufficient funds)\n        pass\n    \n    def get_balance(self):\n        # Return current balance\n        pass\n\n# Test your class\naccount = BankAccount("John Doe", 1000)\nprint(f"Initial balance: ${account.get_balance()}")',
                                solution: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        self.account_holder = account_holder\n        self.balance = initial_balance\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.balance += amount\n            return f"Deposited ${amount}. New balance: ${self.balance}"\n        else:\n            return "Deposit amount must be positive"\n    \n    def withdraw(self, amount):\n        if amount > 0 and amount <= self.balance:\n            self.balance -= amount\n            return f"Withdrew ${amount}. New balance: ${self.balance}"\n        elif amount > self.balance:\n            return "Insufficient funds"\n        else:\n            return "Withdrawal amount must be positive"\n    \n    def get_balance(self):\n        return self.balance\n\n# Test the class\naccount = BankAccount("John Doe", 1000)\nprint(f"Initial balance: ${account.get_balance()}")\nprint(account.deposit(500))\nprint(account.withdraw(200))\nprint(account.withdraw(2000))'
                            }
                        }
                    },
                    {
                        title: 'File Handling',
                        description: 'Reading from and writing to files in Python',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'python-files-1',
                                    title: 'Reading Files',
                                    description: 'Reading content from text files',
                                    code: '# Reading a file\nwith open("example.txt", "r") as file:\n    content = file.read()\n    print(content)\n\n# Reading line by line\nwith open("example.txt", "r") as file:\n    for line in file:\n        print(line.strip())  # strip() removes newline characters\n\n# Reading all lines into a list\nwith open("example.txt", "r") as file:\n    lines = file.readlines()\n    print(lines)',
                                    explanation: 'Use the with statement to safely open files. It automatically closes the file when done.'
                                },
                                {
                                    id: 'python-files-2',
                                    title: 'Writing Files',
                                    description: 'Writing content to text files',
                                    code: '# Writing to a file (overwrites existing content)\nwith open("output.txt", "w") as file:\n    file.write("Hello, World!\\n")\n    file.write("This is a new line.\\n")\n\n# Appending to a file\nwith open("output.txt", "a") as file:\n    file.write("This line will be appended.\\n")\n\n# Writing multiple lines\nlines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]\nwith open("output.txt", "w") as file:\n    file.writelines(lines)',
                                    explanation: 'Use "w" mode to write (overwrites), "a" mode to append, and "r" mode to read.'
                                }
                            ],
                            exercise: {
                                description: 'Create a program that reads a list of names from a file, adds "Hello, " before each name, and writes the greetings to a new file.',
                                starterCode: '# Read names from names.txt and create greetings in greetings.txt\n# names.txt should contain one name per line\n\n# Your code here',
                                solution: '# Read names from names.txt and create greetings in greetings.txt\nwith open("names.txt", "r") as input_file:\n    names = input_file.readlines()\n\n# Create greetings\nwith open("greetings.txt", "w") as output_file:\n    for name in names:\n        greeting = f"Hello, {name.strip()}\\n"\n        output_file.write(greeting)\n\nprint("Greetings file created successfully!")'
                            }
                        }
                    }
                ]
            }
        ]
    },
    javascript: {
        sections: [
            {
                title: 'Advanced JavaScript',
                description: 'Advanced JavaScript concepts and modern features',
                section_number: 3,
                lessons: [
                    {
                        title: 'Async JavaScript',
                        description: 'Working with asynchronous operations using Promises and async/await',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'js-async-1',
                                    title: 'Promises',
                                    description: 'Understanding and using Promises',
                                    code: '// Creating a Promise\nconst fetchData = () => {\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            const success = Math.random() > 0.5;\n            if (success) {\n                resolve("Data fetched successfully!");\n            } else {\n                reject("Failed to fetch data");\n            }\n        }, 2000);\n    });\n};\n\n// Using the Promise\nfetchData()\n    .then(result => {\n        console.log(result);\n    })\n    .catch(error => {\n        console.error(error);\n    });',
                                    explanation: 'Promises represent the eventual completion or failure of an asynchronous operation.'
                                },
                                {
                                    id: 'js-async-2',
                                    title: 'Async/Await',
                                    description: 'Using async/await for cleaner asynchronous code',
                                    code: '// Async function\nasync function fetchUserData(userId) {\n    try {\n        const response = await fetch(`/api/users/${userId}`);\n        if (!response.ok) {\n            throw new Error(`HTTP error! status: ${response.status}`);\n        }\n        const userData = await response.json();\n        return userData;\n    } catch (error) {\n        console.error("Error fetching user data:", error);\n        throw error;\n    }\n}\n\n// Using the async function\nasync function displayUser() {\n    try {\n        const user = await fetchUserData(123);\n        console.log("User:", user);\n    } catch (error) {\n        console.error("Failed to display user:", error);\n    }\n}\n\ndisplayUser();',
                                    explanation: 'async/await makes asynchronous code look and behave more like synchronous code.'
                                }
                            ],
                            exercise: {
                                description: 'Create an async function that fetches data from multiple APIs and combines the results.',
                                starterCode: '// Create async functions to fetch data from multiple sources\nasync function fetchWeather(city) {\n    // Simulate API call\n    return new Promise(resolve => {\n        setTimeout(() => {\n            resolve({ city, temperature: Math.floor(Math.random() * 30) + 10 });\n        }, 1000);\n    });\n}\n\nasync function fetchNews(category) {\n    // Simulate API call\n    return new Promise(resolve => {\n        setTimeout(() => {\n            resolve({ category, articles: [`${category} news 1`, `${category} news 2`] });\n        }, 1500);\n    });\n}\n\n// Create a function that fetches both weather and news data\nasync function fetchDashboardData(city, newsCategory) {\n    // Your code here\n}',
                                solution: 'async function fetchWeather(city) {\n    return new Promise(resolve => {\n        setTimeout(() => {\n            resolve({ city, temperature: Math.floor(Math.random() * 30) + 10 });\n        }, 1000);\n    });\n}\n\nasync function fetchNews(category) {\n    return new Promise(resolve => {\n        setTimeout(() => {\n            resolve({ category, articles: [`${category} news 1`, `${category} news 2`] });\n        }, 1500);\n    });\n}\n\nasync function fetchDashboardData(city, newsCategory) {\n    try {\n        // Fetch both data sources concurrently\n        const [weather, news] = await Promise.all([\n            fetchWeather(city),\n            fetchNews(newsCategory)\n        ]);\n        \n        return {\n            weather,\n            news,\n            timestamp: new Date().toISOString()\n        };\n    } catch (error) {\n        console.error("Error fetching dashboard data:", error);\n        throw error;\n    }\n}\n\n// Usage\nfetchDashboardData("New York", "technology")\n    .then(data => console.log("Dashboard data:", data))\n    .catch(error => console.error("Failed to load dashboard:", error));'
                            }
                        }
                    },
                    {
                        title: 'ES6+ Features',
                        description: 'Modern JavaScript features and syntax',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'js-es6-1',
                                    title: 'Arrow Functions and Destructuring',
                                    description: 'Modern function syntax and object/array destructuring',
                                    code: '// Arrow functions\nconst add = (a, b) => a + b;\nconst square = x => x * x;\nconst greet = name => `Hello, ${name}!`;\n\n// Array destructuring\nconst numbers = [1, 2, 3, 4, 5];\nconst [first, second, ...rest] = numbers;\nconsole.log(first, second, rest); // 1 2 [3, 4, 5]\n\n// Object destructuring\nconst person = { name: "Alice", age: 25, city: "New York" };\nconst { name, age, city } = person;\nconsole.log(name, age, city); // Alice 25 New York\n\n// Destructuring with default values\nconst { name: fullName = "Unknown", country = "USA" } = person;\nconsole.log(fullName, country);',
                                    explanation: 'Arrow functions provide a shorter syntax for writing functions. Destructuring allows extracting values from arrays or objects.'
                                },
                                {
                                    id: 'js-es6-2',
                                    title: 'Template Literals and Spread Operator',
                                    description: 'String templates and spread syntax',
                                    code: '// Template literals\nconst name = "Alice";\nconst age = 25;\nconst message = `Hello, my name is ${name} and I am ${age} years old.`;\n\n// Multi-line strings\nconst html = `\n    <div class="user-card">\n        <h2>${name}</h2>\n        <p>Age: ${age}</p>\n    </div>\n`;\n\n// Spread operator with arrays\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]\n\n// Spread operator with objects\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\nconst merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }',
                                    explanation: 'Template literals allow embedded expressions and multi-line strings. Spread operator expands arrays/objects.'
                                }
                            ],
                            exercise: {
                                description: 'Create a function that uses modern JavaScript features to process an array of user objects.',
                                starterCode: 'const users = [\n    { id: 1, name: "Alice", age: 25, active: true },\n    { id: 2, name: "Bob", age: 30, active: false },\n    { id: 3, name: "Charlie", age: 35, active: true }\n];\n\n// Create a function that returns active users with their names in uppercase\n// Use arrow functions, destructuring, and template literals\nfunction getActiveUsers(users) {\n    // Your code here\n}',
                                solution: 'const users = [\n    { id: 1, name: "Alice", age: 25, active: true },\n    { id: 2, name: "Bob", age: 30, active: false },\n    { id: 3, name: "Charlie", age: 35, active: true }\n];\n\nconst getActiveUsers = (users) => {\n    return users\n        .filter(({ active }) => active)\n        .map(({ name, age }) => ({\n            name: name.toUpperCase(),\n            age,\n            greeting: `Hello, ${name.toUpperCase()}! You are ${age} years old.`\n        }));\n};\n\nconst activeUsers = getActiveUsers(users);\nconsole.log(activeUsers);\n// Output: [\n//   { name: "ALICE", age: 25, greeting: "Hello, ALICE! You are 25 years old." },\n//   { name: "CHARLIE", age: 35, greeting: "Hello, CHARLIE! You are 35 years old." }\n// ]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    html: {
        sections: [
            {
                title: 'Advanced HTML',
                description: 'Advanced HTML features and semantic elements',
                section_number: 6,
                lessons: [
                    {
                        title: 'HTML5 Semantic Elements',
                        description: 'Using modern HTML5 semantic elements for better structure',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'html-semantic-1',
                                    title: 'Semantic Layout Elements',
                                    description: 'Using header, nav, main, section, article, aside, and footer',
                                    code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Semantic HTML Example</title>\n</head>\n<body>\n    <header>\n        <h1>My Website</h1>\n        <nav>\n            <ul>\n                <li><a href="#home">Home</a></li>\n                <li><a href="#about">About</a></li>\n                <li><a href="#contact">Contact</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <section id="home">\n            <h2>Welcome</h2>\n            <p>Welcome to our website!</p>\n        </section>\n        \n        <section id="about">\n            <h2>About Us</h2>\n            <article>\n                <h3>Our Story</h3>\n                <p>We are a company dedicated to...</p>\n            </article>\n        </section>\n    </main>\n    \n    <aside>\n        <h3>Related Links</h3>\n        <ul>\n            <li><a href="#">Link 1</a></li>\n            <li><a href="#">Link 2</a></li>\n        </ul>\n    </aside>\n    \n    <footer>\n        <p>&copy; 2024 My Website. All rights reserved.</p>\n    </footer>\n</body>\n</html>',
                                    explanation: 'Semantic elements provide meaning to the structure of your HTML, making it more accessible and SEO-friendly.'
                                }
                            ],
                            exercise: {
                                description: 'Create a blog post layout using semantic HTML5 elements.',
                                starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Blog Post</title>\n</head>\n<body>\n    <!-- Create a semantic blog post layout -->\n</body>\n</html>',
                                solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My Blog Post</title>\n</head>\n<body>\n    <header>\n        <h1>My Blog</h1>\n        <nav>\n            <ul>\n                <li><a href="/">Home</a></li>\n                <li><a href="/about">About</a></li>\n                <li><a href="/contact">Contact</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <article>\n            <header>\n                <h2>Understanding Semantic HTML</h2>\n                <p>Published on <time datetime="2024-01-15">January 15, 2024</time> by <author>John Doe</author></p>\n            </header>\n            \n            <section>\n                <h3>What is Semantic HTML?</h3>\n                <p>Semantic HTML is the use of HTML markup to reinforce the semantics, or meaning, of the information in webpages and web applications rather than merely to define its presentation or look.</p>\n            </section>\n            \n            <section>\n                <h3>Benefits</h3>\n                <ul>\n                    <li>Better accessibility</li>\n                    <li>Improved SEO</li>\n                    <li>Easier maintenance</li>\n                </ul>\n            </section>\n        </article>\n    </main>\n    \n    <aside>\n        <h3>Related Posts</h3>\n        <ul>\n            <li><a href="/post1">HTML5 Features</a></li>\n            <li><a href="/post2">CSS Grid Layout</a></li>\n        </ul>\n    </aside>\n    \n    <footer>\n        <p>&copy; 2024 My Blog. All rights reserved.</p>\n    </footer>\n</body>\n</html>'
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
                title: 'CSS Animations and Transitions',
                description: 'Adding animations and transitions to your CSS',
                section_number: 6,
                lessons: [
                    {
                        title: 'CSS Transitions',
                        description: 'Creating smooth transitions between CSS property changes',
                        lesson_number: 1,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-transitions-1',
                                    title: 'Basic Transitions',
                                    description: 'Creating smooth property transitions',
                                    code: '.button {\n    background-color: #3498db;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.button:hover {\n    background-color: #2980b9;\n}\n\n/* Multiple properties */\n.card {\n    width: 200px;\n    height: 200px;\n    background-color: #ecf0f1;\n    transition: all 0.3s ease;\n}\n\n.card:hover {\n    transform: scale(1.05);\n    box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}',
                                    explanation: 'Transitions create smooth animations between different states of an element.'
                                },
                                {
                                    id: 'css-transitions-2',
                                    title: 'Advanced Transitions',
                                    description: 'Using different timing functions and delays',
                                    code: '.advanced-transition {\n    width: 100px;\n    height: 100px;\n    background-color: #e74c3c;\n    transition: \n        width 0.5s ease-in-out,\n        height 0.5s ease-in-out 0.2s,\n        background-color 0.3s linear 0.4s;\n}\n\n.advanced-transition:hover {\n    width: 200px;\n    height: 200px;\n    background-color: #27ae60;\n}\n\n/* Custom timing function */\n.bounce {\n    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n\n.bounce:hover {\n    transform: scale(1.2);\n}',
                                    explanation: 'You can specify different timing functions, durations, and delays for each property.'
                                }
                            ],
                            exercise: {
                                description: 'Create a navigation menu with smooth hover transitions and a loading button with a transition effect.',
                                starterCode: '/* Create smooth transitions for navigation and buttons */\n.nav-menu {\n    /* Style the navigation menu */\n}\n\n.nav-item {\n    /* Style navigation items with transitions */\n}\n\n.loading-button {\n    /* Style a button with loading transition */\n}',
                                solution: '.nav-menu {\n    display: flex;\n    gap: 20px;\n    padding: 20px;\n    background-color: #2c3e50;\n}\n\n.nav-item {\n    color: white;\n    text-decoration: none;\n    padding: 10px 20px;\n    border-radius: 4px;\n    transition: all 0.3s ease;\n    position: relative;\n}\n\n.nav-item:hover {\n    background-color: #34495e;\n    transform: translateY(-2px);\n    box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}\n\n.loading-button {\n    background-color: #3498db;\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    position: relative;\n    overflow: hidden;\n}\n\n.loading-button:hover {\n    background-color: #2980b9;\n    transform: scale(1.05);\n}\n\n.loading-button:active {\n    transform: scale(0.95);\n}\n\n.loading-button.loading {\n    background-color: #95a5a6;\n    cursor: not-allowed;\n}\n\n.loading-button.loading::after {\n    content: "";\n    position: absolute;\n    top: 0;\n    left: -100%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);\n    animation: loading 1.5s infinite;\n}\n\n@keyframes loading {\n    0% { left: -100%; }\n    100% { left: 100%; }\n}'
                            }
                        }
                    },
                    {
                        title: 'CSS Animations',
                        description: 'Creating keyframe animations in CSS',
                        lesson_number: 2,
                        content: {
                            codeExamples: [
                                {
                                    id: 'css-animations-1',
                                    title: 'Keyframe Animations',
                                    description: 'Creating animations with @keyframes',
                                    code: '@keyframes fadeIn {\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n.fade-in {\n    animation: fadeIn 1s ease-out;\n}\n\n/* Multiple keyframes */\n@keyframes bounce {\n    0%, 20%, 50%, 80%, 100% {\n        transform: translateY(0);\n    }\n    40% {\n        transform: translateY(-30px);\n    }\n    60% {\n        transform: translateY(-15px);\n    }\n}\n\n.bounce {\n    animation: bounce 2s infinite;\n}',
                                    explanation: 'Keyframes define the steps of an animation. You can specify multiple points in the animation timeline.'
                                },
                                {
                                    id: 'css-animations-2',
                                    title: 'Animation Properties',
                                    description: 'Controlling animation behavior',
                                    code: '.animated-element {\n    width: 100px;\n    height: 100px;\n    background-color: #e74c3c;\n    animation: \n        slideIn 2s ease-in-out 1s 3 alternate,\n        rotate 1s linear infinite;\n}\n\n@keyframes slideIn {\n    from {\n        transform: translateX(-100px);\n    }\n    to {\n        transform: translateX(0);\n    }\n}\n\n@keyframes rotate {\n    from {\n        transform: rotate(0deg);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n}\n\n/* Animation shorthand: name duration timing-function delay iteration-count direction */',
                                    explanation: 'Animation properties control duration, timing, delays, iteration count, and direction of animations.'
                                }
                            ],
                            exercise: {
                                description: 'Create a loading spinner and a pulsing notification badge using CSS animations.',
                                starterCode: '/* Create a loading spinner */\n.spinner {\n    /* Style the spinner */\n}\n\n/* Create a pulsing notification badge */\n.notification-badge {\n    /* Style the badge with pulse animation */\n}',
                                solution: '.spinner {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #f3f3f3;\n    border-top: 4px solid #3498db;\n    border-radius: 50%;\n    animation: spin 1s linear infinite;\n    margin: 20px auto;\n}\n\n@keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}\n\n.notification-badge {\n    position: relative;\n    display: inline-block;\n    background-color: #e74c3c;\n    color: white;\n    padding: 4px 8px;\n    border-radius: 12px;\n    font-size: 12px;\n    font-weight: bold;\n    animation: pulse 2s infinite;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);\n    }\n    70% {\n        transform: scale(1.05);\n        box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);\n    }\n    100% {\n        transform: scale(1);\n        box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);\n    }\n}\n\n/* Usage example */\n.button-with-badge {\n    position: relative;\n    background-color: #3498db;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.button-with-badge .notification-badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n}'
                            }
                        }
                    }
                ]
            }
        ]
    }
};
// Function to add additional content to existing lessons
const addSectionContent = (connection, languageNames) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        console.log('Adding additional section content...');
        // Get languages to process
        let languages;
        if (languageNames && languageNames.length > 0) {
            languages = yield language_model_1.Language.findAll({
                where: {
                    name: languageNames,
                    is_deleted: false
                },
                transaction
            });
        }
        else {
            languages = yield language_model_1.Language.findAll({
                where: { is_deleted: false },
                transaction
            });
        }
        if (languages.length === 0) {
            console.log('No languages found.');
            yield transaction.commit();
            return;
        }
        let totalSections = 0;
        let totalLessons = 0;
        // Add content for each language
        for (const language of languages) {
            const languageName = language.name.toLowerCase();
            const additionalContent = ADDITIONAL_LESSON_CONTENT[languageName];
            if (!additionalContent) {
                console.log(`No additional content found for language: ${language.name}. Skipping...`);
                continue;
            }
            console.log(`Adding additional content for ${language.name}...`);
            // Add sections for this language
            for (const sectionData of additionalContent.sections) {
                // Check if section already exists
                const existingSection = yield lesson_section_model_1.LessonSection.findOne({
                    where: {
                        language_id: language.id,
                        title: sectionData.title,
                        is_deleted: false
                    },
                    transaction
                });
                if (existingSection) {
                    console.log(`Section "${sectionData.title}" already exists for ${language.name}. Skipping...`);
                    continue;
                }
                const section = yield lesson_section_model_1.LessonSection.create({
                    language_id: language.id,
                    title: sectionData.title,
                    description: sectionData.description,
                    section_order: sectionData.section_number,
                    is_published: true,
                    is_deleted: false
                }, { transaction });
                totalSections++;
                // Add lessons for this section
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
        console.log(`Successfully added ${totalSections} sections and ${totalLessons} lessons`);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error adding section content: ", error);
        throw error;
    }
});
exports.addSectionContent = addSectionContent;
// Function to update existing lesson content
const updateLessonContent = (connection, languageName, sectionTitle, lessonTitle, newContent) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        console.log(`Updating lesson content for ${languageName} - ${sectionTitle} - ${lessonTitle}`);
        // Find the language
        const language = yield language_model_1.Language.findOne({
            where: {
                name: languageName,
                is_deleted: false
            },
            transaction
        });
        if (!language) {
            throw new Error(`Language ${languageName} not found`);
        }
        // Find the section
        const section = yield lesson_section_model_1.LessonSection.findOne({
            where: {
                language_id: language.id,
                title: sectionTitle,
                is_deleted: false
            },
            transaction
        });
        if (!section) {
            throw new Error(`Section ${sectionTitle} not found for ${languageName}`);
        }
        // Find and update the lesson
        const lesson = yield lesson_model_1.Lesson.findOne({
            where: {
                language_id: language.id,
                section_id: section.id,
                title: lessonTitle,
                is_deleted: false
            },
            transaction
        });
        if (!lesson) {
            throw new Error(`Lesson ${lessonTitle} not found in section ${sectionTitle}`);
        }
        // Update the lesson content
        yield lesson.update({
            content: newContent
        }, { transaction });
        console.log(`Successfully updated lesson content for ${lessonTitle}`);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error updating lesson content: ", error);
        throw error;
    }
});
exports.updateLessonContent = updateLessonContent;
// Function to add content to specific existing lessons
const addContentToExistingLessons = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        console.log('Adding content to existing lessons...');
        // Example: Add more code examples to existing Python lessons
        const pythonLanguage = yield language_model_1.Language.findOne({
            where: { name: 'Python', is_deleted: false },
            transaction
        });
        if (pythonLanguage) {
            // Find the "Basic Syntax" section
            const basicSyntaxSection = yield lesson_section_model_1.LessonSection.findOne({
                where: {
                    language_id: pythonLanguage.id,
                    title: 'Basic Syntax',
                    is_deleted: false
                },
                transaction
            });
            if (basicSyntaxSection) {
                // Find the "Variables and Data Types" lesson
                const variablesLesson = yield lesson_model_1.Lesson.findOne({
                    where: {
                        language_id: pythonLanguage.id,
                        section_id: basicSyntaxSection.id,
                        title: 'Variables and Data Types',
                        is_deleted: false
                    },
                    transaction
                });
                if (variablesLesson) {
                    // Add additional content to the existing lesson
                    const currentContent = variablesLesson.content;
                    const additionalExamples = [
                        {
                            id: 'python-variables-advanced-1',
                            title: 'Type Conversion',
                            description: 'Converting between different data types',
                            code: '# Type conversion examples\nage_str = "25"\nage_int = int(age_str)  # Convert string to integer\nheight_float = float("5.6")  # Convert string to float\nis_student_bool = bool(1)  # Convert to boolean\n\nprint(f"Age as string: {age_str} (type: {type(age_str)})")\nprint(f"Age as integer: {age_int} (type: {type(age_int)})")\nprint(f"Height: {height_float} (type: {type(height_float)})")\nprint(f"Is student: {is_student_bool} (type: {type(is_student_bool)})")',
                            explanation: 'Python provides built-in functions to convert between different data types.'
                        }
                    ];
                    // Merge additional examples with existing content
                    const updatedContent = Object.assign(Object.assign({}, currentContent), { codeExamples: [
                            ...(currentContent.codeExamples || []),
                            ...additionalExamples
                        ] });
                    yield variablesLesson.update({
                        content: updatedContent
                    }, { transaction });
                    console.log('Successfully added additional content to Variables and Data Types lesson');
                }
            }
        }
        yield transaction.commit();
        console.log('Content addition to existing lessons completed');
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error adding content to existing lessons: ", error);
        throw error;
    }
});
exports.addContentToExistingLessons = addContentToExistingLessons;
