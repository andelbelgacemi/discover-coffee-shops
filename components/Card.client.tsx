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
      className="block overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
    >
      <Image
        src={imageURL}
        alt={name}
        width={260}
        height={160}
        className="h-40 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h3>
      </div>
    </Link>
  );
}
