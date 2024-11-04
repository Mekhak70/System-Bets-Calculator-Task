import styles from "./app.module.css";
import Header from "./components/header/header";
import Section from "./components/section/section";

function App() {
  return (
    <div className={styles.container}>
    
      <div className={styles.content}>
        <Header />
        <Section />
      </div>
    </div>
  );
}

export default App;
