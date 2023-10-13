import { User } from '../../../../src/user/domain/entitties/user';
import { RegisterUser } from '../../../../src/user/application/usecases/register-user.usecase';
import { UserRepository } from '../../../../src/user/domain/repositories/user-repository';
import { UserDto } from 'src/user/domain/dto/user.dto';

class MockUserRepository implements UserRepository {
  getById = jest.fn();
  save = jest.fn();
}
const mockUserRepository = new MockUserRepository();

describe('RegisterUser', () => {
  const instance = new RegisterUser(mockUserRepository);

  test('deberia crear una instancia', () => {
    expect(instance).toBeInstanceOf(RegisterUser);
  });

  test('deberia lanzar un error cuando el usuario ya se encuentre registrado', async () => {
    const userDto: UserDto = {
      type: { id: '1' },
      age: 18,
      contact: { email: 'test@test.cl', phoneNumber: '11111' },
      name: 'Diego'
    };
    const user = new User(userDto);
    mockUserRepository.getById.mockResolvedValue(user);
    await expect(instance.execute(userDto)).rejects.toThrowError(
      'El usuario ya se encuentra registrado'
    );
  });

  test('deberia lanzar un error cuando el usuario sea menor de edad', async () => {
    const userDto: UserDto = {
      type: { id: '1' },
      age: 17,
      contact: { email: 'test@test.cl', phoneNumber: '11111' },
      name: 'Diego'
    };
    mockUserRepository.getById.mockResolvedValue(null);
    await expect(instance.execute(userDto)).rejects.toThrowError(
      'El usuario debe ser mayor de edad'
    );
  });

  test('deberia registrar un usuario', async () => {
    const expectedValue = {
      'age': 18,
      'contact': { 'email': 'test@test.cl', 'phoneNumber': '11111' },
      'legal_age': 18,
      'name': 'Diego',
      'type': { 'id': '1' }
    };
    const userDto: UserDto = {
      type: { id: '1' },
      age: 18,
      contact: { email: 'test@test.cl', phoneNumber: '11111' },
      name: 'Diego'
    };
    mockUserRepository.getById.mockResolvedValue(null);
    await instance.execute(userDto);
    expect(mockUserRepository.save).toBeCalledWith(expectedValue);
  });
});
