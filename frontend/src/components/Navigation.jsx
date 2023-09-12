import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  return (
    <>
      <Popover className="relative bg-neutral-900">
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            {/* Navbar Logo*/}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link
                to="/"
                className="text-xl font-semibold text-neutral-100"
              >
                Post Post
              </Link>
            </div>

            {/* Mobile Navbar Button */}
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>

            {/* Navbar Items*/}
            <Popover.Group
              as="nav"
              className="hidden space-x-10 md:flex"
            >
              <Link
                to="/"
                className="text-xl font-medium duration-300 border-b-2 border-transparent text-neutral-100 hover:border-neutral-100"
              >
                Posts
              </Link>
              <Link
                to="/users"
                className="text-xl font-medium duration-300 border-b-2 border-transparent text-neutral-100 hover:border-neutral-100"
              >
                Users
              </Link>
              {auth.isLoggedIn && (
                <Link
                  to={`/post/user/${userId}`}
                  className="text-xl font-medium duration-300 border-b-2 border-transparent text-neutral-100 hover:border-neutral-100"
                >
                  My Post
                </Link>
              )}
            </Popover.Group>
            <div className="items-center justify-end hidden gap-4 md:flex md:flex-1 lg:w-0">
              {!auth.isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xl font-medium duration-300 border-2 border-transparent rounded-sm whitespace-nowrap text-neutral-100 hover:border-neutral-100"
                  >
                    Sign In
                  </Link>
                  <Button className="inline-flex items-center justify-center px-4 py-2 text-xl font-medium duration-300 border border-transparent rounded-md text-neutral-900 bg-neutral-50 whitespace-nowrap hover:bg-neutral-200">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
              {auth.isLoggedIn && (
                <button
                  onClick={auth.logout}
                  className="inline-flex items-center justify-center px-4 py-2 ml-8 text-xl font-medium text-white duration-300 bg-red-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-red -700"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navbar Mobile */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
          >
            <div className="bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      to="/"
                      className="text-xl font-semibold"
                    >
                      Post Post
                    </Link>
                  </div>

                  {/* Navbar Mobile Button */}
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>
              </div>

              {/* Navbar Items */}
              <div className="px-5 py-6 space-y-6">
                <div className="grid justify-center grid-cols-1 gap-y-4 gap-x-8">
                  <Link
                    to="/"
                    className="text-xl font-medium text-gray-900 hover:text-gray-700"
                  >
                    Posts
                  </Link>
                  <Link
                    to="/users"
                    className="text-xl font-medium text-gray-900 hover:text-gray-700"
                  >
                    Users
                  </Link>

                  {auth.isLoggedIn && (
                    <Link
                      to={`/post/user/${userId}`}
                      className="text-xl font-medium text-gray-900 hover:text-gray-700"
                    >
                      My Post
                    </Link>
                  )}
                </div>
                <div>
                  {auth.isLoggedIn && (
                    <button
                      onClick={auth.logout}
                      className="flex items-center justify-center w-full px-4 py-2 text-xl font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                    >
                      Logout
                    </button>
                  )}
                  {!auth.isLoggedIn && (
                    <>
                      <Button className="w-full px-4 py-2 text-xl rounded bg-neutral-900 text-neutral-50">
                        <Link to="/login">Sign up</Link>
                      </Button>
                      <p className="mt-6 text-xl font-medium text-center text-gray-500">
                        Have Account?
                        <Link
                          to="/signup"
                          className="ml-2 text-blue-600 hover:text-blue-500"
                        >
                          Register
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
