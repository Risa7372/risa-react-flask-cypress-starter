import { useEffect, useState } from "react";
import { Box, Button, Card, Link } from "@material-ui/core";
import Prism from "prismjs";

import flaskLogo from "../assets/images/flask.png";

function ResponseBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre>
      <code className={props.language}>{`${props.code}`}</code>
    </pre>
  );
}

function ConnectCard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const { classes } = props;

  const fetchData = () => {
    fetch("/api/v1/")
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setData(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const resetCounter = () => {
    fetch("/api/v1/reset/")
      .then(res => res.json())
      .then(data => fetchData());
  };

  useEffect(() => fetchData(), []);

  const codeBlock = `23 |    @blueprint.route('/api/v1/reset/')
24 |    def reset():
25 |        counter = Counter.get_create(label='Test')
26 |        counter.reset()
27 |        return jsonify(response=counter.count)`;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else
    return (
      <Card className={classes.card}>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginTop: "9px",
            lineHeight: "72px"
          }}
        >
          API Call Count
        </div>
        <div
          id="api-call-counter"
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            lineHeight: "72px",
            border: "1px solid hsl(199, 91%, 59%)",
            borderRadius: "4px",
            padding: "0.3em 0.5em 0.15em",
            backgroundColor: "hsla(199, 91%, 59%, 0.05)"
          }}
        >
          {data.response}
        </div>

        <p>
          This React frontend is connected to a Flask server. Above is the
          response message we receive when we ping the server:
        </p>

        <p>Flask server running on port 8080.</p>

        <p>
          The server ping count is stored to the database. Click below to{" "}
          <b>reset the counter:</b>
        </p>
        <Box display="flex" justifyContent="center">
          <Button
            id="api-call-reset-button"
            variant="contained"
            size="small"
            className={classes.contained}
            onClick={resetCounter}
          >
            Reset Counter
          </Button>
        </Box>
        <ResponseBlock language="language-js" code={codeBlock} />
      </Card>
    );
}

export default ConnectCard;
