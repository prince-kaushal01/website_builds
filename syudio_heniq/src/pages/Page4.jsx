import bg from '../assets/page4_bg.png'
import center from '../assets/page4_center.png'

const Page4 = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Background */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Center Image + Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="relative w-full max-w-md">

          <img
            src={center}
            alt=""
            draggable={false}
            className="w-full object-contain"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[18%] pt-[28%] pb-[12%] text-white text-center">

            <p className="font-cormorant uppercase text-[1.4rem] leading-tight mb-10">
              With hearts
            </p>

            <p className="font-cormorant uppercase text-[1.4rem] leading-tight">
              Full of gratitude
            </p>

            <p className="font-cormorant uppercase text-[1.2rem] leading-tight mt-2 mb-10">
              We welcome your presence
            </p>

            <p className="font-cormorant uppercase text-[1.2rem] leading-tight mt-1">
              The gubitra
            </p>

            <p className="font-cormorant uppercase text-[1.2rem] leading-tight">
              &
            </p>

            <p className="font-cormorant uppercase text-[1.2rem] leading-tight mb-10">
              Hamid families
            </p>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Page4