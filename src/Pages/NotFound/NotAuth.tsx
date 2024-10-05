import 'tailwindcss/tailwind.css';

const NotAuth = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-700">404</h1>
        <p className="text-2xl mt-4">Not Found</p>
      </div>
    </div>
  );
};

export default NotAuth;
