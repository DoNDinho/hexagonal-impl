import { UserDto } from '../../domain/dto/user.dto';
import { User } from '../../domain/entitties/user';
import { UserExistsException } from '../../domain/exceptions/user-exists.exception';
import { UserRepository } from '../../domain/repositories/user-repository';

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userDto: UserDto) {
    const user = new User(userDto);
    const userRegistered = await this.userRepository.getById(user.getContact().getEmail());
    if (userRegistered) {
      throw new UserExistsException();
    }
    user.validateLegalAge();
    await this.userRepository.save(user);
  }
}
