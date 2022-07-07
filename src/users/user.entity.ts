import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  AfterInsert,
} from "typeorm";
// import { Exclude } from "class-transformer";

@Unique(["email"])
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column()
  name: string;

  @Column({ length: 128 })
  email: string;

  // @Exclude()
  @Column({ length: 32 })
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("Insert User with id", this.id);
  }
}
