import { useEffect, useState } from 'react'
import bg from '../assets/page1_bg.png'
import bottomDeco from '../assets/page1_down.png'

const HomePage = ({ ready }) => {
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setStart(true), 10) // tiny pause for polish
    return () => clearTimeout(t)
  }, [ready])

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* TEXT */}
      <div className="absolute top-[18%] left-0 w-full flex flex-col items-center text-center z-20 px-6">

        {/* line 1 */}
        <p
          className="font-cormorant text-[1.2rem] tracking-wide text-[#7a1f1f] mb-4 font-semibold"
          style={{
            transform: start ? 'translateY(0)' : 'translateY(-40px)',
            opacity: start ? 1 : 0,
            transition: 'all 0.8s ease 0.2s',
          }}
        >
          We&apos;re Getting Married
        </p>

        {/* line 2 */}
        <p
          className="font-cormorant text-[2.2rem] tracking-[0.15em] text-[#7a1f1f]"
          style={{
            transform: start ? 'translateY(0)' : 'translateY(-40px)',
            opacity: start ? 1 : 0,
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          HAYAA
        </p>

        {/* line 3 */}
        <p
          className="font-cormorant text-[1.7rem] text-[#7a1f1f] -mt-2"
          style={{
            transform: start ? 'translateY(0)' : 'translateY(-40px)',
            opacity: start ? 1 : 0,
            transition: 'all 0.8s ease 0.6s',
          }}
        >
          &
        </p>

        {/* line 4 */}
        <p
          className="font-cormorant text-[2.2rem] tracking-[0.15em] text-[#7a1f1f] -mt-2"
          style={{
            transform: start ? 'translateY(0)' : 'translateY(-40px)',
            opacity: start ? 1 : 0,
            transition: 'all 0.8s ease 0.8s',
          }}
        >
          MOHAMMED
        </p>

      </div>

      {/* BOTTOM IMAGE */}
      <img
        src={bottomDeco}
        alt=""
        draggable={false}
        className="absolute -bottom-10 -left-10 max-w-[470px] h-[420px] object-cover object-top z-10"
        style={{
          transform: start ? 'translateY(0)' : 'translateY(120%)',
          opacity: start ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

    </div>
  )
}

export default HomePage