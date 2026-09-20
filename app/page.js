import Hero from "@/app/_components/_Home/Hero";
import HomeServices from "@/app/_components/_Home/HomeServices";
import HomeStats from "@/app/_components/_Home/HomeStats";
import HomeReviews from "@/app/_components/_Home/HomeReviews";

export default async function Page() {
  return (
    <>
      <Hero />
      <HomeServices />
      <HomeStats />
      <HomeReviews />
    </>
  );
}
