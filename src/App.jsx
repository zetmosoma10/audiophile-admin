function App() {
  return (
    <main>
      <div className="bg-gray-500 h-20 w-full">
        <div className="max-container flex items-center justify-between v">
          <p className="text-xl font-bold">Logo</p>
          <p className="text-2xl font-bold">ADMIN</p>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="bg-gray-700 h-screen w-full px-5 py-8 flex flex-col  justify-between">
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-600"></div>
            <div className="h-10 w-full bg-gray-600"></div>
            <div className="h-10 w-full bg-gray-600"></div>
            <div className="h-10 w-full bg-gray-600"></div>
          </div>
          <div className="h-16 w-full bg-gray-400 p-3 flex items-center space-x-2">
            <div className="bg-gray-700 w-10 h-10 rounded-full"></div>
            <p className="font-bold text-xl"> Profile</p>
          </div>
        </div>
        <div className="bg-gray-900 h-screen w-full col-span-3"></div>
      </div>
      <div className="bg-gray-950 w-full h-20"></div>
    </main>
  );
}

export default App;
