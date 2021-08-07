import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import ListOfInterviews from "./components/ListOfInterview/ListOfInterviews";
import NewInterview from "./components/NewInterview";
import AccordionQuests from "./components/Quests/AccordionQuests";
import DataContextProvider from "./contexts/DataContext";
import Sidebar from "./components/Sidebar/Sidebar";
import IndividualResults from "./components/IndividualResults";
import Info from "./components/Info";
import ListOfQuest from "./components/ListOfQuest";
import Navbar from "./components/Navbar";
import NoMatch from "./components/NoMatch";
import MultiStepIndex from './components/MultiStepForm/MultiStepIndex';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const change = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <DataContextProvider>
      <Router>
        <Sidebar isOpen={isOpen} change={change} />
        <Navbar />
        <div className="container w-75 App">
          <header className="h1 text-center p-2 text-primary title-h1">Interview App</header>
          <Switch>
            <Route path="/" exact>
              <ListOfInterviews />
            </Route>
            {/* <Route path="/new-interview">
              <NewInterview />
            </Route> */}
            {/* <Route path="/accordion">
              <AccordionQuests />
            </Route> */}
            <Route path="/interview/:id">
              <IndividualResults />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            {/* <Route path="/list-of-quest">
              <ListOfQuest />
            </Route> */}
            <Route path="/MultiStepIndex">
              <MultiStepIndex />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </DataContextProvider>
  );
}

export default App;
