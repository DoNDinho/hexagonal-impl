import { TypeDto } from '../dto/type.dto';

export class Type {
  private id: string;

  constructor(typeDto: TypeDto) {
    this.id = typeDto.id;
  }

  public getId(): string {
    return this.id;
  }
}
