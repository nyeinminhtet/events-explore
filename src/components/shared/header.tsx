const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Events Explorer
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-lg">
            Discover amazing events happening around you. Search, filter, and
            find your next adventure.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
