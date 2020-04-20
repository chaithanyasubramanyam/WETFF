import React from 'react';
import {Pie} from 'react-chartjs-2';


export default class PieChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            labels: ['Income vlaue','Non Income value'],
            datasets : [{
                data : [50,50],
                backgroundColor : ['red', 'blue']
            }]

        }
    }
    render(){
        return(
            <div className='chart'>
                <h1 className='piechartheading'>Break down chart </h1>
                <Pie
                data = {{
                    labels : this.state.labels,
                    datasets : this.state.datasets
                }
                }

                height='100'
                />


            </div>
        )
    }
    
}