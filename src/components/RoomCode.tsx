import copyImg from '../assets/images/copy.svg';

interface IRoomCode {
  code: string;
}

export const RoomCode = ({ code }: IRoomCode) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="room-code-button" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </button>
  );
};
