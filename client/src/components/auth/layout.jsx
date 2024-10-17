import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-white w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-purple-800">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Discover Your Favorite Products at Amazing Prices!
          </h1>
          <p className="text-lg">
            Shop the latest trends and enjoy a seamless shopping experience with us.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
