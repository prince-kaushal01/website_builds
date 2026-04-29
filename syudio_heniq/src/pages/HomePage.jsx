import bg from '../assets/page1_bg.png'
import bottomDeco from '../assets/page1_down.png'

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Text */}
      <div className="absolute top-[18%] left-0 w-full flex flex-col items-center text-center z-20 px-6">

        <p className="font-cormorant text-[1.2rem] tracking-wide text-[#7a1f1f] mb-4 font-semibold">
          We&apos;re Getting Married
        </p>

        <p className="font-cormorant text-[2.2rem] tracking-[0.15em] text-[#7a1f1f] ">
          HAYAA
        </p>

        <p className="font-cormorant text-[1.7rem] text-[#7a1f1f] -mt-2">
          &
        </p>

        <p className="font-cormorant text-[2.2rem] tracking-[0.15em] text-[#7a1f1f] -mt-2">
          MOHAMMED
        </p>

      </div>

      {/* Bottom Decoration (static) */}
      <img
        src={bottomDeco}
        alt=""
        draggable={false}
        className="absolute -bottom-10 -left-10 max-w-[470px] object-cover h-[420px] object-top z-10"
      />

    </div>
  )
}

export default HomePage