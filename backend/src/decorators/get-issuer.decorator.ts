import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetIssuer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    // @ts-expect-error user is injected through auth guard
    return request.user;
  },
);
