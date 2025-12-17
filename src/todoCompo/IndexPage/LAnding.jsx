import { Link } from "react-router-dom";
import { DoHeader } from "../homePage/header";

export default function DoTaskLandingPage() {
  return (
    <div>
      <div className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-gray-50 dark:bg-gray-900 dark:bg-none">
        <DoHeader isLanding={true} />

        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[calc(100vh-100px)] md:min-h-0">
            <div className="py-12 md:py-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
                Add More Tasks. <br /> Helps you Do More.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-lg transition-colors">
                Tasks that are important and need to be done. Stay organized,
                focused, and accomplish more every day.
              </p>

              <Link
                to="register"
                className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Start for free
              </Link>
            </div>

            <div className="relative h-full flex items-center justify-center py-3 md:py-0">
              <div className="bg-linear-to-br from-orange-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl p-8 shadow-2xl w-full transition-colors duration-500">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
                  <div className="relative" style={{ paddingBottom: "62.5%" }}>
                    <img
                      src="/images/homepage.png"
                      alt="Homepage"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-16 -right-8 w-24 sm:w-28 md:w-32 bg-gray-900 dark:bg-black rounded-3xl shadow-2xl p-2 transform rotate-6 transition-colors">
                  <div className="rounded-xl overflow-hidden bg-black">
                    <div className="relative" style={{ paddingBottom: "216%" }}>
                      <img
                        src="/images/mobile.png"
                        alt="Mobile view"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
