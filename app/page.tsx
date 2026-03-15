import { CTA } from "./homepage/CTA";
import { Demo } from "./homepage/Demo";
import { Footer } from "./homepage/Footer";
import { Header } from "./homepage/Header";
import { Hero } from "./homepage/Hero";
import { HowItWorks } from "./homepage/HowItWorks";
import { Problem } from "./homepage/Problem";
import { Solution } from "./homepage/Solution";

export default function Home() {
  return (
  <div>
      <Header />
      <div className="relative overflow-clip">
        <Hero />
        <img
          decoding="async"
          width="2952"
          height="1968"
          sizes="600px"
          srcSet="https://framerusercontent.com/images/YZKxOgTgkIZQK5Cm06NGZpz5k.png?scale-down-to=512&width=2952&height=1968 512w,https://framerusercontent.com/images/YZKxOgTgkIZQK5Cm06NGZpz5k.png?scale-down-to=1024&width=2952&height=1968 1024w,https://framerusercontent.com/images/YZKxOgTgkIZQK5Cm06NGZpz5k.png?width=2952&height=1968 2952w"
          src="https://framerusercontent.com/images/YZKxOgTgkIZQK5Cm06NGZpz5k.png?width=2952&height=1968"
          alt=""
          className="hidden lg:block absolute -top-[2%] -right-[28%] w-250 rounded-bl-2xl pointer-events-none -z-10"
        />
      </div>
      <div className="py-4 lg:py-8"><Problem/></div>
      <div className="py-4 lg:py-8"><Solution/></div>
      <div className="py-4 lg:py-8"><Demo/></div>
      <div className="py-4 lg:py-8"><HowItWorks/></div>
      <CTA/>
      <Footer/>
    </div>
  );
}
