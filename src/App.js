import { Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Containers/Home'
import About from './Containers/About'
import Contact from './Containers/Contact'
import Projects from './Containers/Projects'
import { HOME, ABOUT, CONTACT, PROJECTS } from './Router'
import './App.css'

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#0B0952' }}>
      <Navbar />
      <Switch>
        <Route exact path={HOME}>
          <Home />
        </Route>
        <Route exact path={CONTACT}>
          <Contact />
        </Route>
        <Route exact path={ABOUT}>
          <About />
        </Route>
        <Route exact path={PROJECTS}>
          <Projects />
        </Route>
      </Switch>
    </div>
  )
}
export default App
