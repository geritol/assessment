import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class Todo {
  public static editableProperties = ['text', 'priority', 'done'];

  @IsString()
  public id: string;

  @Matches(/^[A-Za-z\s]+$/)
  @IsNotEmpty()
  public text: string;

  @IsInt()
  @Min(1)
  @Max(5)
  public priority: number = 3;

  @IsBoolean()
  public done: boolean = false;

  constructor(todoObject: object = {}) {
    const allowedProperties = ['id', ...Todo.editableProperties];
    allowedProperties.forEach((property) => {
      if (property in todoObject) {
        this[property] = todoObject[property];
      }
    });
  }
}
