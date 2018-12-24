import * as React from 'react'
import {Event} from './event_types'
import {EventContainerComponent} from './event_container'
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';


interface Props {
    // TODO add startTime
    // startTime: string;
    idColor: string;
}

interface State {
    eventList: Event[];
    filteredEventList: Event[];
    loading: boolean;
    error: boolean;
    filterInput: string;
    nextUrl: string
}


function loadEvents(url: string) {
    return fetch(url).then((response: Response) => {
        if (response.status != 200 && response.status != 204) {
            return response.json().then(json => Promise.reject(json))
        } else if (response.statusText == 'No Content') {
            return
        } else {
            return response.json()
        }
    })

}


export class EventPageComponent extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state = {
            eventList: [],
            filteredEventList: [],
            loading: false,
            error: false,
            filterInput: '',
            nextUrl: 'https://raw.githubusercontent.com/cnliusen/web_data/master/page1.json',
        }
      }

    public componentDidMount() {
        loadEvents(this.state.nextUrl).then(res => this.setState({
            eventList: res.ret.results, 
            filteredEventList: res.ret.results,
            nextUrl: res.ret.next,
        }))
    }

    private filterEvents = () => {
        // TODO(convert UTC time to local time)
        const filterInput = document.getElementById('filterInput') as HTMLInputElement;
        if (filterInput) {
            const inputValue = filterInput.value;
            const filteredEvents = this.state.eventList.filter(item => item.started_at <= inputValue);
            this.setState({filteredEventList: filteredEvents});
        } 
    }

    private clearFilterInput = () => {
        this.setState({filteredEventList: this.state.eventList, filterInput: ''});
    }

    renderFilter() {
        return (
            <div> 
                <span>Filter event by start time:</span>
                <Input id='filterInput' className='filterInput'></Input>
                <Button onClick={this.filterEvents}>Done</Button>
                <Button onClick={this.clearFilterInput}>Cancel</Button>
            </div>

        )
    }

    renderEvents(eventList: Event[], idColor: string) {
        return (
            eventList.map(event => {
                if (event.media) {
                    return (
                        <EventContainerComponent 
                            id={event.id}
                            media={event.media}
                            started_at={event.started_at}
                            idColor={idColor}
                        />
                        )
                } else {
                    // TDDO replace with better design
                    return (
                        <div>
                            <p>{`event_id:${event.id}`}</p>
                            <p>{`started_at:${event.started_at}`}</p>
                            <p>no media found for this event:</p>
                        </div>
                    )
                }
            }
            )
        )
        
    }

    renderLoading() {
        return (
            <div> 
                <span>Loading more ...</span>
            </div>
        )
    }

    render() {
        const {filteredEventList} = this.state;
        return (
            <div>
            {this.renderFilter()}
            {this.renderEvents(filteredEventList, this.props.idColor)}
            {this.state.nextUrl && this.renderLoading()}
            </div>
            )
    }
}