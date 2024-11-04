import { ErrorResponse, Link, useRouteError } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";

export default function Error() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 h-screen items-center">
      <div className="items-center  flex w-full flex-1 flex-col justify-center gap-2">
        {error.status == 404 && <ErrorMessage message={error.data} />}
        {error.status != 404 && (
          <ErrorMessage message={"Check your network!"} />
        )}
        <Link to={"/"}>Return Home</Link>
      </div>
    </div>
  );
}
