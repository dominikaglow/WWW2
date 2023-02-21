import "./App.css";
// in react-router-dom v6, "Switch" is replaced by routes "Routes"
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {AuthContext} from "./helpers/AuthContext";
import {useState, useEffect} from "react";
import axios from "axios";

function App(){
    /*state to see if we are logged in or not*/
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        /*making request, and if there are any errors(if the middleware
        doesn't recognize the token we know that it is not valid*/
        axios.get('http://localhost:3001/auth/auth', {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            //when AuthMiddleware returns some error
            if (response.data.error) {
                //change value of status
                setAuthState({...authState, status: false});
            }
            else {
                //ensure that when we are logged in and refresh the page we are still logged in
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
            }
        });

    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
        });
        // console.log(authState);
    };
    return (
      <div className="App">
          <AuthContext.Provider value={{authState, setAuthState}}>
              <Router>
                  <div className="odnosniki">
                      <Link to="/"> Home Page</Link>
                      <Link to="/createpost"> Add movie</Link>
                      {localStorage.getItem('accessToken') == null ? (
                          <>
                              <Link to="/login"> Login</Link>
                              <Link to="/registration"> Registration</Link>
                          </>
                      ) : (
                          <button onClick={logout}>Logout</button>
                      )}

                  </div>
                  <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/createpost" exact component={CreatePost}/>
                      <Route path="/post/:id" exact component={Post}/>
                      <Route path="/registration" exact component={Registration}/>
                      <Route path="/login" exact component={Login}/>
                  </Switch>
              </Router>
          </AuthContext.Provider>
      </div>
    );
}
export default App;