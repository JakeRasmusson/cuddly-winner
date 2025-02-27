import { Link } from "react-router-dom";
import Dale from "../../assets/Dale_nobackground.png";

const NotFound = () => {
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
    </div>
  );
};

export default NotFound;
