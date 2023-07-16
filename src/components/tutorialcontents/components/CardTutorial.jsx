import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardTutorial = ({id,slug ,name , thumbnail}) => {
  return (
    <Link href={`/tutorial/${id}/${slug}`}>
      <div className="card w-[300px] card-image-cover">
        <Image
        width={300}
        height={200}
          src={thumbnail}
          alt="thumbnail"
          loading="lazy"
        />
        <div className="card-body w-full">
          <h2 className="card-header">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CardTutorial;
