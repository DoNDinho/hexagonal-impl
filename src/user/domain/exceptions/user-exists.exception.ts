export class UserExistsException extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor() {
    super('El usuario ya se encuentra registrado');
    super.name = 'UserExistsException';
    super.stack = '';
    this.code = '';
    this.statusCode = 422;
  }
}
