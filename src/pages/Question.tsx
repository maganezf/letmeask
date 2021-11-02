interface IQuestionProps {
  content: string;
  author: {
    avatar: string;
    name: string;
  };
}

export const Question = (props: IQuestionProps) => {
  return (
    <div className="question">
      <p>{props.content}</p>

      <footer>
        <div className="user-info">
          <img src={props.author.avatar} alt={props.author.name} />
          <span>{props.author.name}</span>
        </div>
      </footer>
    </div>
  );
};
