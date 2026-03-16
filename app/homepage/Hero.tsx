export const Hero = () => {
    return (
        <section className="min-h-[90vh] px-4 md:px-10 lg:px-40 flex flex-col justify-center py-16 lg:py-24">
            <div className="lg:w-[60%]">
                <h1 className="text-4xl sm:text-4xl lg:text-7xl text-[#171717] font-nohemi leading-[1.1]">
                    Interactive tutorials <br /><span className="text-[#a3a3a3] text-4xl md:tracking-wide sm:text-4xl lg:text-7xl">in minutes with AI</span>
                </h1>
                <p className="mt-4 text-[#5c5c5c] text-sm sm:text-lg">
                    Turn screen recordings into interactive walkthroughs.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <a href="#demo" className="bg-[#d462c5] hover:bg-[#f770e3] px-5 py-2 rounded-lg text-white font-semibold border border-[#c9d3ee]/50 cursor-pointer text-center text-sm sm:text-base">Try Demo</a>
                    <a href="https://github.com/Harsh-uu/Clueso-interactive-mode" target="_blank" className="bg-white/10 hover:bg-[#fae6f8] px-5 py-2 rounded-lg text-[#da5cc7] border border-[#da5cc7]/40 cursor-pointer text-center text-sm sm:text-base">View Code</a>
                </div>
            </div>
            <div data-video-placeholder className="mt-12 w-full aspect-video bg-white rounded-lg overflow-hidden border border-gray-200">
                <video
                    className="h-full w-full object-contain"
                    src="/hero-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            </div>
        </section>
    )
}