import { EmailService } from './EmailService';

export class UserService {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  addUser(user: { name: string, email: string }): boolean {
    // Logic to add user to the database (not shown)
    const isAdded = true; // Assume the user is added successfully
    if (isAdded) {
      this.emailService.sendWelcomeEmail(user.email);
    }
    return isAdded;
  }
}
