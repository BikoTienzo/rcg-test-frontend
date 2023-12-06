import { useEffect, useState } from 'react';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';
import MyProgress from '../components/MyProgress';

const Encoder = () => {
  const [plainText, setPlainText] = useState('');
  const [encodedString, setEncodedString] = useState('');
  const [encodeStringGetter, setEncodeStringGetter] = useState(undefined as EventSource | undefined);
  const [chunkCount, setChunkCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBusy, setIsBusy] = useState(false);

  const encodeStringHandler = (e: MessageEvent<any>) => {
    if (e.data == '</END/>') {
      closeEncodedStringGetter();
      alert('Encoding is done!');
    } else if (e.data.startsWith('</START')) {
      setChunkCount(parseInt(e.data.replace(/[^0-9]+/g, '')));
    } else {
      setEncodedString(prev => prev + e.data);
    }
  };

  const encodeStringError = (e: Event) => {
    closeEncodedStringGetter();

    alert('An unexpected error occured while attempting to encode text.');
  };

  const getEncodedString = () => {
    if (plainText == '') {
      alert('There is no text to encode.');

      return;
    }

    setIsBusy(true);
    setEncodedString('');

    setEncodeStringGetter(new EventSource(process.env.REACT_APP_API_URL + encodeURIComponent(plainText)));
  };

  const closeEncodedStringGetter = () => {
    encodeStringGetter?.close();
    setIsBusy(false);
  };

  const resetValues = () => {
    setPlainText('');
    setEncodedString('');
  };

  useEffect(() => {
    if (encodeStringGetter) {
      encodeStringGetter.onmessage = encodeStringHandler;
      encodeStringGetter.onerror = encodeStringError;
    }
  }, [encodeStringGetter]);

  useEffect(() => {
    setProgress(Math.ceil((encodedString.length / chunkCount) * 100));
  }, [encodedString]);

  return (
    <main className="flex flex-col h-screen w-screen bg-my-primary justify-center items-center p-6">
      <div className="flex w-full max-w-screen-md pb-4">
        <h1 className="text-4xl text-my-light font-san font-extrabold self-start">
          <span className="text-my-tertiary">BASE64</span> Encoder
        </h1>
      </div>
      <div className="flex h-1/5 w-full max-w-screen-md">
        <MyTextInput
          inputClassName="text-xl tracking-widest font-semibold text-my-primary"
          value={plainText}
          valueSetter={setPlainText}
          multiLine={true}
          readOnly={isBusy}
          placeholder="Enter plain text here."
        />
      </div>
      <div className="flex flex-row w-full max-w-screen-md justify-end gap-x-3 pt-4 pb-8">
        {!isBusy && (
          <>
            <MyButton
              className="border-my-accent bg-my-accent text-my-primary w-1/4"
              label="Encode"
              onClick={getEncodedString}
            />
            <MyButton className="border-my-light text-my-light w-1/4" label="Clear" onClick={resetValues} />
          </>
        )}
        {isBusy && (
          <MyButton className="border-my-light text-my-light w-1/4" label="Cancel" onClick={closeEncodedStringGetter} />
        )}
      </div>
      {encodedString.length > 0 && (
        <div className="flex h-1/5 w-full max-w-screen-md">
          <MyTextInput
            inputClassName="border-my-secondary text-my-light bg-my-secondary"
            value={encodedString}
            valueSetter={setEncodedString}
            multiLine={true}
            readOnly={true}
          />
        </div>
      )}
      {isBusy && (
        <div className="flex w-full max-w-screen-md justify-center mt-2">
          <div className="flex flex-col w-11/12 align-center">
            <MyProgress value={progress} />
            <small className="text-center text-my-light">Encoding in progress... {progress}% done.</small>
          </div>
        </div>
      )}
    </main>
  );
};

export default Encoder;
