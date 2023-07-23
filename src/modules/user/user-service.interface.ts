import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import LoginUserDto from './dto/login-user.dto';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  exists(userId: string): Promise<boolean>;
  verifyUser(userDTO: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
