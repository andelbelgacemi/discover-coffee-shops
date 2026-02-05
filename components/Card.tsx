import Image from "next/image";
import Link from "next/link";

type CardProps = {
  name: string;
  imageURL: string;
  href: string;
};

export default function Card({ name, imageURL, href }: CardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      style={{
        animation: 'fadeInUp 0.6s ease-out backwards',
        animationDelay: `${Math.random() * 0.3}s`
      }}
    >
      {/* Image container with overlay */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageURL}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Decorative corner accent */}
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
      </div>
      
      {/* Content */}
      <div className="relative p-5 bg-white">
        <h3 className="font-['Crimson_Pro'] text-xl font-bold text-[var(--coffee-dark)] mb-2 line-clamp-2 group-hover:text-[var(--coffee-medium)] transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-semibold group-hover:text-[var(--coffee-medium)] transition-colors">
          <span>Explore details</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--coffee-medium)] via-[var(--accent-gold)] to-[var(--coffee-dark)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
}