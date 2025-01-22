import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

function exceptionFactory(validationErrors: ValidationError[]) {
  const errors: Record<string, string> = {};

  validationErrors.forEach((error) => {
    errors[error.property] = Object.values(error.constraints).join(', ');
  });

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
