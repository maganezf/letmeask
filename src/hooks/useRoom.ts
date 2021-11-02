import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';

// type IFirebaseQuestions = Record<string, IResponseObject>;

interface IFirebaseQuestions {
  [key: string]: IResponseObject;
}

interface IResponseObject {
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
}

interface IQuestions {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export const useRoom = (roomId: string) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: IFirebaseQuestions =
        databaseRoom?.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      setTitle(databaseRoom?.title);
      setQuestions(parsedQuestions);

      return () => {
        roomRef.off('value');
      };
    });
  }, [roomId, user?.id]);

  return { questions, title };
};
