import * as React from 'react'
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
    callback: (idColor: string)=>void;
}

interface State {
    color: string;
}


export class SettingPageComponent extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state = {
            color: '',
        }
      }

    handleChange = (event: any) => {
        this.props.callback(event.target.value);
        this.setState({ color: event.target.value });
      };


    render() {
        return (
            <div>
                <span>Set the color for event id:</span>
                <Select
                    value={this.state.color}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'id color',
                    id: 'idColor',
                    }}
                >
                    <MenuItem value='black'>
                    <em>Black</em>
                    </MenuItem>
                    <MenuItem value='red'>Red</MenuItem>
                    <MenuItem value='yellow'>Yellow</MenuItem>
                </Select>
            </div>

        )
    }
}