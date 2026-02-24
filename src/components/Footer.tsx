import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-center text-sm text-slate-300">
      <p>Developed by ❤️ by Musfiqure Rahman</p>

      <div className="mt-4 flex justify-center gap-4 text-slate-400">

        {/* Twitter */}
        <a
          href="https://twitter.com/musfqure06"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition"
          aria-label="Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/musfiqure06/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61577735420660"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition"
          aria-label="Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>

      </div>
    </footer>
  )
}

export default Footer