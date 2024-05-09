import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
    return (
        <Image
        width={0}
        height={0}
        className="h-full w-full"
        sizes="100vh"
        {...props}
      />
     );
}
 
export default PromoBanner;