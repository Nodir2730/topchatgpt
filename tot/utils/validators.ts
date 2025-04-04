export function isValidEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  export function isStrongPassword(password: string): boolean {
    return password.length >= 8;
  }
  