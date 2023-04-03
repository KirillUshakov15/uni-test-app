import React, {useEffect} from 'react';
import './App.module.scss'
import {AppRouter} from "./components/AppRouter";
import {Layout} from "./components/Layout";
import {LocalStorage} from "./utils/local-storage";
import {useRefreshAccessMutation} from "./services/auth-service";

function App() {
  const [refreshAccess] = useRefreshAccessMutation()

  useEffect(() => {
    if(LocalStorage.get('accessToken')){
      refreshAccess('');
    }
  }, [])

  return (
      <Layout>
          <AppRouter/>
      </Layout>
  );
}

export default App;
