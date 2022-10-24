import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  return (
    <>
      <Disclosure as="nav" className="bg-gray-300">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="text-lg font-bold">
                      Post Post
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link to="/"> Posts </Link>
                      <Link to="/users"> User List </Link>
                      {auth.isLoggedIn && (
                        <Link to={`/post/user/${userId}`}> MyPost </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!auth.isLoggedIn && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex bg-cyan-600 text-neutral-100 px-3 py-2 mx-2 rounded-sm  hover:bg-cyan-500">
                          <span className="sr-only">Open user menu</span>
                          <p>Join Now</p>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Signup
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {auth.isLoggedIn && (
                    <button
                      onClick={auth.logout}
                      className="bg-red-600 text-neutral-100 px-5 py-2 mx-2 rounded-sm  hover:bg-red-500"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium"
                >
                  Posts
                </Link>
                <Link
                  to="/users"
                  className="block px-3 py-2 rounded-md text-base font-medium"
                >
                  User List
                </Link>
                {auth.isLoggedIn && (
                  <Link
                    to={`/post/user/${userId}`}
                    className="block px-3 py-2 rounded-md text-base font-medium"
                  >
                    MyPost
                  </Link>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
