import { ContactDto } from './contact.dto';
import { TypeDto } from './type.dto';

export class UserDto {
  type: TypeDto;
  contact: ContactDto;
  name: string;
  age: number;
}
