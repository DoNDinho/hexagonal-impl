export class LegalAgeException extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor() {
    super('El usuario debe ser mayor de edad');
    super.name = 'LegalAgeException';
    super.stack = '';
    this.code = '';
    this.statusCode = 422;
  }
}
