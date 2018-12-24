import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {EventPageComponent} from './components/event_page'
import {SettingPageComponent} from './components/setting_page'
import Button from '@material-ui/core/Button';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface Props {
    // TODO add more props according to requirement
}

interface State {
    idColor: string;
}

class MainPage extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state = {
            idColor: '000000',
        }
      }

    renderEventPage = () => {
        const props = {
            idColor: this.state.idColor,
        }
        return (
          <EventPageComponent {...props}/>
        );
      }

    renderSettingPage = () => {
        const props = {
            callback: this.colorCallback,
        }
        return (
            <SettingPageComponent {...props}/>
        );
    }

    colorCallback = (idColor: string) => {
        this.setState({idColor})
    }
      
    render() {
        return (
          <Router>
            <div>
                <Button>
                  <Link to="/events">Events</Link>
                </Button>
                <Button>
                  <Link to="/setting">Setting</Link>
                </Button>
              <Route path="/events" component={this.renderEventPage} />
              <Route path="/setting" component={this.renderSettingPage} />
            </div>
          </Router>
        );
      }
}


// export default Navigator;

const render = () => {
    ReactDOM.render(
        <MainPage />,
        document.querySelector('#title')
    )
}

render()