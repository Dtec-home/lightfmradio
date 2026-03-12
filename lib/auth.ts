export function hashPassword(password: string): string {
  // Simple hash - in production use bcrypt
  return Buffer.from(password).toString('base64');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateToken(payload: any): string {
  // Simple JWT - in production use jsonwebtoken
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64');
  const secret = process.env.JWT_SECRET || 'default-secret';
  const signature = Buffer.from(`${header}.${body}.${secret}`).toString('base64');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): any {
  try {
    const [header, body, signature] = token.split('.');
    const payload = JSON.parse(Buffer.from(body, 'base64').toString());
    
    if (payload.exp < Date.now()) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
}
