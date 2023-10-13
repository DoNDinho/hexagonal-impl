import { ContactDto } from '../dto/contact.dto';

export class Contact {
  private email: string;
  private phoneNumber: string;

  constructor(contactDto: ContactDto) {
    this.email = contactDto.email;
    this.phoneNumber = contactDto.phoneNumber;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
}
