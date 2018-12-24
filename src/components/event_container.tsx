import * as React from 'react'
import {Media} from './event_types'


interface Props {
    id: number;
    started_at: string;
    media: Media;
    idColor?: string;
}

function filterSnapshot(media: Media){
    if (media) {
        const snapshot = media['snapshot'];
        return snapshot && snapshot.file.url;
    } else {
        // TODO replace with error page.
        // return 'http://seems_error';
    }
}


export class EventContainerComponent extends React.Component<Props, {}>{
    render() {
        const {id, started_at, media, idColor} = this.props;
        const img = filterSnapshot(media);

        return (
            <div className='event-container' style={{color: idColor}}>
                <p>{`id: ${id}`}</p>
                <p>{`started time: ${started_at}`}</p>
                <img src={img} height="200"/>
            </div>
        )
    }
}
