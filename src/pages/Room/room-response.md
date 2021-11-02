<!--

	=>> First

	-> databaseRoom log response - return object

	{
	  "authorId": "shuahusahusahu",
	  "questions": {
	      "question A": {
	          "author": {
	              "avatar": "https://lh3.googleusercontent.com/a-/avatar-image-account",
	              "name": "Account username"
	          },
	          "content": "question content",
	          "isAnswered": false,
	          "isHighlighted": false
	      },
	      "question B": {
	          "author": {
	              "avatar": "https://lh3.googleusercontent.com/a-/avatar-image-account",
	              "name": "Account username"
	          },
	          "content": "question content",
	          "isAnswered": false,
	          "isHighlighted": false
	      }
	  },
	  "title": "Teste"
	}

	=>> Second

	-> firebaseQuestions log response - return object

	-MdD2sRjieLa2E64MSt5(RoomId - Key): {author: {…}, content: "question content", isAnswered: false, isHighlighted: false}
	-MdD3TKsMmza-SjAk-YK(RoomId - Key): {author: {…}, content: "question content", isAnswered: false, isHighlighted: false}

	-> Object.entries: [ [key, value], [key, value] ] | this arrayLength = questions Number

	=>> Third

	-> parsedQuestions log response - return array of objects
	[
		{
			id: key,
			content: value.content,
			author: value.author,
			isHighlighted: value.isAnswered
		},
		{
			id: key,
			content: value.content,
			author: value.author,
			isHighlighted: value.isAnswered
		},
	]

*/ -->
