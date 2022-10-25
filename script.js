const ColorContext = React.createContext();

function App() {
  const [quotes, setQuotes] = React.useState();
  const [state, setState] = React.useState({
    color: "#000000",
    text: "Loading data...",
    author: "Loader"
  });

  function handleClick() {
    const random = Math.floor(Math.random() * 102);
    setState({
      text: quotes.quote[random].quote,
      author: quotes.quote[random].author,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    });
  }

  React.useEffect(() => {
    const loadQuotes = async () => {
      try {
        const file =
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
        const response = await fetch(file);
        const data = await response.json();
        setQuotes({
          quote: data.quotes
        });
        setState({
          color: "#ff0f0f",
          text: data.quotes[1].quote,
          author: data.quotes[1].author
        });
      } catch {
        setState({
          color: "red",
          text: "Failed loading data!",
          author: "Error"
        });
      }
    };
    loadQuotes();
  }, []);

  const root = document.getElementById("root");
  ReactDOM.findDOMNode(root).style.backgroundColor = state.color;
  const tweetHref =
    "https://twitter.com/intent/tweet?hashtags=quote&related=quote&text=" +
    encodeURIComponent('"' + state.text + '" ' + state.author);
  return (
    <ColorContext.Provider value={state.color}>
      <div id="quote-box">
        <Text text={state.text} />
        <Author author={state.author} />
        <div id="container">
          <Tweet thref={tweetHref} />
          <Button function={handleClick} />
        </div>
      </div>
    </ColorContext.Provider>
  );
}

const Button = (props) => {
  const color = React.useContext(ColorContext);
  return (
    <button
      id="new-quote"
      onClick={props.function}
      style={{ backgroundColor: color }}
    >
      New quote
    </button>
  );
};

const Text = (props) => {
  const color = React.useContext(ColorContext);
  return (
    <div id="text" style={{ color: color }}>
      <i className="fa fa-quote-left" style={{ color: color }}>
        {" "}
      </i>{" "}
      {props.text}
    </div>
  );
};

const Author = (props) => {
  const color = React.useContext(ColorContext);
  return (
    <div id="author" style={{ color: color }}>
      {props.author}
    </div>
  );
};

const Tweet = (props) => {
  const color = React.useContext(ColorContext);
  return (
    <a
      id="tweet-quote"
      href={props.thref}
      target="_top"
      title="Tweet this quote!"
      style={{ backgroundColor: color }}
    >
      <i className="fa fa-twitter"></i>
    </a>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
