import "src/App.scss";
import useInput from "src/hooks/useInput.ts";
import { useState, useEffect } from "react";
import { PasswordConfig } from "src/types/password.ts";
import { generatePassword } from "src/utils/password.ts";

import CopyIcon from "src/assets/copy.svg";

function App() {
  const [config, handleChange] = useInput<PasswordConfig>({
    lowerCase: true,
    upperCase: false,
    numbers: false,
    symbols: false,
    maxLength: 8,
  });
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (hint) {
      timeoutId = setTimeout(() => setHint(""), 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [hint]);

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword(config);
    setPassword(generatedPassword);
    setHint("");
  };

  const copyPassword = () => {
    if (!hint) {
      navigator.clipboard.writeText(password).then(() => {
        setHint("copied !");
      });
    }
  };

  return (
    <section className="main">
      <h1 className="text-main">
        Generate your <span>Password</span> here!
      </h1>
      <div className="password-generator-card">
        <div className="input-group-password">
          <div className="input-password-container">
            <input
              className="input-password"
              type="text"
              value={password}
              readOnly
            />
            <button
              className="btn-copy"
              disabled={Boolean(hint)}
              onClick={copyPassword}
            >
              <img className="icon-copy" src={CopyIcon} alt="copy icon" />
            </button>
          </div>
          <div className="hint">{hint}</div>
        </div>
        <div className="input-group-range">
          <label>Password Length {config.maxLength}</label>
          <input
            type="range"
            min="8"
            max="16"
            name="maxLength"
            value={config.maxLength}
            onChange={handleChange}
          />
        </div>
        <div className="input-group-checkbox">
          <input
            type="checkbox"
            name="lowerCase"
            id="lowerCase"
            checked={config.lowerCase}
            onChange={handleChange}
          />
          <label htmlFor="lowerCase">Include Lowercase</label>
        </div>
        <div className="input-group-checkbox">
          <input
            type="checkbox"
            name="upperCase"
            id="upperCase"
            checked={config.upperCase}
            onChange={handleChange}
          />
          <label htmlFor="upperCase">Include Uppercase</label>
        </div>
        <div className="input-group-checkbox">
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={config.numbers}
            onChange={handleChange}
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="input-group-checkbox">
          <input
            type="checkbox"
            name="symbols"
            id="symbols"
            checked={config.symbols}
            onChange={handleChange}
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
        <button className="btn-generate" onClick={handleGeneratePassword}>
          Generate
        </button>
      </div>
    </section>
  );
}

export default App;
