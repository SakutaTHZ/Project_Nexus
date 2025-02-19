import PlayerDeckContainer from "../components/PlayerDeckContainer";

function GameScreen() {
    return (
    <div className="Main_Menu overflow-hidden w-screen h-screen flex flex-col justify-center items-center gap-6 p-4">
    <PlayerDeckContainer customClass="fixed bottom-20"/>
    <PlayerDeckContainer customClass="fixed top-20 rotate-180"/>
    </div>
    )
  }
  
  export default GameScreen;
  