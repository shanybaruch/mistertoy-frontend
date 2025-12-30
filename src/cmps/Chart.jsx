import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions';
import { showErrorMsg } from '../services/event-bus.service';
import { toyService } from '../services/toy.service';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    const labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered',
    ]

       useEffect(() => {
            loadToys()
                .then(() => toyService.getToyLabels())
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('Cannot load toys')
                })
        }, [])
    

    const dataValues = labels.map(label => {
        return toys.reduce((acc, toy) => {
            if (toy.labels && toy.labels.includes(label)) {
                return acc + 1
            }
            return acc
        }, 0)
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Toys',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 160, 7, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(121, 255, 188, 0.2)',
                    'rgba(94, 255, 255, 0.2)',
                    'rgba(25, 163, 255, 0.2)',
                    'rgba(163, 118, 255, 0.2)',
                    'rgba(255, 99, 229, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 149, 42, 1)',
                    'rgba(255, 214, 50, 1)',
                    'rgba(0, 223, 130, 1)',
                    'rgba(55, 248, 248, 1)',
                    'rgba(27, 164, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 226, 1)',
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <section className="chart-dashboard" style={{ margin: '0 auto', gridColumn: 2}}>
            <h1 className='title' style={{ textAlign: 'center', marginBlock: '.5em' }}>Toys by Labels</h1>
            <Doughnut data={data} />
        </section >
    )
}