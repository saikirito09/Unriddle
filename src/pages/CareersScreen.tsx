import React from "react";

const CareersScreen: React.FC = () => {
  return (
    <div>
      <div className="fixed top-0 w-full z-20 mx-6 backdrop-blur-lg bg-[#ffffffe1] flex justify-center">
        <div className="flex w-full justify-between items-center py-4 max-w-4xl mx-6 relative">
          <a
            className="flex flex-row justify-start items-center gap-2 p-2 -m-2"
            href="/"
          >
            <span className="font-bold text-lg">unriddle</span>
          </a>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row gap-4">
            <div className="flex-row gap-1.5 flex">
              <button className="hover:bg-elementGray text-black font-semibold h-[1.9rem] px-2.5 rounded-md text-sm ease-in flex items-center gap-1.5 whitespace-nowrap">
                Pricing
              </button>
              <button className="hover:bg-elementGray text-black font-semibold h-[1.9rem] px-2.5 rounded-md text-sm ease-in flex items-center gap-1.5 whitespace-nowrap">
                Affiliate
              </button>
              <button className="hover:bg-elementGray text-black font-semibold h-[1.9rem] px-2.5 rounded-md text-sm ease-in flex items-center gap-1.5 whitespace-nowrap">
                Careers
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row gap-2">
              <button className="bg-elementGray2 text-textGray font-semibold h-[1.9rem] px-2.5 rounded-md text-sm ease-in flex items-center gap-1.5 whitespace-nowrap">
                Log in
              </button>
              <button className="bg-black text-white font-semibold h-[1.9rem] px-2.5 rounded-md text-sm ease-in flex items-center gap-1.5 whitespace-nowrap">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center mx-auto mt-16 w-full px-6">
        <section className="mt-7 mb-16 max-w-4xl flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-7 sm:mb-6 text-center">
            <h1 className="text-[3rem] font-semibold sm:text-[5rem] mb-5 sm:mb-6 max-w-4xl leading-[0.9] tracking-[-0.1rem] sm:tracking-[-0.2rem]">
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  textDecoration: "inherit",
                  textWrap: "balance",
                  letterSpacing: "0.1rem",
                }}
              >
                Hire Me
              </span>
            </h1>
            <p className="text-base sm:text-xl max-w-[18rem] sm:max-w-2xl tracking-[-0.02rem] leading-[1.3] gap-0.5">
              <span style={{ display: "inline-block", verticalAlign: "top" }}>
                I'm always open to new opportunities and collaborations.
              </span>
              <br />
              <span style={{ display: "inline-block", verticalAlign: "top" }}>
                Let's connect and discuss how we can work together.
              </span>
            </p>
          </div>
          <div className="flex flex-row justify-start gap-4 full-w mb-12">
            <a
              href="https://www.linkedin.com/in/saisandeepm/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex gap-2 font-semibold justify-center items-center cursor-pointer hover:scale-[1.02] min-w-[112px] text-sm rounded-xl px-6 h-11 ease-in transition-transform bg-blue-600 text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/saikirito09"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex gap-2 font-semibold justify-center items-center cursor-pointer hover:scale-[1.02] min-w-[112px] text-sm rounded-xl px-6 h-11 ease-in transition-transform bg-black text-white"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersScreen;
