import React from 'react';
import {Line} from 'react-chartjs-2';




const state = {
  labels: ['-1y','0y','1y','2y'],
  datasets: [
    {
      label: '-1y to 2y',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#EEE2E2',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [9000,10000,11000,12000]
    }
  ]
  
}

export default class Linear extends React.Component {
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:false,
              text:'INT graph',
              fontSize:'40',
              maintainAspectRatio: false,
            },
            legend:{
              display:false,
              
            }

          }}
        />
      </div>
    );
  }
}
