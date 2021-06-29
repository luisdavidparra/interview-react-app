import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListOfInterviews from "./components/ListOfInterview/ListOfInterviews";
import NewInterview from "./components/NewInterview";
import TechnologyQuests from "./components/Quests/TechnologyQuests";
import { useState } from "react";
import AccordionQuests from "./components/Quests/AccordionQuests";
import DataContextProvider from "./contexts/DataContext";
import Sidebar from "./components/Sidebar/Sidebar";
import IndividualResults from "./components/IndividualResults";
import Pagination from "./components/ListOfInterview/Pagination";
import Info from "./components/Info";
import ListOfQuest from "./components/ListOfQuest";
import Navbar from "./components/Navbar";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const change = () => {
    setIsOpen(isOpen => !isOpen);
  };


  return (
    <DataContextProvider>
      <Router>
        <Sidebar isOpen={isOpen} change={change} />
        <Navbar />
        <div className="container w-75 App">
          <header className="h1 text-center p-2 text-primary title-h1">Interview App</header>
          <Route path="/" exact>
            <ListOfInterviews />
          </Route>
          <Route path="/new-interview">
            <NewInterview />
          </Route>
          <Route path="/use-form">
            <TechnologyQuests />
          </Route>
          <Route path="/accordion">
            <AccordionQuests />
          </Route>
          <Route path="/interview/:id">
            <IndividualResults />
          </Route>
          <Route path="/pagination">
            <Pagination />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/list-of-quest">
            <ListOfQuest />
          </Route>
        </div>
      </Router>
    </DataContextProvider>
  );
}

export default App;
