import { FallbackProps } from "react-error-boundary";

import { ErrorPage } from "src/components/Elements/Error/items/ErrorPage";
import {
  BadRequestError,
  ForbiddenError,
  GraphQLError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "src/libs/error";

const errorHandle = (error: Error) => {
  if (error instanceof ForbiddenError) {
    return <ErrorPage {...error} />;
  }

  if (error instanceof NotFoundError) {
    return <ErrorPage {...error} />;
  }

  if (error instanceof InternalServerError) {
    return <ErrorPage {...error} />;
  }

  if (error instanceof GraphQLError) {
    return <ErrorPage {...error} />;
  }

  if (error instanceof BadRequestError) {
    return <ErrorPage {...error} />;
  }

  if (error instanceof UnauthorizedError) {
    return <ErrorPage {...error} />;
  }

  return <ErrorPage {...new InternalServerError()} />;
};

export const Error = ({ error }: FallbackProps) => (
  <div>{errorHandle(error)}</div>
);
