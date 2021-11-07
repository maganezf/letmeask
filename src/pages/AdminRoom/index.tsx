import deleteImg from 'assets/images/delete.svg';
import checkImg from 'assets/images/check.svg';
import answerImg from 'assets/images/answer.svg';
import logoImg from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { RoomCodeButton } from 'components/RoomCodeButton';
import { useAuth } from 'contexts/AuthContext';
import { useRoom } from 'hooks/useRoom';
import { Question } from 'pages/Question';
import { Link, useHistory, useParams } from 'react-router-dom';
import { auth, database } from 'services/firebase';
import './styles.scss';

interface IRoomParams {
  id: string;
}

export const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<IRoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);

  async function signOut() {
    await auth.signOut();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    history.push('/');
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
            <Button isOutlined onClick={handleCloseRoom}>
              Encerrar sala
            </Button>

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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <div className='question-buttons'>
                  {!question.isAnswered && (
                    <>
                      <button
                        type='button'
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img src={checkImg} alt='check' />
                      </button>

                      <button
                        type='button'
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt='answer' />
                      </button>
                    </>
                  )}

                  <button
                    type='button'
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt='delete' />
                  </button>
                </div>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
