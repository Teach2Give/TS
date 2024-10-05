// What Are Event Emitters?
// In Node.js, event emitters are objects that trigger events, allowing different parts of your application to communicate asynchronously. This is especially useful in scenarios where you have actions that may happen at different times, like purchasing tickets.

// Scenario: Ticket Purchase System
// Imagine a simple ticket purchase system where a user can buy tickets. When a ticket is bought, we want to:

// Update the ticket supply.
// Notify the user via email.
// Save the transaction to a database.
// Using event emitters allows us to separate these concerns, making our code cleaner and more maintainable.


// Event Emitter: The TicketManager class emits a buy event every time a ticket is purchased. This decouples the ticket purchase logic from the email and database logic.

// Listeners: We set up listeners in index.js that respond to the buy event, calling the appropriate methods from the email and database services.

// Separation of Concerns: Each component (ticket management, email service, and database service) is responsible for a specific task. This makes the code easier to maintain and modify in the future.

// Step 1: Set Up the Ticket Manager
// Let's start by creating a TicketManager class that extends EventEmitter. This class will manage ticket sales.

// Create ticketManager.js
const { EventEmitter } = require("events");

class TicketManager extends EventEmitter {
    constructor(supply) {
        super();
        this.supply = supply;
    }

    buy(email, price) {
        if (this.supply > 0) {
            this.supply--;
            this.emit("buy", email, price, Date.now());
        } else {
            console.log("No tickets available");
        }
    }
}

module.exports = TicketManager;


// Step 2: Create Services for Email and Database
// Next, let’s set up our services that will handle sending emails and saving transactions.

// Create emailService.js
class EmailService {
    send(email) {
        console.log(`Sending email to ${email}`);
    }
}

module.exports = EmailService;


//Create databaseService.js
class DatabaseService {
    save(email, price, timestamp) {
        console.log(`Running query: INSERT INTO orders (email, price, created) VALUES ('${email}', ${price}, ${timestamp})`);
    }
}

module.exports = DatabaseService;


// Step 3: Bring It All Together
// Now we’ll create a main file that sets everything up and listens for buy events.

// Create index.js
const TicketManager = require("./ticketManager");
const EmailService = require("./emailService");
const DatabaseService = require("./databaseService");

const ticketManager = new TicketManager(10);
const emailService = new EmailService();
const databaseService = new DatabaseService();

// Listen for buy events
ticketManager.on("buy", (email, price, timestamp) => {
    emailService.send(email);
    databaseService.save(email, price, timestamp);
});

// Simulate buying tickets
ticketManager.buy("user1@example.com", 20);
ticketManager.buy("user2@example.com", 25);
ticketManager.buy("user3@example.com", 30);
