import { Link } from "react-router-dom"
import Dale from "../../assets/Dale_nobackground.png"

const NotFound = _ => {
  return (
    <div className="pt-10 text-8xl">
      <p className="text-5xl font-extrabold tracking-widest text-yellow-400">
        404
      </p>
      <p className="text-2xl font-medium tracking-widest text-yellow-200">
        i think you got lost
      </p>
      <p className="pt-10 text-lg font-normal tracking-widest text-yellow-200">
        say hi to dale, then head back to the home page
      </p>
      <Link
        to="/"
        className="text-xl tracking-[10px] text-yellow-200 transition-all duration-300 hover:text-2xl hover:tracking-[12px] hover:text-yellow-600"
      >
        Home
      </Link>

      <img src={Dale} className="absolute bottom-0 right-5"/>
      <svg
        class="absolute right-90 bottom-35 w-24 h-24 text-orange-500 transform rotate-0"
        viewBox="0 0 150 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 80 Q50 20 90 20"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
        />
        <polygon
          points="90,10 90,30 110,20"
          fill="currentColor"
        />
      </svg>

      <p className="text-yellow-200 text-xl absolute right-110 bottom-35">Dale</p>
    </div>

    
  );
};

export default NotFound;
