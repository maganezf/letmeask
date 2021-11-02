import deleteImg from 'assets/images/delete.svg';
import logoImg from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { RoomCodeButton } from 'components/RoomCodeButton';
import { useAuth } from 'contexts/AuthContext';
import { useRoom } from 'hooks/useRoom';
import { Question } from 'pages/Question';
import { Link, useParams } from 'react-router-dom';
import { auth, database } from 'services/firebase';
import './styles.scss';

interface IRoomParams {
  id: string;
}

export const AdminRoom = () => {
  const params = useParams<IRoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);

  async function signOut() {
    await auth.signOut();
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id='admin-page-room'>
      <header>
        <div className='content'>
          <Link to='/'>
            <img src={logoImg} alt='Letmeask' />
          </Link>

          <RoomCodeButton code={roomId} />

          <div className='buttons'>
            <Button isOutlined>Encerrar sala</Button>

            <Button onClick={signOut} disabled={!user}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className='main-content-room'>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='delete' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
