import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SerializeInterceptor } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";

// @UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  find(@Query("email") email: string) {
    return this.service.find(email);
  }

  @Post("/signup")
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  @Patch("/:id")
  update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.service.update(id, body);
  }
}
