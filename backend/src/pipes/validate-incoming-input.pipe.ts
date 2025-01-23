import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

function exceptionFactory(validationErrors: ValidationError[]) {
  const errors: Record<string, string> = {};

  function mapErrors(errorsArray: ValidationError[], parentPath = '') {
    errorsArray.forEach((error) => {
      const propertyPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      if (error.children && error.children.length > 0) {
        mapErrors(error.children, propertyPath);
      } else if (error.constraints) {
        errors[propertyPath] = Object.values(error.constraints).join(', ');
      }
    });
  }

  mapErrors(validationErrors);

  return new BadRequestException(errors);
}

@Injectable()
export class ValidateIncomingInput extends ValidationPipe {
  constructor(options) {
    options = {
      ...options,
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: exceptionFactory,
    };
    super(options);
  }
}
