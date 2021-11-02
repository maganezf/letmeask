import { useEffect, useState } from 'react';
import { database } from '../services/firebase';

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
}

export const useRoom = (roomId: string) => {
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
          };
        }
      );

      setTitle(databaseRoom?.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return { questions, title };
};
