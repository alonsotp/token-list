import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2C12 2 8 6 8 12s4 10 4 10" />
                  <path d="M12 2c0 0 4 4 4 10s-4 10-4 10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Padel<span className="text-primary">Play</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              The easiest way to book padel courts and find players near you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/clubs" className="text-sm hover:text-primary transition-colors">Find Clubs</Link></li>
              <li><Link href="/matches" className="text-sm hover:text-primary transition-colors">Open Matches</Link></li>
              <li><Link href="/profile" className="text-sm hover:text-primary transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-sm">Help Center</span></li>
              <li><span className="text-sm">Contact Us</span></li>
              <li><span className="text-sm">FAQ</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><span className="text-sm">Terms of Service</span></li>
              <li><span className="text-sm">Privacy Policy</span></li>
              <li><span className="text-sm">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2026 PadelPlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
