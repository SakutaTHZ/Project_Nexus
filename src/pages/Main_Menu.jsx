import { Link } from "react-router-dom";
import AegisWarden from "../assets/Prototype 0.1/Characters/Aegis Warden.png";
import Bulwark from "../assets/Prototype 0.1/Characters/Bulwark_Thane.png";
import Thalor from "../assets/Prototype 0.1/Characters/Thalor_the_Crowned_Knight.png";

function Main_Menu() {
  return (
    <div className="Main_Menu overflow-hidden w-screen h-screen flex flex-col justify-center items-center gap-6 p-4">
      <div className="images relative flex justify-center items-center h-1/3 w-full max-w-4xl">
        <img className="w-1/3 sm:w-1/4 md:w-44 translate-x-3 translate-y-4 -rotate-12" src={AegisWarden} alt="Aegis Warden"  loading="lazy"/>
        
        <img className="w-1/3 sm:w-1/4 md:w-44 z-10" src={Thalor} alt="Thalor"  loading="lazy"/>
        <img className="w-1/3 sm:w-1/4 md:w-44 -translate-x-3 translate-y-4 rotate-12" src={Bulwark} alt="Bulwark Thane"  loading="lazy"/>
      </div>
      <div className="flex flex-col items-center gap-6 md:gap-4 text-center">
        <h1 className="text-5xl md:text-3xl title_font">Templus Nexus</h1>
        <Link to="/Project_Nexus/game" className="bg-gray-800 text-white p-3 px-6 rounded-md hover:bg-gray-700 transition">
          Start Game
        </Link>
      </div>
    </div>
  );
}

export default Main_Menu;
