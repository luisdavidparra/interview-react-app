const Info = () => {
  return (
    <div className="card m-auto mt-3 col-12 col-lg-10 col-md-11 m-auto">
      <div className="card-body text-start">
        <h4 className="card-title">Interview App</h4>
        <p className="card-text">This is an SPA interview app, where you can:</p>
        <ul>
          <li>Create and Delete interviews.</li>
          <li>View a paginated list of existing interviews.</li>
          <li>View the results of each existing interviews.</li>
          <li>In the <b>new interview</b> section you can pick the technologies to ask.</li>
          <li>In the <b>list of quest</b> section you edit the technologies allowed to ask.</li>
        </ul>
        <hr />
        <p className="card-text">
          This app have his own server to store and manage the data, if it doesn't work you just need to use this
          command in your ID:
          <b> npm run server</b>
        </p>
        <a href="https://github.com/luisdavidparra" target="_blank" className="text-end d-block" rel="noreferrer">
          {" "}
          My GitHub
        </a>
      </div>
    </div>
  );
};

export default Info;
