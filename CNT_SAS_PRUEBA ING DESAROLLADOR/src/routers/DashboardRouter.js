import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Checkout from "../components/Form/Checkout";
import { MainPage } from '../components/MainPage';

export const DashboardRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Cita"  component={Checkout}/>
                <Route exact path="/" component={MainPage}/>
            </Switch>
        </div>  
    )
}
