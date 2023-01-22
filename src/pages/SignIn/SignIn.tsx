import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Page } from 'layout/Page';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/App';
import styles from './signin.module.css';

interface SignInProps {
  modal?: boolean;
}

export const SignIn = ({ modal }: SignInProps) => {
  if (modal) {
    return (
      <Modal>
        <SignInContent modal />
      </Modal>
    );
  }

  return (
    <Page>
      <SignInContent />
    </Page>
  );
};

const SignInContent = ({ modal }: { modal?: boolean }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const nav = useNavigate();

  const [user, setUserToken] = useContext(UserContext);

  const submit = () => {
    fetch('https://kitsu.io/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username,
        password: password,
      }),
    })
      .then(async (data) => {
        if (!data.ok)
          throw 'Failed to sign in. Did you use the wrong email or password?';
        const tokenRes: Token = await data.json();

        setToken(tokenRes);
        setError('');

        if (!modal) {
          nav('/');
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const setToken = (token: Token) => {
    localStorage.setItem('kitsu-token', JSON.stringify(token));
    setUserToken(token);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={styles.signin}
    >
      <h2>Sign in to Kitsu</h2>
      <p>
        Your password is only sent directly to Kitsu for verification. You can
        inspect the network requests by opening the dev tools (F12 or ctrl +
        shift + I) to verify.
      </p>
      <Input
        type="text"
        value={username}
        placeholder="email or @mention"
        onChange={(e) => setUsername(e.currentTarget.value)}
      ></Input>
      <Input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></Input>
      <Button type="submit" disabled={!username || !password}>
        Sign In
      </Button>
      <p>{error}</p>
    </form>
  );
};

export default SignIn;
