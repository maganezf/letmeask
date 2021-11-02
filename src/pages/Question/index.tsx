import './styles.scss';

interface IQuestionProps {
  content: string;
  author: {
    avatar: string;
    name: string;
  };
}

export const Question = ({ content, author }: IQuestionProps) => {
  return (
    <div className='question'>
      <p>{content}</p>

      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
      </footer>
    </div>
  );
};
