import { UserDto } from '../dto/user.dto';
import { LegalAgeException } from '../exceptions/legal-age.exception';
import { Contact } from './contact';
import { Type } from './type';

export class User {
  private readonly legal_age = 18;
  private type: Type;
  private contact: Contact;
  private name: string;
  private age: number;

  constructor(userDto: UserDto) {
    this.type = new Type(userDto.type);
    this.contact = new Contact(userDto.contact);
    this.name = userDto.name;
    this.age = userDto.age;
  }

  public getType(): Type {
    return this.type;
  }

  public getContact(): Contact {
    return this.contact;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public validateLegalAge() {
    if (this.age < this.legal_age) {
      throw new LegalAgeException();
    }
  }
}
