import logoImg from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { RoomCode } from 'components/RoomCode';
import { useAuth } from 'contexts/AuthContext';
import { useRoom } from 'hooks/useRoom';
import { Question } from 'pages/Question';
import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth, database } from 'services/firebase';
import './styles.scss';

interface IRoomParams {
  id: string;
}

export const Room = () => {
  const params = useParams<IRoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function signOut() {
    await auth.signOut();
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <Link to='/'>
            <img src={logoImg} alt='Letmeask' />
          </Link>

          <RoomCode code={roomId} />

          <Button onClick={signOut} disabled={!user}>
            Sign out
          </Button>
        </div>
      </header>

      <main className='main-content-room'>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.{' '}
              </span>
            )}

            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className='question-list'>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};
