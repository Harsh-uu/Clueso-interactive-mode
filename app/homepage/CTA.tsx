export const CTA = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-40 pt-8  pb-4">
      <div
        className="relative rounded-lg overflow-hidden bg-cover bg-position-[10%_center] md:bg-center lg:min-h-[460px]"
        style={{ backgroundImage: "url('/CTA-bg.png')" }}
      >
        <div className="relative px-8 lg:px-14 py-10 lg:py-32">

          <h2 className="text-[27px] lg:text-5xl mt-3 font-nohemi text-white leading-tight max-w-2xl">
            Start making <br />interactive tutorials
          </h2>

          <p className="text-[#EBEBEB] mt-4 text-base lg:text-lg max-w-lg leading-tight">
            Upload a recording. <br className="lg:hidden"/>AI handles the rest.
          </p>

          <a href="#demo" className="mt-8 inline-block bg-[#d462c5] hover:bg-[#f770e3] px-5 py-2 rounded-lg text-white font-semibold border border-[#c9d3ee]/50 cursor-pointer text-center text-sm sm:text-base">Try Demo</a>
        </div>
      </div>
    </section>
  );
};
