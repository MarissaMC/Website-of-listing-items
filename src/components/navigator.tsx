import * as React from 'react';
import Button from '@material-ui/core/Button';
// import {push} from 'react-router-redux';
// import {store} from 'src/store/main';
// import {Location} from 'history';


/**
* NavList component which should be used in Redux.
*/

interface PathAndLabel {
 path: string;
 label: string;
}

const PATHS: ReadonlyArray<PathAndLabel> = [
 {path: `/events`, label: 'Events'},
 {path: `/setting`, label: 'Setting'},
];

/**
* A selectable list integrated with routing store.
*/
export class NavList extends React.Component<{}, {}> {
 static displayName = 'NavList';

 public render() {
   return (
     <div className="NavList" style={{display: 'inline-flex'}}>
       {PATHS.map(({path, label}) => (
         <Button
           href={path}
           action={this.getOnClick(path)}
         >
         {label}
         </Button>
       ))}
     </div>
   );
 }

 private getOnClick(newPage: string) {
//    return () => store.dispatch(push(newPage));
    return () => {}
 }
}
