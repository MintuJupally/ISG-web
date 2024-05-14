import { useState, useEffect } from 'react';

import { CircularProgress, IconButton, ButtonGroup, Button } from '@mui/material';

import { CheckRounded, CloseRounded, SendRounded } from '@mui/icons-material';
import axios from 'axios';

import './StoryBoard.css';

let models = ['llama2', 'mistral', 'gemma', 'gpt2'];

const StoryBoard = () => {
  const [loading, setLoading] = useState(true);

  const [inputText, setInputText] = useState('');

  const [story, setStory] = useState([]);

  const [modelName, setModelName] = useState('llama2');

  useEffect(() => {
    const model = window.location.pathname.substring(1);

    if (models.includes(model)) {
      setLoading(false);
      setModelName(model);
    } else window.location.href = '/llama2';
  }, []);

  const handleSubmit = () => {
    if (inputText === '') return;
    setLoading(true);

    const prompt = inputText;

    setInputText('');

    setStory([...story, prompt]);

    axios
      .post('/api/story', {
        prompt,
        story,
        model: modelName,
      })
      .then((res) => {
        console.log({ res });

        const newLine = res.data;
        setStory((curr) => [...curr, newLine]);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong!');
      });

    // const storyData = [...story, { line: inputText }];
    // setStory(storyData);
    // const storyLines = storyData.map((el) => el.line);

    // const eventSource = new EventSource(
    //   `http://localhost:8000/api/story?story=${JSON.stringify(storyLines)}`
    // );

    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log(event.data, data);

    //   if (data?.type) {
    //     if (data?.type === 'end') {
    //       console.log('Stream ended');
    //       eventSource.close();

    //       setStory((prev) => [
    //         ...prev,
    //         { line: _messages_g[_messages_g.length - 1], candidates: _messages_g },
    //       ]);
    //       setLoading(false);
    //     }
    //   } else {
    //     setMessages((prev) => [...prev, data.message]);
    //     _messages_g = [..._messages_g, data.message];
    //   }
    // };

    // eventSource.onerror = (event) => {
    //   console.log('Something went wrong!');
    //   eventSource.close();

    //   setLoading(false);
    // };
  };

  const handleInput = (event) => {
    const text = event.target.value.trimStart();

    setInputText(text);
  };

  useEffect(() => {
    console.log({ story });
  }, [story]);

  return (
    <div style={{ padding: '10px 20px', height: '100vh', boxSizing: 'border-box' }}>
      <div
        style={{
          height: 'calc(100vh - 70px)',
          display: 'flex',
          flexDirection: 'column-reverse',
          boxSizing: 'border-box',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        {story.length === 0 && (
          <div
            style={{
              height: 'min(200px, calc(100vh - 70px))',
              fontSize: '2rem',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div>
              Start your story, <br /> give me a line!
            </div>
            <div>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                {models.map((model, index) => (
                  <Button
                    key={'model-button' + index}
                    style={{ textTransform: 'capitalize' }}
                    variant={modelName === model ? 'contained' : 'outlined'}
                    onClick={() => {
                      if (model !== modelName) {
                        window.location.href = '/' + model;
                      }
                    }}
                  >
                    {model}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>
        )}

        {/* <div className="Processing">
          {messages.map((msg, index) => {
            return (
              <li key={'candidate-' + index}>
                <div style={{ paddingRight: '5px' }}>
                  {!loading && index === messages.length - 1 ? (
                    <CheckRounded
                      color="success"
                      style={{ fontSize: '15px', transform: 'translateY(2px)' }}
                    />
                  ) : (
                    <CloseRounded
                      color="error"
                      style={{ fontSize: '15px', transform: 'translateY(2px)' }}
                    />
                  )}
                </div>
                <div>{msg.trim()}</div>
              </li>
            );
          })}
        </div> */}

        {story
          .map((storyLine, index) => {
            return (
              <div
                key={'story-line-' + index}
                className="StoryLine"
                style={
                  index % 2 == 0
                    ? { justifyContent: 'right' }
                    : { justifyContent: 'left' }
                }
              >
                <p
                  style={
                    index % 2 == 0
                      ? {
                          backgroundColor: 'rgb(190,222,250)',
                          boxShadow: '2px 2px 5px 3px rgba(190,222,250,0.6)',
                          borderColor: 'rgb(120,160,190)',
                        }
                      : { backgroundColor: 'white' }
                  }
                >
                  {storyLine}
                </p>
              </div>
            );
          })
          .reverse()}
      </div>

      <div className="InputSection" style={{ height: '50px' }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          readOnly={loading}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        {loading ? (
          <CircularProgress style={{ marginLeft: '10px' }} />
        ) : (
          <IconButton onClick={handleSubmit} disabled={loading || inputText === ''}>
            <SendRounded />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default StoryBoard;
