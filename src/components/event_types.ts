import { string } from "prop-types";

export interface File {
    readonly url: string;
    readonly file_size?: number;
    readonly content_type?: string;
    readonly size?: [number, number];

}

export interface MediaDetails {
    readonly id: number;
    readonly name: string;
    readonly file: File;
    readonly event_id: number;
}

export interface Media {
    [type: string]: MediaDetails;
}


export interface Event {
    readonly id: number;
    // readonly started_at: Date;
    // TODO replace string with Date
    readonly started_at: string;
    readonly media: Media;
}