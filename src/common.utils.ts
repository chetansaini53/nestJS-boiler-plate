import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUtils {
  generateRandomCode(length: number): string {
    // Logic to generate a random code of specified length
    // Example implementation using Math.random and characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  validatePassword(password: string) {
    return true;
  }
  // Add more common functions here
}
